export function BannerArt({ kind }) {
  return (
    <svg className={`candidate-banner-art candidate-banner-art-${kind}`} viewBox="0 0 200 220" fill="none" aria-hidden="true" focusable="false">
      {kind === "resume" ? (
        <>
          <ellipse cx="105" cy="205" rx="76" ry="11" fill="#e4bf3f" opacity=".35" />
          <path d="M69 166 57 199 36 199M124 166 140 199 160 199M46 100 21 78 25 58M149 99 176 76 181 53" stroke="#234b38" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="43" y="28" width="110" height="147" rx="20" transform="rotate(-6 43 28)" fill="#ff826b" stroke="#234b38" strokeWidth="4" />
          <rect x="64" y="88" width="77" height="75" rx="10" fill="#fffdf0" />
          <path d="M78 107h44M78 122h32M78 137h39" stroke="#adc59b" strokeWidth="6" strokeLinecap="round" />
          <path d="M69 60q6-12 12 0M109 56q6-12 12 0M87 70q10 14 20-2" stroke="#234b38" strokeWidth="4" strokeLinecap="round" />
          <path d="m169 16 3 9 10 3-10 3-3 10-3-10-9-3 9-3ZM22 128l3 7 8 3-8 3-3 8-3-8-7-3 7-3Z" fill="#234b38" />
        </>
      ) : kind === "remote" ? (
        <>
          <circle cx="104" cy="110" r="75" fill="#b6dacd" />
          <path d="M33 119V73a12 12 0 0 1 12-12h110a12 12 0 0 1 12 12v76H33Z" fill="#fffdf0" stroke="#234b38" strokeWidth="4" />
          <path d="M20 149h160l-12 18H32Z" fill="#ffae8c" stroke="#234b38" strokeWidth="4" strokeLinejoin="round" />
          <path d="m77 107 21-19 22 19v25H77Z" fill="#f4d76e" />
          <path d="M88 112q10 12 20 0" stroke="#234b38" strokeWidth="3" strokeLinecap="round" />
          <path d="M150 31v17M142 39h17" stroke="#234b38" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="100" cy="110" r="75" fill="#ddd2f3" />
          <path d="m100 38 18 42 47 5-35 31 10 47-40-24-40 24 10-47-35-31 47-5Z" fill="#ffe581" stroke="#49365e" strokeWidth="4" strokeLinejoin="round" />
          <path d="M83 99v5M117 99v5M89 117q11 12 22 0M39 44l-8-8M162 53l10-8M153 181l8 10" stroke="#49365e" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
