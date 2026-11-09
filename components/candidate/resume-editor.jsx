"use client";
import { useState } from "react";
import { fieldLabels, messageLabels } from "./labels.js";
import { translate } from "../../i18n/index.js";
import { createResume, resumeFields } from "../../domains/resume/model.js";
import { importResumePdf } from "../../domains/resume/pdf.js";
import { useCandidate } from "./context.jsx";
export function ResumeEditor() {
  const { resume, saveResume } = useCandidate();
  const [draft, setDraft] = useState(() => createResume(resume));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function importPdf(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      const imported = await importResumePdf(file);
      setDraft((previous) =>
        createResume(
          Object.fromEntries(
            resumeFields.map((key) => [key, imported[key] || previous[key]]),
          ),
        ),
      );
      setMessage("candidate.importReview");
    } catch (error) {
      setMessage(
        error.message === "empty-pdf"
          ? "candidate.pdfEmpty"
          : "candidate.pdfError",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="candidate-card">
      <h2>{translate("candidate.resume")}</h2>
      <p>{translate("candidate.resumeIntro")}</p>
      <label className="candidate-import">
        {busy
          ? translate("candidate.importing")
          : translate("candidate.importPdf")}
        <input
          type="file"
          accept="application/pdf,.pdf"
          disabled={busy}
          onChange={importPdf}
        />
      </label>
      <p className="candidate-meta">{translate("candidate.pdfHint")}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveResume(createResume(draft));
          setMessage("candidate.resumeSaved");
        }}
      >
        <fieldset disabled={busy} className="candidate-resume-fields">
          {resumeFields.map((field) => (
            <label key={field}>
              <span>{fieldLabels[field]}</span>
              {["skills", "about"].includes(field) ? (
                <textarea
                  rows={field === "about" ? 7 : 3}
                  value={draft[field]}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      [field]: event.target.value,
                    }))
                  }
                />
              ) : (
                <input
                  required={["fullName", "profession"].includes(field)}
                  type={
                    ["experienceYears", "desiredSalary"].includes(field)
                      ? "number"
                      : field === "email"
                        ? "email"
                        : field === "phone"
                          ? "tel"
                          : "text"
                  }
                  min={0}
                  step="any"
                  value={draft[field]}
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      [field]: event.target.value,
                    }))
                  }
                />
              )}
            </label>
          ))}
        </fieldset>
        <button className="candidate-primary" disabled={busy} type="submit">
          {translate("candidate.saveResume")}
        </button>
      </form>
      {message && <p role="status">{messageLabels[message]}</p>}
    </section>
  );
}
