"use client";

import { createContext, forwardRef, useContext, createElement } from "react";
const mergeClassNames = (...classNames) =>
  classNames
    .filter(
      (text, index, classNameList) =>
        !!text && "" !== text.trim() && classNameList.indexOf(text) === index,
    )
    .join(" ")
    .trim();
const toPascalCase = (iconName) => {
  const camelCaseName = iconName.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, initialLetter, text) =>
      text ? text.toUpperCase() : initialLetter.toLowerCase(),
  );
  return camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
};
var DEFAULT_SVG_ATTRIBUTES = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const IconContext = createContext({});
const BaseIcon = forwardRef(
  (
    {
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode: iconNodes,
      ...svgProps
    },
    forwardedRef,
  ) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = "currentColor",
      className: contextClassName = "",
    } = useContext(IconContext) ?? {};
    const effectiveStrokeWidth =
      (absoluteStrokeWidth ?? contextAbsoluteStrokeWidth)
        ? (24 * Number(strokeWidth ?? contextStrokeWidth)) /
          Number(size ?? contextSize)
        : (strokeWidth ?? contextStrokeWidth);
    return createElement(
      "svg",
      {
        ref: forwardedRef,
        ...DEFAULT_SVG_ATTRIBUTES,
        width: size ?? contextSize ?? DEFAULT_SVG_ATTRIBUTES.width,
        height: size ?? contextSize ?? DEFAULT_SVG_ATTRIBUTES.height,
        stroke: color ?? contextColor,
        strokeWidth: effectiveStrokeWidth,
        className: mergeClassNames("lucide", contextClassName, className),
        ...(!children &&
          !((attributes) => {
            for (let attributeName in attributes)
              if (
                attributeName.startsWith("aria-") ||
                "role" === attributeName ||
                "title" === attributeName
              )
                return true;
            return false;
          })(svgProps) && {
            "aria-hidden": "true",
          }),
        ...svgProps,
      },
      [
        ...iconNodes.map(([elementName, attributes]) =>
          createElement(elementName, attributes),
        ),
        ...(Array.isArray(children) ? children : [children]),
      ],
    );
  },
);
const createIcon = (iconName, iconNodes) => {
  const IconComponent = forwardRef(
    ({ className, ...iconProps }, forwardedRef) =>
      createElement(BaseIcon, {
        ref: forwardedRef,
        iconNode: iconNodes,
        className: mergeClassNames(
          `lucide-${toPascalCase(iconName)
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .toLowerCase()}`,
          `lucide-${iconName}`,
          className,
        ),
        ...iconProps,
      }),
  );
  IconComponent.displayName = toPascalCase(iconName);
  return IconComponent;
};
const LayoutGridIcon = createIcon("layout-grid", [
  [
    "rect",
    {
      width: "7",
      height: "7",
      x: "3",
      y: "3",
      rx: "1",
      key: "1g98yp",
    },
  ],
  [
    "rect",
    {
      width: "7",
      height: "7",
      x: "14",
      y: "3",
      rx: "1",
      key: "6d4xhi",
    },
  ],
  [
    "rect",
    {
      width: "7",
      height: "7",
      x: "14",
      y: "14",
      rx: "1",
      key: "nxv5o0",
    },
  ],
  [
    "rect",
    {
      width: "7",
      height: "7",
      x: "3",
      y: "14",
      rx: "1",
      key: "1bb6yr",
    },
  ],
]);
const StoreIcon = createIcon("store", [
  [
    "path",
    {
      d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",
      key: "slp6dd",
    },
  ],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot",
    },
  ],
  [
    "path",
    {
      d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",
      key: "wn3emo",
    },
  ],
]);
const CodeXmlIcon = createIcon("code-xml", [
  [
    "path",
    {
      d: "m18 16 4-4-4-4",
      key: "1inbqp",
    },
  ],
  [
    "path",
    {
      d: "m6 8-4 4 4 4",
      key: "15zrgr",
    },
  ],
  [
    "path",
    {
      d: "m14.5 4-5 16",
      key: "e7oirm",
    },
  ],
]);
const BriefcaseBusinessIcon = createIcon("briefcase-business", [
  [
    "path",
    {
      d: "M12 12h.01",
      key: "1mp3jc",
    },
  ],
  [
    "path",
    {
      d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
      key: "1ksdt3",
    },
  ],
  [
    "path",
    {
      d: "M22 13a18.15 18.15 0 0 1-20 0",
      key: "12hx5q",
    },
  ],
  [
    "rect",
    {
      width: "20",
      height: "14",
      x: "2",
      y: "6",
      rx: "2",
      key: "i6l2r4",
    },
  ],
]);
const ScaleIcon = createIcon("scale", [
  [
    "path",
    {
      d: "M12 3v18",
      key: "108xh3",
    },
  ],
  [
    "path",
    {
      d: "m19 8 3 8a5 5 0 0 1-6 0zV7",
      key: "zcdpyk",
    },
  ],
  [
    "path",
    {
      d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
      key: "1yorad",
    },
  ],
  [
    "path",
    {
      d: "m5 8 3 8a5 5 0 0 1-6 0zV7",
      key: "eua70x",
    },
  ],
  [
    "path",
    {
      d: "M7 21h10",
      key: "1b0cd5",
    },
  ],
]);
const CoffeeIcon = createIcon("coffee", [
  [
    "path",
    {
      d: "M10 2v2",
      key: "7u0qdc",
    },
  ],
  [
    "path",
    {
      d: "M14 2v2",
      key: "6buw04",
    },
  ],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti",
    },
  ],
  [
    "path",
    {
      d: "M6 2v2",
      key: "colzsn",
    },
  ],
]);
const TruckIcon = createIcon("truck", [
  [
    "path",
    {
      d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
      key: "wrbu53",
    },
  ],
  [
    "path",
    {
      d: "M15 18H9",
      key: "1lyqi6",
    },
  ],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i",
    },
  ],
  [
    "circle",
    {
      cx: "17",
      cy: "18",
      r: "2",
      key: "332jqn",
    },
  ],
  [
    "circle",
    {
      cx: "7",
      cy: "18",
      r: "2",
      key: "19iecd",
    },
  ],
]);
const HeartIcon = createIcon("heart", [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0",
    },
  ],
]);
const GraduationCapIcon = createIcon("graduation-cap", [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0",
    },
  ],
  [
    "path",
    {
      d: "M22 10v6",
      key: "1lu8f3",
    },
  ],
  [
    "path",
    {
      d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
      key: "1r8lef",
    },
  ],
]);
const FactoryIcon = createIcon("factory", [
  [
    "path",
    {
      d: "M12 16h.01",
      key: "1drbdi",
    },
  ],
  [
    "path",
    {
      d: "M16 16h.01",
      key: "1f9h7w",
    },
  ],
  [
    "path",
    {
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      key: "1iv0i2",
    },
  ],
  [
    "path",
    {
      d: "M8 16h.01",
      key: "18s6g9",
    },
  ],
]);
const HammerIcon = createIcon("hammer", [
  [
    "path",
    {
      d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",
      key: "1hayfq",
    },
  ],
  [
    "path",
    {
      d: "m18 15 4-4",
      key: "16gjal",
    },
  ],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "15ts47",
    },
  ],
]);
const EllipsisIcon = createIcon("ellipsis", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "1",
      key: "41hilf",
    },
  ],
  [
    "circle",
    {
      cx: "19",
      cy: "12",
      r: "1",
      key: "1wjl8i",
    },
  ],
  [
    "circle",
    {
      cx: "5",
      cy: "12",
      r: "1",
      key: "1pcz8c",
    },
  ],
]);
const SearchIcon = createIcon("search", [
  [
    "path",
    {
      d: "m21 21-4.34-4.34",
      key: "14j7rj",
    },
  ],
  [
    "circle",
    {
      cx: "11",
      cy: "11",
      r: "8",
      key: "4ej97u",
    },
  ],
]);
const BookmarkIcon = createIcon("bookmark", [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx",
    },
  ],
]);
const FileTextIcon = createIcon("file-text", [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6",
    },
  ],
  [
    "path",
    {
      d: "M14 2v5a1 1 0 0 0 1 1h5",
      key: "wfsgrz",
    },
  ],
  [
    "path",
    {
      d: "M10 9H8",
      key: "b1mrlr",
    },
  ],
  [
    "path",
    {
      d: "M16 13H8",
      key: "t4e002",
    },
  ],
  [
    "path",
    {
      d: "M16 17H8",
      key: "z1uh3a",
    },
  ],
]);
const BellIcon = createIcon("bell", [
  [
    "path",
    {
      d: "M10.268 21a2 2 0 0 0 3.464 0",
      key: "vwvbt9",
    },
  ],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi",
    },
  ],
]);
const ShieldCheckIcon = createIcon("shield-check", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  [
    "path",
    {
      d: "m9 12 2 2 4-4",
      key: "dzmm74",
    },
  ],
]);
const Building2Icon = createIcon("building-2", [
  [
    "path",
    {
      d: "M10 12h4",
      key: "a56b0p",
    },
  ],
  [
    "path",
    {
      d: "M10 8h4",
      key: "1sr2af",
    },
  ],
  [
    "path",
    {
      d: "M14 21v-3a2 2 0 0 0-4 0v3",
      key: "1rgiei",
    },
  ],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2",
    },
  ],
  [
    "path",
    {
      d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
      key: "16ra0t",
    },
  ],
]);
const ArrowUpRightIcon = createIcon("arrow-up-right", [
  [
    "path",
    {
      d: "M7 7h10v10",
      key: "1tivn9",
    },
  ],
  [
    "path",
    {
      d: "M7 17 17 7",
      key: "1vkiza",
    },
  ],
]);
const LeafIcon = createIcon("leaf", [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3",
    },
  ],
  [
    "path",
    {
      d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
      key: "mt58a7",
    },
  ],
]);
const ArrowRightIcon = createIcon("arrow-right", [
  [
    "path",
    {
      d: "M5 12h14",
      key: "1ays0h",
    },
  ],
  [
    "path",
    {
      d: "m12 5 7 7-7 7",
      key: "xquz4c",
    },
  ],
]);
const MenuIcon = createIcon("menu", [
  [
    "path",
    {
      d: "M4 5h16",
      key: "1tepv9",
    },
  ],
  [
    "path",
    {
      d: "M4 12h16",
      key: "1lakjw",
    },
  ],
  [
    "path",
    {
      d: "M4 19h16",
      key: "1djgab",
    },
  ],
]);
const PlusIcon = createIcon("plus", [
  [
    "path",
    {
      d: "M5 12h14",
      key: "1ays0h",
    },
  ],
  [
    "path",
    {
      d: "M12 5v14",
      key: "s699le",
    },
  ],
]);
const UsersIcon = createIcon("users", [
  [
    "path",
    {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
      key: "1yyitq",
    },
  ],
  [
    "path",
    {
      d: "M16 3.128a4 4 0 0 1 0 7.744",
      key: "16gr8j",
    },
  ],
  [
    "path",
    {
      d: "M22 21v-2a4 4 0 0 0-3-3.87",
      key: "kshegd",
    },
  ],
  [
    "circle",
    {
      cx: "9",
      cy: "7",
      r: "4",
      key: "nufk8",
    },
  ],
]);
const MapPinIcon = createIcon("map-pin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  [
    "circle",
    {
      cx: "12",
      cy: "10",
      r: "3",
      key: "ilqhr7",
    },
  ],
]);
const SlidersHorizontalIcon = createIcon("sliders-horizontal", [
  [
    "path",
    {
      d: "M10 5H3",
      key: "1qgfaw",
    },
  ],
  [
    "path",
    {
      d: "M12 19H3",
      key: "yhmn1j",
    },
  ],
  [
    "path",
    {
      d: "M14 3v4",
      key: "1sua03",
    },
  ],
  [
    "path",
    {
      d: "M16 17v4",
      key: "1q0r14",
    },
  ],
  [
    "path",
    {
      d: "M21 12h-9",
      key: "1o4lsq",
    },
  ],
  [
    "path",
    {
      d: "M21 19h-5",
      key: "1rlt1p",
    },
  ],
  [
    "path",
    {
      d: "M21 5h-7",
      key: "1oszz2",
    },
  ],
  [
    "path",
    {
      d: "M8 10v4",
      key: "tgpxqk",
    },
  ],
  [
    "path",
    {
      d: "M8 12H3",
      key: "a7s4jb",
    },
  ],
]);
const XIcon = createIcon("x", [
  [
    "path",
    {
      d: "M18 6 6 18",
      key: "1bl5f8",
    },
  ],
  [
    "path",
    {
      d: "m6 6 12 12",
      key: "d8bk6v",
    },
  ],
]);
const LoaderCircleIcon = createIcon("loader-circle", [
  [
    "path",
    {
      d: "M21 12a9 9 0 1 1-6.219-8.56",
      key: "13zald",
    },
  ],
]);
const ClockIcon = createIcon("clock", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "path",
    {
      d: "M12 6v6l4 2",
      key: "mmk7yg",
    },
  ],
]);
const GitCompareArrowsIcon = createIcon("git-compare-arrows", [
  [
    "circle",
    {
      cx: "5",
      cy: "6",
      r: "3",
      key: "1qnov2",
    },
  ],
  [
    "path",
    {
      d: "M12 6h5a2 2 0 0 1 2 2v7",
      key: "1yj91y",
    },
  ],
  [
    "path",
    {
      d: "m15 9-3-3 3-3",
      key: "1lwv8l",
    },
  ],
  [
    "circle",
    {
      cx: "19",
      cy: "18",
      r: "3",
      key: "1qljk2",
    },
  ],
  [
    "path",
    {
      d: "M12 18H7a2 2 0 0 1-2-2V9",
      key: "16sdep",
    },
  ],
  [
    "path",
    {
      d: "m9 15 3 3-3 3",
      key: "1m3kbl",
    },
  ],
]);
const ChevronDownIcon = createIcon("chevron-down", [
  [
    "path",
    {
      d: "m6 9 6 6 6-6",
      key: "qrunsl",
    },
  ],
]);
const CheckIcon = createIcon("check", [
  [
    "path",
    {
      d: "M20 6 9 17l-5-5",
      key: "1gmf2c",
    },
  ],
]);
const WalletIcon = createIcon("wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6",
    },
  ],
  [
    "path",
    {
      d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
      key: "xoc0q4",
    },
  ],
]);
const DownloadIcon = createIcon("download", [
  [
    "path",
    {
      d: "M12 15V3",
      key: "m9g1x1",
    },
  ],
  [
    "path",
    {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      key: "ih7n3h",
    },
  ],
  [
    "path",
    {
      d: "m7 10 5 5 5-5",
      key: "brsn70",
    },
  ],
]);
const Trash2Icon = createIcon("trash-2", [
  [
    "path",
    {
      d: "M10 11v6",
      key: "nco0om",
    },
  ],
  [
    "path",
    {
      d: "M14 11v6",
      key: "outv1u",
    },
  ],
  [
    "path",
    {
      d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
      key: "miytrc",
    },
  ],
  [
    "path",
    {
      d: "M3 6h18",
      key: "d0wm0j",
    },
  ],
  [
    "path",
    {
      d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
      key: "e791ji",
    },
  ],
]);
const LogOutIcon = createIcon("log-out", [
  [
    "path",
    {
      d: "m16 17 5-5-5-5",
      key: "1bji2h",
    },
  ],
  [
    "path",
    {
      d: "M21 12H9",
      key: "dn1m92",
    },
  ],
  [
    "path",
    {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
      key: "1uf3rs",
    },
  ],
]);
const CircleCheckIcon = createIcon("circle-check", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "path",
    {
      d: "m9 12 2 2 4-4",
      key: "dzmm74",
    },
  ],
]);
const GlobeIcon = createIcon("globe", [
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "10",
      key: "1mglay",
    },
  ],
  [
    "path",
    {
      d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
      key: "13o1zl",
    },
  ],
  [
    "path",
    {
      d: "M2 12h20",
      key: "9i4pu4",
    },
  ],
]);
const FlagIcon = createIcon("flag", [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq",
    },
  ],
]);
const ExternalLinkIcon = createIcon("external-link", [
  [
    "path",
    {
      d: "M15 3h6v6",
      key: "1q9fwt",
    },
  ],
  [
    "path",
    {
      d: "M10 14 21 3",
      key: "gplh6r",
    },
  ],
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp",
    },
  ],
]);
const ArrowLeftIcon = createIcon("arrow-left", [
  [
    "path",
    {
      d: "m12 19-7-7 7-7",
      key: "1l729n",
    },
  ],
  [
    "path",
    {
      d: "M19 12H5",
      key: "x3x0zl",
    },
  ],
]);
const EyeOffIcon = createIcon("eye-off", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f",
    },
  ],
  [
    "path",
    {
      d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
      key: "151rxh",
    },
  ],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a",
    },
  ],
  [
    "path",
    {
      d: "m2 2 20 20",
      key: "1ooewy",
    },
  ],
]);
const EyeIcon = createIcon("eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0",
    },
  ],
  [
    "circle",
    {
      cx: "12",
      cy: "12",
      r: "3",
      key: "1v7zrd",
    },
  ],
]);
export {
  mergeClassNames,
  toPascalCase,
  DEFAULT_SVG_ATTRIBUTES,
  IconContext,
  BaseIcon,
  createIcon,
  LayoutGridIcon,
  StoreIcon,
  CodeXmlIcon,
  BriefcaseBusinessIcon,
  ScaleIcon,
  CoffeeIcon,
  TruckIcon,
  HeartIcon,
  GraduationCapIcon,
  FactoryIcon,
  HammerIcon,
  EllipsisIcon,
  SearchIcon,
  BookmarkIcon,
  FileTextIcon,
  BellIcon,
  ShieldCheckIcon,
  Building2Icon,
  ArrowUpRightIcon,
  LeafIcon,
  ArrowRightIcon,
  MenuIcon,
  PlusIcon,
  UsersIcon,
  MapPinIcon,
  SlidersHorizontalIcon,
  XIcon,
  LoaderCircleIcon,
  ClockIcon,
  GitCompareArrowsIcon,
  ChevronDownIcon,
  CheckIcon,
  WalletIcon,
  DownloadIcon,
  Trash2Icon,
  LogOutIcon,
  CircleCheckIcon,
  GlobeIcon,
  FlagIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  EyeOffIcon,
  EyeIcon,
};
