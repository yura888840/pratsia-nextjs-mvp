import { resumeFromText } from "./model.js";
export async function importResumePdf(file) {
  if (!file || file.size > 10 * 1024 * 1024 || !/\.pdf$/i.test(file.name))
    throw new Error("invalid-pdf");
  const data = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(data.slice(0, 5)) !== "%PDF-")
    throw new Error("invalid-pdf");
  const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const task = pdfjs.getDocument({ data, isEvalSupported: false });
  try {
    const pdf = await task.promise;
    return await readResumeDocument(pdf);
  } finally {
    await task.destroy();
  }
}

// Kept separate so extraction can be verified with real PDF fixtures.
export async function readResumeDocument(pdf) {
  if (pdf.numPages > 30) throw new Error("invalid-pdf");
  const pages = [];
  for (let number = 1; number <= pdf.numPages; number++) {
    const page = await pdf.getPage(number);
    const content = await page.getTextContent();
    pages.push(
      content.items
        .map((item) =>
          "str" in item ? item.str + (item.hasEOL ? "\n" : " ") : "",
        )
        .join(""),
    );
  }
  const text = pages.join("\n").trim();
  if (!text) throw new Error("empty-pdf");
  return resumeFromText(text);
}
