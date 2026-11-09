import test from "node:test";
import assert from "node:assert/strict";
import {
  createResume,
  resumeFromText,
  resumeFields,
} from "../domains/resume/model.js";
import {
  emptyCandidateState,
  applyToVacancy,
  restoreCandidateState,
} from "../domains/candidate/state.js";
import { mockVacancies } from "../domains/vacancy/mocks.js";
import { selectVacancies } from "../domains/vacancy/model.js";

test("manual and PDF resumes have the same flat shape; ambiguous PDF fields are not guessed", () => {
  const imported = resumeFromText(
    "Full name: Jane Doe\nProfession: Developer\nYears of experience: 3\nDesired salary: 45000\nEmail: jane@example.test\nSkills: React",
  );
  assert.deepEqual(Object.keys(imported), resumeFields);
  assert.equal(imported.fullName, "Jane Doe");
  assert.equal(imported.experienceYears, "3");
  assert.equal(imported.desiredSalary, "45000");
  assert.equal(imported.skills, "React");
  assert.equal(createResume(imported).profession, "Developer");
  const unstructured = resumeFromText(
    "Jane Doe\nDeveloper\n2018–2025\nSalary: negotiable",
  );
  assert.equal(unstructured.fullName, "");
  assert.equal(unstructured.experienceYears, "");
  assert.equal(unstructured.desiredSalary, "");
  assert.match(unstructured.about, /2018/);
});

test("all, favorite and applied lists select the same vacancy records; search includes skills", () => {
  const job = mockVacancies.find((job) => job.skills.includes("React"));
  assert.ok(job);
  for (const view of ["search", "saved", "applications"]) {
    const selected = selectVacancies(mockVacancies, {
      view,
      favorites: [job.id],
      applications: [{ vacancyId: job.id }],
      query: "React",
    });
    assert.ok(selected.includes(job));
  }
  assert.deepEqual(selectVacancies(mockVacancies, { view: "saved" }), []);
  assert.deepEqual(
    selectVacancies(mockVacancies, { city: "nonexistent-city" }),
    [],
  );
  assert.ok(
    selectVacancies(mockVacancies, { query: job.company }).includes(job),
  );
});

test("applications are idempotent resume snapshots and local storage is normalized", () => {
  const initial = emptyCandidateState();
  assert.throws(
    () => applyToVacancy(initial, mockVacancies[0].id),
    /resume-required/,
  );
  initial.resume = createResume({
    fullName: "Jane Doe",
    profession: "Developer",
  });
  const applied = applyToVacancy(initial, mockVacancies[0].id, "2026-11-09");
  assert.equal(applyToVacancy(applied, mockVacancies[0].id), applied);
  applied.resume.fullName = "New Name";
  assert.equal(applied.applications[0].resume.fullName, "Jane Doe");
  const restored = restoreCandidateState(
    {
      ...applied,
      favorites: ["removed-id", mockVacancies[0].id, mockVacancies[0].id],
      applications: [...applied.applications, ...applied.applications, null],
    },
    mockVacancies,
  );
  assert.deepEqual(restored.favorites, [mockVacancies[0].id]);
  assert.equal(restored.applications.length, 1);
  assert.deepEqual(
    restoreCandidateState(null, mockVacancies),
    emptyCandidateState(),
  );
});

// A real one-page text PDF exercises PDF.js text extraction, not only field parsing.
function textPdf(lines = []) {
  const stream =
    "BT /F1 12 Tf 50 750 Td " +
    lines
      .map((line, index) => `${index ? "0 -18 Td " : ""}(${line}) Tj`)
      .join("\n") +
    " ET";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf);
  pdf +=
    "xref\n0 6\n0000000000 65535 f \n" +
    offsets
      .slice(1)
      .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
      .join("");
  pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Uint8Array(Buffer.from(pdf));
}

test("PDF extraction produces the shared resume record and rejects empty/oversized documents", async () => {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const { readResumeDocument, importResumePdf } =
    await import("../domains/resume/pdf.js");
  const task = getDocument({
    data: textPdf([
      "Full name: Jane Doe",
      "Profession: Developer",
      "Years of experience: 4",
      "Skills: React",
    ]),
    useSystemFonts: true,
  });
  try {
    const resume = await readResumeDocument(await task.promise);
    assert.equal(resume.fullName, "Jane Doe");
    assert.equal(resume.profession, "Developer");
    assert.equal(resume.experienceYears, "4");
    assert.equal(resume.skills, "React");
  } finally {
    await task.destroy();
  }
  const empty = getDocument({ data: textPdf(), useSystemFonts: true });
  try {
    await assert.rejects(readResumeDocument(await empty.promise), /empty-pdf/);
  } finally {
    await empty.destroy();
  }
  await assert.rejects(readResumeDocument({ numPages: 31 }), /invalid-pdf/);
  await assert.rejects(
    importResumePdf({ name: "resume.pdf", size: 11 * 1024 * 1024 }),
    /invalid-pdf/,
  );
  await assert.rejects(
    importResumePdf({
      name: "resume.pdf",
      size: 5,
      arrayBuffer: async () => new TextEncoder().encode("wrong").buffer,
    }),
    /invalid-pdf/,
  );
});
