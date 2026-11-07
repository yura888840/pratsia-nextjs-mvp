// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
"use client";

import {
  translate,
  catalogValue,
  formatNumber,
  formatDate,
  catalogLabel,
} from "../i18n/index.js";
import CompanyEditor from "../components/company-editor.jsx";
import * as jsxRuntime from "react/jsx-runtime";
import {
  createContext,
  forwardRef,
  useContext,
  createElement,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
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
function PasswordField({ name, label, autoComplete }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={"field"}>
      <label htmlFor={`auth-${name}`}>{label}</label>
      <div className={"password-input"}>
        <input
          id={`auth-${name}`}
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          required={true}
          minLength={12}
          maxLength={128}
          autoComplete={autoComplete}
          spellCheck={false}
          autoCapitalize={"none"}
        />
        <button
          type={"button"}
          className={"password-toggle"}
          aria-label={
            isPasswordVisible
              ? translate("app.platform.prykhovaty_parol")
              : translate("app.platform.pokazaty_parol")
          }
          aria-pressed={isPasswordVisible}
          aria-controls={`auth-${name}`}
          onClick={() => setPasswordVisible((wasVisible) => !wasVisible)}
        >
          {isPasswordVisible
            ? (0, jsxRuntime.jsx)(EyeOffIcon, {
                size: 18,
              })
            : (0, jsxRuntime.jsx)(EyeIcon, {
                size: 18,
              })}
          <span>
            {isPasswordVisible
              ? translate("app.platform.prykhovaty")
              : translate("app.platform.pokazaty")}
          </span>
        </button>
      </div>
      {"password" === name && (
        <small>{translate("app.platform.vid_12_symvoliv")}</small>
      )}
    </div>
  );
}
function AuthForm({
  onSuccess,
  resetToken,
  onRecoveryComplete,
  defaultAccountType = "candidate",
  initialMode = "register",
}) {
  const [authMode, setAuthMode] = useState(resetToken ? "reset" : initialMode);
  const [authError, setAuthError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  function changeAuthMode(nextMode) {
    setAuthMode(nextMode);
    setAuthError("");
    setStatusMessage("");
  }
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitting(true);
        setAuthError("");
        setStatusMessage("");
        try {
          const isRecoveryAction =
            "request" === authMode || "reset" === authMode;
          if (
            "reset" === authMode &&
            formData.get("password") !== formData.get("confirm")
          )
            throw Error(translate("app.platform.paroli_ne_zbihayutsya"));
          const authPayload =
            "request" === authMode
              ? {
                  action: "request",
                  email: formData.get("email"),
                }
              : "reset" === authMode
                ? {
                    action: "complete",
                    token: resetToken,
                    password: formData.get("password"),
                  }
                : {
                    action: authMode,
                    email: formData.get("email"),
                    password: formData.get("password"),
                    ...("register" === authMode
                      ? {
                          name: formData.get("name"),
                          accountType: formData.get("accountType"),
                        }
                      : {}),
                  };
          const response = await fetch(
            isRecoveryAction ? "/api/auth/recovery" : "/api/auth",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(authPayload),
            },
          );
          const responseData = await response.json();
          if (!response.ok) throw Error(responseData.error);
          {
            if (isRecoveryAction) {
              if ("reset" === authMode) {
                setAuthMode("login");
                onRecoveryComplete?.();
              }
              setStatusMessage(
                responseData.message ||
                  translate("app.platform.zapyt_vykonano"),
              );
            } else {
              await onSuccess();
            }
          }
        } catch (error) {
          setAuthError(
            error instanceof Error
              ? error.message
              : translate("app.platform.ne_vdalosya_vykonaty_zapyt"),
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className={"form-body"}>
        <div className={"auth-tabs"}>
          <button
            type={"button"}
            className={
              "register" === authMode ? "primary small" : "outline small"
            }
            onClick={() => changeAuthMode("register")}
          >
            {translate("auth.register")}
          </button>
          <button
            type={"button"}
            className={"login" === authMode ? "primary small" : "outline small"}
            onClick={() => changeAuthMode("login")}
          >
            {translate("app.platform.u_mene_ye_akaunt")}
          </button>
        </div>
        <p className={"form-intro"}>
          {"register" === authMode
            ? translate(
                "app.platform.zberihay_vakansiyi_nadsylay_rezyume_ta_znakhod_lyudey_dlya_svoyeyi_komandy",
              )
            : "request" === authMode
              ? translate(
                  "app.platform.vkazhy_poshtu_svoho_akauntu_nadishlemo_posylannya_dlya_novoho_parolya",
                )
              : "reset" === authMode
                ? translate(
                    "app.platform.vstanovy_novyy_parol_pislya_zminy_poperedni_seansy_bude_zaversheno",
                  )
                : translate("app.platform.uviydy_do_svoho_kabinetu_pratsi")}
        </p>
        {"register" === authMode && (
          <label className="field">
            {translate("auth.accountType")}
            <select name="accountType" defaultValue={defaultAccountType}>
              <option value="candidate">{translate("auth.candidate")}</option>
              <option value="employer">{translate("auth.employer")}</option>
            </select>
          </label>
        )}
        {"register" === authMode && (
          <label className={"field"}>
            {translate("auth.name")}
            <input
              name={"name"}
              required={true}
              minLength={2}
              maxLength={100}
              autoComplete={"name"}
            />
          </label>
        )}
        {"reset" !== authMode && (
          <label className={"field"}>
            {translate("auth.email")}
            <input
              name={"email"}
              type={"email"}
              required={true}
              maxLength={254}
              autoComplete={"email"}
            />
          </label>
        )}
        {"request" !== authMode && (
          <PasswordField
            name={"password"}
            label={
              "reset" === authMode
                ? translate("app.platform.novyy_parol")
                : translate("auth.password")
            }
            autoComplete={
              "login" === authMode ? "current-password" : "new-password"
            }
            key={authMode}
          />
        )}
        {"reset" === authMode && (
          <PasswordField
            name={"confirm"}
            label={translate("app.platform.povtory_novyy_parol")}
            autoComplete={"new-password"}
          />
        )}
        {"login" === authMode && (
          <button
            type={"button"}
            className={"occupation-field-button"}
            onClick={() => changeAuthMode("request")}
          >
            {translate("app.platform.zabuv_parol")}
          </button>
        )}
        {statusMessage && (
          <p className={"inline-note"} role={"status"}>
            {statusMessage}
          </p>
        )}
        {authError && (
          <p className={"form-error"} role={"alert"}>
            {authError}
          </p>
        )}
      </div>
      <div className={"form-footer"}>
        <span className={"muted"}>
          {"request" === authMode
            ? translate("app.platform.posylannya_diye_30_khvylyn")
            : translate("app.platform.bezkoshtovno_na_starti")}
        </span>
        <button className={"primary"} disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircleIcon className={"spin"} size={17} />
          ) : "register" === authMode ? (
            translate("auth.register")
          ) : "request" === authMode ? (
            translate("app.platform.nadislaty_posylannya")
          ) : "reset" === authMode ? (
            translate("app.platform.zminyty_parol")
          ) : (
            translate("auth.login")
          )}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </form>
  );
}
function ModerationPanel() {
  const [queueScope, setQueueScope] = useState("pending");
  const [queueOffset, setQueueOffset] = useState(0);
  const [moderationJobs, setModerationJobs] = useState([]);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const [isModerationBusy, setModerationBusy] = useState(false);
  const [moderationError, setModerationError] = useState("");
  const [reasonsByJobId, setReasonsByJobId] = useState({});
  async function loadModerationQueue() {
    setModerationBusy(true);
    setModerationError("");
    try {
      const response = await fetch(
        "/api/moderation?" +
          new URLSearchParams({
            scope: queueScope,
            offset: String(queueOffset),
          }),
      );
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setModerationJobs(responseData.jobs);
      setHasMoreJobs(responseData.hasMore);
    } catch (error) {
      setModerationJobs([]);
      setModerationError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka"),
      );
    } finally {
      setModerationBusy(false);
    }
  }
  async function submitModerationAction(jobId, action) {
    setModerationBusy(true);
    setModerationError("");
    try {
      const response = await fetch("/api/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          action,
          reason: reasonsByJobId[jobId] || "",
        }),
      });
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setReasonsByJobId((previousReasons) => ({
        ...previousReasons,
        [jobId]: "",
      }));
      await loadModerationQueue();
    } catch (error) {
      setModerationError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka"),
      );
    } finally {
      setModerationBusy(false);
    }
  }
  return (
    <section className={"dashboard"}>
      <div className={"page-heading"}>
        <span className={"eyebrow"}>
          {translate("app.platform.yakist_platformy")}
        </span>
        <h1>{translate("app.platform.moderatsiya")}</h1>
        <p>
          {translate("app.platform.skarhy_perevirka_vakansiy_i_zhurnal_rishen")}
        </p>
      </div>
      <div className={"auth-tabs"}>
        {[
          ["pending", translate("app.platform.na_perevirtsi")],
          ["reports", translate("app.platform.skarhy")],
          ["recent", translate("app.platform.usi_vakansiyi")],
          ["blocked", translate("app.platform.prykhovani")],
        ].map(([scopeId, scopeLabel]) => (
          <button
            disabled={isModerationBusy}
            className={
              queueScope === scopeId ? "primary small" : "outline small"
            }
            onClick={() => {
              setQueueOffset(0);
              setQueueScope(scopeId);
            }}
            key={scopeId}
          >
            {scopeLabel}
          </button>
        ))}
      </div>
      {moderationError && (
        <p role={"alert"} className={"form-error"}>
          {moderationError}
        </p>
      )}
      {isModerationBusy && (
        <p role={"status"}>{translate("app.platform.zavantazhuyemo")}</p>
      )}
      {!isModerationBusy && !moderationError && !moderationJobs.length && (
        <div className={"inline-note"}>
          {translate("app.platform.u_tsomu_rozdili_poky_nemaye_vakansiy")}
        </div>
      )}
      {moderationJobs.map((job) => (
        <article className={"profile-card moderation-card"} key={job.id}>
          <h2>{job.title}</h2>
          <p>
            {job.company}
            {" \xb7 "}
            {job.city}
            {" \xb7 "}
            {job.occupation}
          </p>
          <p>
            <b>
              {"pending" === job.moderationStatus
                ? translate("app.platform.ochikuye_perevirky")
                : "blocked" === job.moderationStatus
                  ? translate("app.platform.prykhovano_moderatorom")
                  : translate("app.platform.skhvalena")}
            </b>
            {translate("app.platform.vidkrytykh_skarh")}
            {job.openReports}
          </p>
          {job.moderationReason && (
            <p className={"inline-note"}>
              {translate("app.platform.poperednye_rishennya")}
              {job.moderationReason}
            </p>
          )}
          <details>
            <summary>{translate("app.platform.opys_vakansiyi")}</summary>
            <p className={"preline"}>{job.description}</p>
          </details>
          {job.reports.map((report) => (
            <blockquote key={report.id}>
              {report.reason}
              <small>
                {" \xb7 "}
                {formatDate(report.createdAt, undefined, {
                  dateStyle: "short",
                  timeStyle: "medium",
                })}
              </small>
            </blockquote>
          ))}
          <label className={"field"}>
            {translate("app.platform.prychyna_rishennya")}
            <textarea
              minLength={5}
              maxLength={2e3}
              value={reasonsByJobId[job.id] || ""}
              onChange={(event) =>
                setReasonsByJobId((previousReasons) => ({
                  ...previousReasons,
                  [job.id]: event.target.value,
                }))
              }
              placeholder={translate(
                "app.platform.shcho_perevireno_ta_chomu_pryynyato_tse_rishennya",
              )}
            />
          </label>
          <div className={"moderation-actions"}>
            <button
              disabled={
                isModerationBusy ||
                (reasonsByJobId[job.id] || "").trim().length < 5
              }
              className={"outline"}
              onClick={() =>
                submitModerationAction(
                  job.id,
                  "approved" !== job.moderationStatus ? "restore" : "hide",
                )
              }
            >
              {"approved" !== job.moderationStatus
                ? translate("app.platform.skhvalyty_publikatsiyu")
                : translate("app.platform.prykhovaty_vakansiyu")}
            </button>
            {"pending" === job.moderationStatus && (
              <button
                disabled={
                  isModerationBusy ||
                  (reasonsByJobId[job.id] || "").trim().length < 5
                }
                className="outline"
                onClick={() => submitModerationAction(job.id, "hide")}
              >
                {translate("app.platform.vidkhylyty")}
              </button>
            )}
            {job.openReports > 0 && (
              <button
                disabled={
                  isModerationBusy ||
                  (reasonsByJobId[job.id] || "").trim().length < 5
                }
                className={"outline"}
                onClick={() => submitModerationAction(job.id, "dismiss")}
              >
                {translate("app.platform.zakryty_skarhy_bez_prykhovuvannya")}
              </button>
            )}
          </div>
          {job.events.length > 0 && (
            <details>
              <summary>{translate("app.platform.zhurnal_rishen")}</summary>
              {job.events.map((moderationEvent, index) => (
                <p key={index}>
                  {formatDate(moderationEvent.createdAt, undefined, {
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                  {" \xb7 "}
                  {{
                    hide: translate("app.platform.prykhovano"),
                    restore: translate("app.platform.povernuto"),
                    dismiss: translate("app.platform.skarhy_zakryto"),
                  }[moderationEvent.action] || moderationEvent.action}
                  {": "}
                  {moderationEvent.reason}
                </p>
              ))}
            </details>
          )}
        </article>
      ))}
      <div className={"moderation-actions"}>
        <button
          className={"outline"}
          disabled={isModerationBusy || 0 === queueOffset}
          onClick={() => setQueueOffset(Math.max(0, queueOffset - 30))}
        >
          {translate("app.platform.nazad")}
        </button>
        <button
          className={"outline"}
          disabled={isModerationBusy || !hasMoreJobs}
          onClick={() => setQueueOffset(queueOffset + 30)}
        >
          {translate("app.platform.dali")}
        </button>
      </div>
    </section>
  );
}
const jobCategories = [
  {
    id: "all",
    name: translate("app.platform.usi_sfery"),
    icon: "grid",
  },
  {
    id: "sales",
    name: translate("app.platform.prodazh_i_torhivlya"),
    icon: "store",
  },
  {
    id: "it",
    name: translate("app.platform.it_ta_digital"),
    icon: "code",
  },
  {
    id: "office",
    name: translate("app.platform.ofis_i_upravlinnya"),
    icon: "briefcase",
  },
  {
    id: "legal",
    name: translate("app.platform.pravo_ta_finansy"),
    icon: "scale",
  },
  {
    id: "hospitality",
    name: translate("app.platform.hoteli_ta_restorany"),
    icon: "coffee",
  },
  {
    id: "logistics",
    name: translate("app.platform.transport_i_lohistyka"),
    icon: "truck",
  },
  {
    id: "health",
    name: translate("app.platform.medytsyna_ta_krasa"),
    icon: "heart",
  },
  {
    id: "education",
    name: translate("app.platform.osvita_ta_sport"),
    icon: "graduation",
  },
  {
    id: "production",
    name: translate("app.platform.vyrobnytstvo_ta_ahro"),
    icon: "factory",
  },
  {
    id: "construction",
    name: translate("app.platform.budivnytstvo"),
    icon: "hammer",
  },
  {
    id: "other",
    name: translate("app.platform.inshi_spetsialnosti"),
    icon: "more",
  },
];
const occupationSections = [
  {
    id: "law",
    name: translate("app.platform.pravo_advokatura_ta_notariat"),
    category: "legal",
    names: [
      catalogValue("app.platform.yuryst"),
      catalogValue("app.platform.advokat"),
      catalogValue("app.platform.pomichnyk_advokata"),
      catalogValue("app.platform.stazhyst_advokata"),
      catalogValue("app.platform.yuryskonsult"),
      catalogValue("app.platform.pomichnyk_yurysta"),
      catalogValue("app.platform.korporatyvnyy_yuryst"),
      catalogValue("app.platform.yuryst_iz_dohovirnoyi_roboty"),
      catalogValue("app.platform.yuryst_iz_sudovoyi_roboty"),
      catalogValue("app.platform.yuryst_iz_mizhnarodnoho_prava"),
      catalogValue("app.platform.yuryst_iz_podatkovoho_prava"),
      catalogValue("app.platform.yuryst_iz_trudovoho_prava"),
      catalogValue("app.platform.yuryst_iz_zemelnoho_prava"),
      catalogValue("app.platform.yuryst_iz_nerukhomosti"),
      catalogValue("app.platform.yuryst_z_intelektualnoyi_vlasnosti"),
      catalogValue("app.platform.yuryst_iz_viyskovoho_prava"),
      catalogValue("app.platform.yuryst_iz_kryminalnoho_prava"),
      catalogValue("app.platform.yuryst_iz_simeynoho_prava"),
      catalogValue("app.platform.kerivnyk_yurydychnoho_viddilu"),
      catalogValue("app.platform.notarius"),
      catalogValue("app.platform.pomichnyk_notariusa"),
      catalogValue("app.platform.pryvatnyy_vykonavets"),
      catalogValue("app.platform.pomichnyk_pryvatnoho_vykonavtsya"),
      catalogValue("app.platform.derzhavnyy_vykonavets"),
      catalogValue("app.platform.arbitrazhnyy_keruyuchyy"),
      catalogValue("app.platform.mediator"),
      catalogValue("app.platform.patentnyy_povirenyy"),
      catalogValue("app.platform.komplayens_ofitser"),
      catalogValue("app.platform.fakhivets_iz_zakhystu_personalnykh_danykh"),
      catalogValue("app.platform.sekretar_sudovoho_zasidannya"),
      catalogValue("app.platform.pomichnyk_suddi"),
      catalogValue("app.platform.sudovyy_ekspert"),
      catalogValue("app.platform.prokuror"),
      catalogValue("app.platform.slidchyy"),
    ],
  },
  {
    id: "sport",
    name: translate("app.platform.sport_fitnes_ta_yoha"),
    category: "education",
    names: [
      catalogValue("app.platform.trener"),
      catalogValue("app.platform.fitnes_trener"),
      catalogValue("app.platform.personalnyy_trener"),
      catalogValue("app.platform.trener_trenazhernoho_zalu"),
      catalogValue("app.platform.instruktor_hrupovykh_prohram"),
      catalogValue("app.platform.trener_z_yohy"),
      catalogValue("app.platform.instruktor_z_pilatesu"),
      catalogValue("app.platform.trener_zi_stretchynhu"),
      catalogValue("app.platform.trener_z_funktsionalnoho_treninhu"),
      catalogValue("app.platform.trener_iz_krosfitu"),
      catalogValue("app.platform.trener_z_aerobiky"),
      catalogValue("app.platform.trener_z_plavannya"),
      catalogValue("app.platform.instruktor_z_akvaaerobiky"),
      catalogValue("app.platform.trener_z_boksu"),
      catalogValue("app.platform.trener_z_kikboksynhu"),
      catalogValue("app.platform.trener_iz_borotby"),
      catalogValue("app.platform.trener_iz_dzyudo"),
      catalogValue("app.platform.trener_iz_karate"),
      catalogValue("app.platform.trener_iz_tkhekvondo"),
      catalogValue("app.platform.trener_zi_zmishanykh_yedynoborstv"),
      catalogValue("app.platform.trener_iz_futbolu"),
      catalogValue("app.platform.trener_iz_basketbolu"),
      catalogValue("app.platform.trener_iz_voleybolu"),
      catalogValue("app.platform.trener_iz_tenisu"),
      catalogValue("app.platform.trener_iz_nastilnoho_tenisu"),
      catalogValue("app.platform.trener_iz_himnastyky"),
      catalogValue("app.platform.trener_iz_lehkoyi_atletyky"),
      catalogValue("app.platform.trener_iz_shakhiv"),
      catalogValue("app.platform.trener_iz_velosportu"),
      catalogValue("app.platform.trener_iz_kinnoho_sportu"),
      catalogValue("app.platform.trener_iz_tantsiv"),
      catalogValue("app.platform.khoreohraf"),
      catalogValue("app.platform.dytyachyy_trener"),
      catalogValue("app.platform.sportyvnyy_instruktor"),
      catalogValue("app.platform.instruktor_iz_turyzmu"),
      catalogValue("app.platform.hirskolyzhnyy_instruktor"),
      catalogValue("app.platform.instruktor_iz_dayvinhu"),
      catalogValue("app.platform.instruktor_parashutnoho_sportu"),
      catalogValue("app.platform.sportyvnyy_suddya"),
      catalogValue("app.platform.sportyvnyy_menedzher"),
      catalogValue("app.platform.administrator_fitnes_klubu"),
      catalogValue("app.platform.menedzher_sportyvnoho_klubu"),
    ],
  },
  {
    id: "model",
    name: translate("app.platform.modeli_moda_ta_styl"),
    category: "other",
    names: [
      catalogValue("app.platform.model"),
      catalogValue("app.platform.fotomodel"),
      catalogValue("app.platform.podiumna_model"),
      catalogValue("app.platform.model_dlya_reklamy"),
      catalogValue("app.platform.model_dlya_katalohu"),
      catalogValue("app.platform.model_dlya_prymirok"),
      catalogValue("app.platform.model_plus_size"),
      catalogValue("app.platform.fitnes_model"),
      catalogValue("app.platform.model_dlya_zyomky_odyahu"),
      catalogValue("app.platform.model_ruk"),
      catalogValue("app.platform.promomodel"),
      catalogValue("app.platform.modelnyy_ahent"),
      catalogValue("app.platform.buker_modelnoho_ahentstva"),
      catalogValue("app.platform.kastynh_menedzher"),
      catalogValue("app.platform.stylist"),
      catalogValue("app.platform.personalnyy_stylist"),
      catalogValue("app.platform.feshn_stylist"),
      catalogValue("app.platform.imidzhmeyker"),
      catalogValue("app.platform.dyzayner_odyahu"),
      catalogValue("app.platform.modelyer"),
      catalogValue("app.platform.konstruktor_odyahu"),
      catalogValue("app.platform.tekhnoloh_shveynoho_vyrobnytstva"),
      catalogValue("app.platform.bayer_odyahu"),
      catalogValue("app.platform.merchandayzer_odyahu"),
      catalogValue("app.platform.kostyumer"),
      catalogValue("app.platform.harderobnyk"),
      catalogValue("app.platform.asystent_stylista"),
      catalogValue("app.platform.prodyuser_modnykh_zyomok"),
    ],
  },
  {
    id: "itdev",
    name: translate("app.platform.rozrobka_prohramnoho_zabezpechennya"),
    category: "it",
    names: [
      catalogValue("app.platform.prohramist"),
      catalogValue("app.platform.frontend_rozrobnyk"),
      catalogValue("app.platform.backend_rozrobnyk"),
      catalogValue("app.platform.fullstack_rozrobnyk"),
      catalogValue("app.platform.vebrozrobnyk"),
      catalogValue("app.platform.javascript_rozrobnyk"),
      catalogValue("app.platform.typescript_rozrobnyk"),
      catalogValue("app.platform.python_rozrobnyk"),
      catalogValue("app.platform.java_rozrobnyk"),
      catalogValue("app.platform.php_rozrobnyk"),
      catalogValue("app.platform.c_rozrobnyk"),
      catalogValue("app.platform.c_rozrobnyk_2"),
      catalogValue("app.platform.go_rozrobnyk"),
      catalogValue("app.platform.rust_rozrobnyk"),
      catalogValue("app.platform.ruby_rozrobnyk"),
      catalogValue("app.platform.react_rozrobnyk"),
      catalogValue("app.platform.vue_rozrobnyk"),
      catalogValue("app.platform.angular_rozrobnyk"),
      catalogValue("app.platform.node_js_rozrobnyk"),
      catalogValue("app.platform.net_rozrobnyk"),
      catalogValue("app.platform.android_rozrobnyk"),
      catalogValue("app.platform.ios_rozrobnyk"),
      catalogValue("app.platform.flutter_rozrobnyk"),
      catalogValue("app.platform.react_native_rozrobnyk"),
      catalogValue("app.platform.rozrobnyk_ihor"),
      catalogValue("app.platform.unity_rozrobnyk"),
      catalogValue("app.platform.unreal_engine_rozrobnyk"),
      catalogValue("app.platform.embedded_rozrobnyk"),
      catalogValue("app.platform.rozrobnyk_bas"),
      catalogValue("app.platform.rozrobnyk_wordpress"),
      catalogValue("app.platform.rozrobnyk_erp"),
      catalogValue("app.platform.rozrobnyk_crm"),
      catalogValue("app.platform.arkhitektor_prohramnoho_zabezpechennya"),
      catalogValue("app.platform.tekhnichnyy_lider"),
    ],
  },
  {
    id: "itops",
    name: translate("app.platform.it_dani_testuvannya_ta_kiberbezpeka"),
    category: "it",
    names: [
      catalogValue("app.platform.testuvalnyk"),
      catalogValue("catalog.terms.qa_automation_engineer"),
      catalogValue("catalog.terms.manual_qa_engineer"),
      catalogValue("app.platform.inzhener_iz_testuvannya_navantazhennya"),
      catalogValue("app.platform.devops_inzhener"),
      catalogValue("app.platform.sre_inzhener"),
      catalogValue("app.platform.khmarnyy_inzhener"),
      catalogValue("app.platform.systemnyy_administrator"),
      catalogValue("app.platform.merezhevyy_administrator"),
      catalogValue("app.platform.administrator_baz_danykh"),
      catalogValue("app.platform.it_fakhivets"),
      catalogValue("app.platform.fakhivets_tekhnichnoyi_pidtrymky"),
      catalogValue("app.platform.inzhener_tekhnichnoyi_pidtrymky"),
      catalogValue("app.platform.it_rekruter"),
      catalogValue("app.platform.analityk_danykh"),
      catalogValue("catalog.terms.data_scientist"),
      catalogValue("catalog.terms.data_engineer"),
      catalogValue("app.platform.bi_analityk"),
      catalogValue("catalog.terms.machine_learning_engineer"),
      catalogValue("app.platform.ai_inzhener"),
      catalogValue("app.platform.biznes_analityk"),
      catalogValue("app.platform.systemnyy_analityk"),
      catalogValue("app.platform.product_menedzher"),
      catalogValue("catalog.terms.it_project_manager"),
      catalogValue("catalog.terms.scrum_master"),
      catalogValue("catalog.terms.delivery_manager"),
      catalogValue("app.platform.inzhener_iz_kiberbezpeky"),
      catalogValue("app.platform.analityk_soc"),
      catalogValue("app.platform.pentester"),
      catalogValue("app.platform.fakhivets_iz_zakhystu_informatsiyi"),
      catalogValue("app.platform.tekhnichnyy_pysmennyk"),
      catalogValue("app.platform.inzhener_iz_robototekhniky"),
    ],
  },
  {
    id: "marketing",
    name: translate("app.platform.marketynh_reklama_ta_pr"),
    category: "it",
    names: [
      catalogValue("app.platform.marketoloh"),
      catalogValue("app.platform.internet_marketoloh"),
      catalogValue("app.platform.smm_menedzher"),
      catalogValue("app.platform.seo_fakhivets"),
      catalogValue("app.platform.ppc_fakhivets"),
      catalogValue("app.platform.tarhetoloh"),
      catalogValue("app.platform.kontent_menedzher"),
      catalogValue("app.platform.kopirayter"),
      catalogValue("app.platform.kontent_marketoloh"),
      catalogValue("app.platform.brend_menedzher"),
      catalogValue("app.platform.pr_menedzher"),
      catalogValue("app.platform.email_marketoloh"),
      catalogValue("app.platform.crm_marketoloh"),
      catalogValue("app.platform.performance_marketoloh"),
      catalogValue("app.platform.affiliate_menedzher"),
      catalogValue("app.platform.influencer_menedzher"),
      catalogValue("app.platform.community_menedzher"),
      catalogValue("app.platform.mediabayer"),
      catalogValue("app.platform.marketynhovyy_analityk"),
      catalogValue("app.platform.menedzher_iz_komunikatsiy"),
      catalogValue("app.platform.menedzher_reklamnykh_proyektiv"),
      catalogValue("app.platform.kerivnyk_viddilu_marketynhu"),
      catalogValue("app.platform.dyrektor_iz_marketynhu"),
      catalogValue("app.platform.treyd_marketoloh"),
      catalogValue("app.platform.promouter"),
      catalogValue("app.platform.interv_yuer"),
      catalogValue("app.platform.merchandayzer"),
      catalogValue("app.platform.event_menedzher"),
    ],
  },
  {
    id: "creative",
    name: translate("app.platform.dyzayn_foto_ta_video"),
    category: "it",
    names: [
      catalogValue("app.platform.ux_ui_dyzayner"),
      catalogValue("app.platform.hrafichnyy_dyzayner"),
      catalogValue("app.platform.vebdyzayner"),
      catalogValue("app.platform.produktovyy_dyzayner"),
      catalogValue("app.platform.dyzayner_inter_yeru"),
      catalogValue("app.platform.landshaftnyy_dyzayner"),
      catalogValue("app.platform.promyslovyy_dyzayner"),
      catalogValue("app.platform.dyzayner_mebliv"),
      catalogValue("app.platform.dyzayner_polihrafiyi"),
      catalogValue("app.platform.ilyustrator"),
      catalogValue("app.platform.khudozhnyk"),
      catalogValue("app.platform.kontsept_khudozhnyk"),
      catalogValue("app.platform.3d_khudozhnyk"),
      catalogValue("app.platform.3d_vizualizator"),
      catalogValue("app.platform.3d_modeler"),
      catalogValue("app.platform.motion_dyzayner"),
      catalogValue("app.platform.animator"),
      catalogValue("app.platform.fotohraf"),
      catalogValue("app.platform.predmetnyy_fotohraf"),
      catalogValue("app.platform.retusher"),
      catalogValue("app.platform.videohraf"),
      catalogValue("app.platform.videooperator"),
      catalogValue("app.platform.videomontazher"),
      catalogValue("app.platform.rezhyser_montazhu"),
      catalogValue("app.platform.koloryst"),
      catalogValue("app.platform.artdyrektor"),
      catalogValue("app.platform.kreatyvnyy_dyrektor"),
      catalogValue("app.platform.dekorator"),
      catalogValue("app.platform.floryst"),
    ],
  },
  {
    id: "media",
    name: translate("app.platform.media_vydavnytstvo_ta_polihrafiya"),
    category: "other",
    names: [
      catalogValue("app.platform.zhurnalist"),
      catalogValue("app.platform.redaktor"),
      catalogValue("app.platform.literaturnyy_redaktor"),
      catalogValue("app.platform.vypuskovyy_redaktor"),
      catalogValue("app.platform.holovnyy_redaktor"),
      catalogValue("app.platform.korektor"),
      catalogValue("app.platform.rerayter"),
      catalogValue("app.platform.stsenaryst"),
      catalogValue("app.platform.televeduchyy"),
      catalogValue("app.platform.radioveduchyy"),
      catalogValue("app.platform.dyktor"),
      catalogValue("app.platform.korespondent"),
      catalogValue("app.platform.presatashe"),
      catalogValue("app.platform.pres_sekretar"),
      catalogValue("app.platform.vydavets"),
      catalogValue("app.platform.verstalnyk"),
      catalogValue("app.platform.drukar"),
      catalogValue("app.platform.operator_tsyfrovoho_druku"),
      catalogValue("app.platform.operator_shyrokoformatnoho_druku"),
      catalogValue("app.platform.paliturnyk"),
      catalogValue("app.platform.menedzher_drukarni"),
      catalogValue("app.platform.bloher"),
      catalogValue("app.platform.kontent_kreator"),
      catalogValue("app.platform.ugc_kreator"),
      catalogValue("app.platform.podkaster"),
    ],
  },
  {
    id: "performing",
    name: translate("app.platform.kultura_muzyka_ta_rozvahy"),
    category: "other",
    names: [
      catalogValue("app.platform.aktor"),
      catalogValue("app.platform.aktor_ozvuchuvannya"),
      catalogValue("app.platform.artyst"),
      catalogValue("app.platform.spivak"),
      catalogValue("app.platform.muzykant"),
      catalogValue("app.platform.didzhey"),
      catalogValue("app.platform.kompozytor"),
      catalogValue("app.platform.saund_dyzayner"),
      catalogValue("app.platform.zvukorezhyser"),
      catalogValue("app.platform.zvukooperator"),
      catalogValue("app.platform.rezhyser"),
      catalogValue("app.platform.prodyuser"),
      catalogValue("app.platform.liniynyy_prodyuser"),
      catalogValue("app.platform.teatralnyy_administrator"),
      catalogValue("app.platform.kontsertnyy_menedzher"),
      catalogValue("app.platform.tantsivnyk"),
      catalogValue("app.platform.baletmeyster"),
      catalogValue("app.platform.veduchyy_zakhodiv"),
      catalogValue("app.platform.orhanizator_zakhodiv"),
      catalogValue("app.platform.ivent_koordynator"),
      catalogValue("app.platform.artyst_animator"),
      catalogValue("app.platform.dytyachyy_animator"),
      catalogValue("app.platform.kerivnyk_hurtka"),
      catalogValue("app.platform.bibliotekar"),
      catalogValue("app.platform.muzeynyy_pratsivnyk"),
      catalogValue("app.platform.ekskursovod"),
      catalogValue("app.platform.restavrator"),
      catalogValue("app.platform.osvitlyuvach"),
      catalogValue("app.platform.stsenichnyy_robitnyk"),
    ],
  },
  {
    id: "sales",
    name: translate("app.platform.prodazhi_ta_robota_z_kliyentamy"),
    category: "sales",
    names: [
      catalogValue("app.platform.menedzher_z_prodazhu"),
      catalogValue("app.platform.torhovyy_predstavnyk"),
      catalogValue("app.platform.torhovyy_ahent"),
      catalogValue("app.platform.menedzher_iz_rozvytku_biznesu"),
      catalogValue("app.platform.menedzher_z_obsluhovuvannya_kliyentiv"),
      catalogValue("app.platform.menedzher_iz_prodazhu_posluh"),
      catalogValue("app.platform.menedzher_iz_prodazhu_nerukhomosti"),
      catalogValue("app.platform.menedzher_iz_prodazhu_avtomobiliv"),
      catalogValue("app.platform.menedzher_iz_prodazhu_budmaterialiv"),
      catalogValue("app.platform.menedzher_iz_prodazhu_obladnannya"),
      catalogValue("app.platform.menedzher_iz_prodazhu_reklamy"),
      catalogValue("app.platform.menedzher_iz_prodazhu_b2b"),
      catalogValue("app.platform.menedzher_iz_prodazhu_b2c"),
      catalogValue("app.platform.menedzher_iz_prodazhu_saas"),
      catalogValue("app.platform.menedzher_iz_klyuchovykh_kliyentiv"),
      catalogValue("app.platform.account_menedzher"),
      catalogValue("catalog.terms.customer_success_manager"),
      catalogValue("app.platform.menedzher_iz_suprovodu_kliyentiv"),
      catalogValue("app.platform.menedzher_iz_eksportu"),
      catalogValue("app.platform.rehionalnyy_menedzher"),
      catalogValue("app.platform.terytorialnyy_menedzher"),
      catalogValue("app.platform.supervayzer"),
      catalogValue("app.platform.kerivnyk_viddilu_prodazhu"),
      catalogValue("app.platform.dyrektor_iz_prodazhu"),
      catalogValue("app.platform.komertsiynyy_dyrektor"),
      catalogValue("app.platform.fakhivets_iz_tenderiv"),
      catalogValue("app.platform.tendernyy_menedzher"),
    ],
  },
  {
    id: "retail",
    name: translate("app.platform.mahazyny_ta_elektronna_torhivlya"),
    category: "sales",
    names: [
      catalogValue("app.platform.prodavets_konsultant"),
      catalogValue("app.platform.prodavets"),
      catalogValue("app.platform.prodavets_kasyr"),
      catalogValue("app.platform.kasyr"),
      catalogValue("app.platform.starshyy_kasyr"),
      catalogValue("app.platform.kerivnyk_mahazynu"),
      catalogValue("app.platform.administrator_mahazynu"),
      catalogValue("app.platform.administrator_torhovoho_zalu"),
      catalogValue("app.platform.merchendayzer"),
      catalogValue("app.platform.menedzher_internet_mahazynu"),
      catalogValue("app.platform.operator_internet_mahazynu"),
      catalogValue("app.platform.menedzher_marketpleysiv"),
      catalogValue("app.platform.katehoriynyy_menedzher"),
      catalogValue("app.platform.tovaroznavets"),
      catalogValue("app.platform.pryymalnyk_tovariv"),
      catalogValue("app.platform.prodavets_odyahu"),
      catalogValue("app.platform.prodavets_vzuttya"),
      catalogValue("app.platform.prodavets_kosmetyky"),
      catalogValue("app.platform.prodavets_yuvelirnykh_vyrobiv"),
      catalogValue("app.platform.prodavets_elektroniky"),
      catalogValue("app.platform.prodavets_prodovolchykh_tovariv"),
      catalogValue("app.platform.prodavets_budmaterialiv"),
      catalogValue("app.platform.prodavets_zootovariv"),
      catalogValue("app.platform.pekar_prodavets"),
      catalogValue("app.platform.fakhivets_iz_povernennya_tovariv"),
    ],
  },
  {
    id: "realestate",
    name: translate("app.platform.nerukhomist_ta_otsinka"),
    category: "sales",
    names: [
      catalogValue("app.platform.riyeltor"),
      catalogValue("app.platform.ahent_iz_nerukhomosti"),
      catalogValue("app.platform.broker_iz_nerukhomosti"),
      catalogValue("app.platform.menedzher_z_orendy"),
      catalogValue("app.platform.menedzher_komertsiynoyi_nerukhomosti"),
      catalogValue("app.platform.otsinyuvach_nerukhomosti"),
      catalogValue("app.platform.otsinyuvach_mayna"),
      catalogValue("app.platform.kerivnyk_viddilu_nerukhomosti"),
      catalogValue("app.platform.keruyuchyy_nerukhomistyu"),
      catalogValue("app.platform.administrator_zhytlovoho_kompleksu"),
      catalogValue("app.platform.upravytel_budynku"),
      catalogValue("app.platform.fakhivets_iz_zemelnykh_pytan"),
    ],
  },
  {
    id: "office",
    name: translate("app.platform.ofis_administruvannya_ta_pidtrymka"),
    category: "office",
    names: [
      catalogValue("app.platform.administrator"),
      catalogValue("app.platform.ofis_menedzher"),
      catalogValue("app.platform.sekretar"),
      catalogValue("app.platform.sekretar_kerivnyka"),
      catalogValue("app.platform.asystent_kerivnyka"),
      catalogValue("app.platform.biznes_asystent"),
      catalogValue("app.platform.osobystyy_pomichnyk"),
      catalogValue("app.platform.administratyvnyy_asystent"),
      catalogValue("app.platform.dilovod"),
      catalogValue("app.platform.arkhivarius"),
      catalogValue("app.platform.operator_vvedennya_danykh"),
      catalogValue("app.platform.operator_kontakt_tsentru"),
      catalogValue("app.platform.operator_chatu"),
      catalogValue("app.platform.dyspetcher_zvernen"),
      catalogValue("app.platform.administrator_retseptsiyi"),
      catalogValue("app.platform.menedzher_iz_dokumentoobihu"),
      catalogValue("app.platform.koordynator"),
      catalogValue("app.platform.menedzher_z_administratyvnoyi_diyalnosti"),
      catalogValue("app.platform.fakhivets_z_obrobky_zamovlen"),
      catalogValue("app.platform.operator_poshtovoho_viddilennya"),
      catalogValue("app.platform.administrator_kovorkinhu"),
      catalogValue("app.platform.moderator_kontentu"),
    ],
  },
  {
    id: "hr",
    name: translate("app.platform.personal_rekrutynh_ta_biznes_navchannya"),
    category: "office",
    names: [
      catalogValue("app.platform.hr_menedzher"),
      catalogValue("app.platform.rekruter"),
      catalogValue("catalog.terms.hr_business_partner"),
      catalogValue("catalog.terms.hr_generalist"),
      catalogValue("app.platform.hr_analityk"),
      catalogValue("app.platform.dyrektor_iz_personalu"),
      catalogValue("app.platform.kerivnyk_viddilu_kadriv"),
      catalogValue("app.platform.inspektor_iz_kadriv"),
      catalogValue("app.platform.fakhivets_iz_kadrovoho_dilovodstva"),
      catalogValue("app.platform.menedzher_iz_adaptatsiyi_personalu"),
      catalogValue("app.platform.menedzher_iz_navchannya_personalu"),
      catalogValue("app.platform.fakhivets_iz_kompensatsiy_ta_pilh"),
      catalogValue("app.platform.fakhivets_iz_rozvytku_personalu"),
      catalogValue("app.platform.sorser"),
      catalogValue("app.platform.kar_yernyy_konsultant"),
      catalogValue("app.platform.biznes_trener"),
      catalogValue("app.platform.korporatyvnyy_trener"),
      catalogValue("app.platform.trener_iz_prodazhu"),
      catalogValue("app.platform.kouch"),
      catalogValue("app.platform.fasylitator"),
      catalogValue("app.platform.fakhivets_iz_vnutrishnikh_komunikatsiy"),
    ],
  },
  {
    id: "management",
    name: translate("app.platform.kerivnytstvo_ta_upravlinnya_proyektamy"),
    category: "office",
    names: [
      catalogValue("app.platform.kerivnyk_proyektiv"),
      catalogValue("app.platform.kerivnyk"),
      catalogValue("app.platform.dyrektor"),
      catalogValue("app.platform.heneralnyy_dyrektor"),
      catalogValue("app.platform.operatsiynyy_dyrektor"),
      catalogValue("app.platform.vykonavchyy_dyrektor"),
      catalogValue("app.platform.kerivnyk_filiyi"),
      catalogValue("app.platform.kerivnyk_predstavnytstva"),
      catalogValue("app.platform.menedzher_iz_rozvytku"),
      catalogValue("app.platform.kerivnyk_vyrobnytstva"),
      catalogValue("app.platform.dyrektor_pidpryyemstva"),
      catalogValue("app.platform.dyrektor_iz_zakupivel"),
      catalogValue("app.platform.dyrektor_iz_lohistyky"),
      catalogValue("app.platform.kerivnyk_viddilu"),
      catalogValue("app.platform.antykryzovyy_menedzher"),
      catalogValue("app.platform.kerivnyk_prohram"),
      catalogValue("app.platform.biznes_konsultant"),
      catalogValue("app.platform.konsultant_iz_upravlinnya"),
      catalogValue("app.platform.menedzher_iz_yakosti"),
      catalogValue("app.platform.fakhivets_z_optymizatsiyi_protsesiv"),
    ],
  },
  {
    id: "finance",
    name: translate(
      "app.platform.bukhhalteriya_finansy_banky_ta_strakhuvannya",
    ),
    category: "legal",
    names: [
      catalogValue("app.platform.bukhhalter"),
      catalogValue("app.platform.holovnyy_bukhhalter"),
      catalogValue("app.platform.pomichnyk_bukhhaltera"),
      catalogValue("app.platform.bukhhalter_iz_zarobitnoyi_platy"),
      catalogValue("app.platform.bukhhalter_iz_pervynnoyi_dokumentatsiyi"),
      catalogValue("app.platform.bukhhalter_kasyr"),
      catalogValue("app.platform.bukhhalter_iz_podatkovoho_obliku"),
      catalogValue("app.platform.audytor"),
      catalogValue("app.platform.vnutrishniy_audytor"),
      catalogValue("app.platform.podatkovyy_konsultant"),
      catalogValue("app.platform.ekonomist"),
      catalogValue("app.platform.finansovyy_analityk"),
      catalogValue("app.platform.finansyst"),
      catalogValue("app.platform.finansovyy_kontroler"),
      catalogValue("app.platform.finansovyy_dyrektor"),
      catalogValue("app.platform.kaznachey"),
      catalogValue("app.platform.bankivskyy_pratsivnyk"),
      catalogValue("app.platform.kasyr_banku"),
      catalogValue("app.platform.operatsionist_banku"),
      catalogValue("app.platform.kredytnyy_ekspert"),
      catalogValue("app.platform.kredytnyy_analityk"),
      catalogValue("app.platform.ryzyk_menedzher"),
      catalogValue("app.platform.fakhivets_iz_finansovoho_monitorynhu"),
      catalogValue("app.platform.investytsiynyy_analityk"),
      catalogValue("app.platform.finansovyy_konsultant"),
      catalogValue("app.platform.strakhovyy_ahent"),
      catalogValue("app.platform.strakhovyy_broker"),
      catalogValue("app.platform.anderrayter"),
      catalogValue("app.platform.aktuariy"),
      catalogValue("app.platform.fakhivets_iz_vrehulyuvannya_zbytkiv"),
      catalogValue("app.platform.menedzher_lizynhovykh_operatsiy"),
      catalogValue("app.platform.fakhivets_iz_byudzhetuvannya"),
    ],
  },
  {
    id: "restaurant",
    name: translate("app.platform.restorany_kafe_ta_kharchuvannya"),
    category: "hospitality",
    names: [
      catalogValue("app.platform.kukhar"),
      catalogValue("app.platform.shef_kukhar"),
      catalogValue("app.platform.su_shef"),
      catalogValue("app.platform.kukhar_universal"),
      catalogValue("app.platform.kukhar_haryachoho_tsekhu"),
      catalogValue("app.platform.kukhar_kholodnoho_tsekhu"),
      catalogValue("app.platform.kukhar_sushyst"),
      catalogValue("app.platform.pitsayolo"),
      catalogValue("app.platform.kondyter"),
      catalogValue("app.platform.pekar"),
      catalogValue("app.platform.tistorob"),
      catalogValue("app.platform.ofitsiant"),
      catalogValue("app.platform.starshyy_ofitsiant"),
      catalogValue("app.platform.barysta"),
      catalogValue("app.platform.barmen"),
      catalogValue("app.platform.khostes"),
      catalogValue("app.platform.menedzher_restoranu"),
      catalogValue("app.platform.administrator_restoranu"),
      catalogValue("app.platform.keruyuchyy_restoranom"),
      catalogValue("app.platform.myynyk_posudu"),
      catalogValue("app.platform.kukhonnyy_pratsivnyk"),
      catalogValue("app.platform.zahotivelnyk_produktiv"),
      catalogValue("app.platform.somelye"),
      catalogValue("app.platform.kalyannyy_mayster"),
      catalogValue("app.platform.tekhnoloh_hromadskoho_kharchuvannya"),
      catalogValue("app.platform.menedzher_keyterynhu"),
      catalogValue("app.platform.pratsivnyk_zakladu_shvydkoho_kharchuvannya"),
    ],
  },
  {
    id: "travel",
    name: translate("app.platform.hoteli_turyzm_ta_podorozhi"),
    category: "hospitality",
    names: [
      catalogValue("app.platform.administrator_hotelyu"),
      catalogValue("app.platform.menedzher_hotelyu"),
      catalogValue("app.platform.keruyuchyy_hotelem"),
      catalogValue("app.platform.pokoyivka"),
      catalogValue("app.platform.nichnyy_administrator"),
      catalogValue("app.platform.konsyerzh"),
      catalogValue("app.platform.portye"),
      catalogValue("app.platform.shveytsar"),
      catalogValue("app.platform.nosiy_bahazhu"),
      catalogValue("app.platform.menedzher_iz_bronyuvannya"),
      catalogValue("app.platform.turystychnyy_ahent"),
      catalogValue("app.platform.menedzher_iz_turyzmu"),
      catalogValue("app.platform.turoperator"),
      catalogValue("app.platform.hid"),
      catalogValue("app.platform.hid_perekladach"),
      catalogValue("app.platform.suprovodzhuvach_turystychnykh_hrup"),
      catalogValue("app.platform.ahent_z_aviakvytkiv"),
      catalogValue("app.platform.administrator_khostelu"),
      catalogValue("app.platform.menedzher_kurortu"),
      catalogValue("app.platform.pratsivnyk_pralni"),
    ],
  },
  {
    id: "medicine",
    name: translate("app.platform.medytsyna_farmatsevtyka_ta_veterynariya"),
    category: "health",
    names: [
      catalogValue("app.platform.likar"),
      catalogValue("app.platform.simeynyy_likar"),
      catalogValue("app.platform.terapevt"),
      catalogValue("app.platform.pediatr"),
      catalogValue("app.platform.khirurh"),
      catalogValue("app.platform.anestezioloh"),
      catalogValue("app.platform.kardioloh"),
      catalogValue("app.platform.nevroloh"),
      catalogValue("app.platform.dermatoloh"),
      catalogValue("app.platform.endokrynoloh"),
      catalogValue("app.platform.hastroenteroloh"),
      catalogValue("app.platform.oftalmoloh"),
      catalogValue("app.platform.otolarynholoh"),
      catalogValue("app.platform.hinekoloh"),
      catalogValue("app.platform.uroloh"),
      catalogValue("app.platform.onkoloh"),
      catalogValue("app.platform.ortoped_travmatoloh"),
      catalogValue("app.platform.psykhiatr"),
      catalogValue("app.platform.likar_uzd"),
      catalogValue("app.platform.renthenoloh"),
      catalogValue("app.platform.stomatoloh"),
      catalogValue("app.platform.stomatoloh_terapevt"),
      catalogValue("app.platform.stomatoloh_khirurh"),
      catalogValue("app.platform.ortodont"),
      catalogValue("app.platform.stomatoloh_ortoped"),
      catalogValue("app.platform.zubnyy_tekhnik"),
      catalogValue("app.platform.asystent_stomatoloha"),
      catalogValue("app.platform.medychna_sestra"),
      catalogValue("app.platform.medychnyy_brat"),
      catalogValue("app.platform.operatsiyna_medychna_sestra"),
      catalogValue("app.platform.akusherka"),
      catalogValue("app.platform.feldsher"),
      catalogValue("app.platform.paramedyk"),
      catalogValue("app.platform.laborant"),
      catalogValue("app.platform.medychnyy_reyestrator"),
      catalogValue("app.platform.molodsha_medychna_sestra"),
      catalogValue("app.platform.farmatsevt"),
      catalogValue("app.platform.provizor"),
      catalogValue("app.platform.zaviduvach_apteky"),
      catalogValue("app.platform.medychnyy_predstavnyk"),
      catalogValue("app.platform.klinichnyy_doslidnyk"),
      catalogValue("app.platform.veterynar"),
      catalogValue("app.platform.veterynarnyy_feldsher"),
      catalogValue("app.platform.asystent_veterynara"),
      catalogValue("app.platform.veterynarnyy_khirurh"),
      catalogValue("app.platform.epidemioloh"),
      catalogValue("app.platform.diyetoloh"),
      catalogValue("app.platform.sportyvnyy_likar"),
    ],
  },
  {
    id: "wellbeing",
    name: translate(
      "app.platform.psykholohiya_reabilitatsiya_ta_sotsialna_dopomoha",
    ),
    category: "health",
    names: [
      catalogValue("app.platform.psykholoh"),
      catalogValue("app.platform.klinichnyy_psykholoh"),
      catalogValue("app.platform.dytyachyy_psykholoh"),
      catalogValue("app.platform.simeynyy_psykholoh"),
      catalogValue("app.platform.sportyvnyy_psykholoh"),
      catalogValue("app.platform.viyskovyy_psykholoh"),
      catalogValue("app.platform.psykhoterapevt"),
      catalogValue("app.platform.psykholoh_konsultant"),
      catalogValue("app.platform.praktychnyy_psykholoh"),
      catalogValue("app.platform.fizychnyy_terapevt"),
      catalogValue("app.platform.erhoterapevt"),
      catalogValue("app.platform.reabilitoloh"),
      catalogValue("app.platform.asystent_fizychnoho_terapevta"),
      catalogValue("app.platform.korektsiynyy_pedahoh"),
      catalogValue("app.platform.defektoloh"),
      catalogValue("app.platform.surdopedahoh"),
      catalogValue("app.platform.tyflopedahoh"),
      catalogValue("app.platform.ava_terapist"),
      catalogValue("app.platform.fakhivets_iz_rannoho_vtruchannya"),
      catalogValue("app.platform.sotsialnyy_pratsivnyk"),
      catalogValue("app.platform.sotsialnyy_pedahoh"),
      catalogValue("app.platform.sotsialnyy_vykhovatel"),
      catalogValue("app.platform.keys_menedzher"),
      catalogValue("app.platform.fakhivets_iz_suprovodu_veteraniv"),
    ],
  },
  {
    id: "beauty",
    name: translate("app.platform.krasa_ta_dohlyad"),
    category: "health",
    names: [
      catalogValue("app.platform.kosmetoloh"),
      catalogValue("app.platform.likar_kosmetoloh"),
      catalogValue("app.platform.kosmetoloh_estetyst"),
      catalogValue("app.platform.perukar"),
      catalogValue("app.platform.perukar_koloryst"),
      catalogValue("app.platform.barber"),
      catalogValue("app.platform.mayster_manikyuru"),
      catalogValue("app.platform.mayster_pedykyuru"),
      catalogValue("app.platform.podoloh"),
      catalogValue("app.platform.vizazhyst"),
      catalogValue("app.platform.brovist"),
      catalogValue("app.platform.leshmeyker"),
      catalogValue("app.platform.mayster_permanentnoho_makiyazhu"),
      catalogValue("app.platform.mayster_depilyatsiyi"),
      catalogValue("app.platform.mayster_lazernoyi_epilyatsiyi"),
      catalogValue("app.platform.masazhyst"),
      catalogValue("app.platform.spa_terapevt"),
      catalogValue("app.platform.mayster_tatu"),
      catalogValue("app.platform.mayster_pirsynhu"),
      catalogValue("app.platform.administrator_salonu_krasy"),
      catalogValue("app.platform.keruyuchyy_salonom_krasy"),
      catalogValue("app.platform.konsultant_iz_kosmetyky"),
      catalogValue("app.platform.mayster_iz_naroshchuvannya_volossya"),
      catalogValue("app.platform.hrumer"),
    ],
  },
  {
    id: "education",
    name: translate("app.platform.osvita_movy_ta_rozvytok_ditey"),
    category: "education",
    names: [
      catalogValue("app.platform.vchytel"),
      catalogValue("app.platform.vykladach"),
      catalogValue("app.platform.repetytor"),
      catalogValue("app.platform.vykladach_anhliyskoyi_movy"),
      catalogValue("app.platform.vykladach_nimetskoyi_movy"),
      catalogValue("app.platform.vykladach_frantsuzkoyi_movy"),
      catalogValue("app.platform.vykladach_polskoyi_movy"),
      catalogValue("app.platform.vykladach_ispanskoyi_movy"),
      catalogValue("app.platform.vykladach_italiyskoyi_movy"),
      catalogValue("app.platform.vykladach_kytayskoyi_movy"),
      catalogValue("app.platform.vchytel_ukrayinskoyi_movy"),
      catalogValue("app.platform.vchytel_matematyky"),
      catalogValue("app.platform.vchytel_fizyky"),
      catalogValue("app.platform.vchytel_khimiyi"),
      catalogValue("app.platform.vchytel_biolohiyi"),
      catalogValue("app.platform.vchytel_istoriyi"),
      catalogValue("app.platform.vchytel_heohrafiyi"),
      catalogValue("app.platform.vchytel_informatyky"),
      catalogValue("app.platform.vchytel_pochatkovykh_klasiv"),
      catalogValue("app.platform.vchytel_muzyky"),
      catalogValue("app.platform.vchytel_fizkultury"),
      catalogValue("app.platform.asystent_vchytelya"),
      catalogValue("app.platform.vykhovatel"),
      catalogValue("app.platform.pomichnyk_vykhovatelya"),
      catalogValue("app.platform.vykhovatel_hrupy_podovzhenoho_dnya"),
      catalogValue("app.platform.nyanya"),
      catalogValue("app.platform.huverner"),
      catalogValue("app.platform.lohoped"),
      catalogValue("app.platform.metodyst"),
      catalogValue("app.platform.dyrektor_shkoly"),
      catalogValue("app.platform.zaviduvach_dytyachoho_sadka"),
      catalogValue("app.platform.kerivnyk_navchalnoho_tsentru"),
      catalogValue("app.platform.pedahoh_orhanizator"),
      catalogValue("app.platform.vykladach_vokalu"),
      catalogValue("app.platform.vykladach_hry_na_fortepiano"),
      catalogValue("app.platform.vykladach_prohramuvannya"),
      catalogValue("app.platform.tyutor"),
      catalogValue("app.platform.perekladach"),
      catalogValue("app.platform.usnyy_perekladach"),
      catalogValue("app.platform.synkhronnyy_perekladach"),
      catalogValue("app.platform.pysmovyy_perekladach"),
      catalogValue("app.platform.lokalizator"),
      catalogValue("app.platform.osvitniy_konsultant"),
      catalogValue("app.platform.vykladach_universytetu"),
    ],
  },
  {
    id: "science",
    name: translate("app.platform.nauka_doslidzhennya_ta_laboratoriyi"),
    category: "education",
    names: [
      catalogValue("app.platform.naukovyy_spivrobitnyk"),
      catalogValue("app.platform.laborant_doslidnyk"),
      catalogValue("app.platform.bioloh"),
      catalogValue("app.platform.mikrobioloh"),
      catalogValue("app.platform.biotekhnoloh"),
      catalogValue("app.platform.khimik"),
      catalogValue("app.platform.khimik_analityk"),
      catalogValue("app.platform.fizyk"),
      catalogValue("app.platform.matematyk"),
      catalogValue("app.platform.statystyk"),
      catalogValue("app.platform.sotsioloh"),
      catalogValue("app.platform.politoloh"),
      catalogValue("app.platform.istoryk"),
      catalogValue("app.platform.arkheoloh"),
      catalogValue("app.platform.heoloh"),
      catalogValue("app.platform.heohraf"),
      catalogValue("app.platform.meteoroloh"),
      catalogValue("app.platform.ekoloh"),
      catalogValue("app.platform.inzhener_doslidnyk"),
      catalogValue("app.platform.patentoznavets"),
    ],
  },
  {
    id: "logistics",
    name: translate("app.platform.lohistyka_zakupivli_ta_sklad"),
    category: "logistics",
    names: [
      catalogValue("app.platform.lohist"),
      catalogValue("app.platform.menedzher_iz_lohistyky"),
      catalogValue("app.platform.transportnyy_lohist"),
      catalogValue("app.platform.dyspetcher"),
      catalogValue("app.platform.dyspetcher_perevezen"),
      catalogValue("app.platform.ekspedytor"),
      catalogValue("app.platform.komirnyk"),
      catalogValue("app.platform.pratsivnyk_skladu"),
      catalogValue("app.platform.zaviduvach_skladu"),
      catalogValue("app.platform.nachalnyk_skladu"),
      catalogValue("app.platform.komplektuvalnyk"),
      catalogValue("app.platform.pakuvalnyk"),
      catalogValue("app.platform.vantazhnyk"),
      catalogValue("app.platform.sortuvalnyk"),
      catalogValue("app.platform.skanuvalnyk_tovariv"),
      catalogValue("app.platform.operator_skladskoho_obliku"),
      catalogValue("app.platform.vodiy_navantazhuvacha"),
      catalogValue("app.platform.vodiy_shtabelera"),
      catalogValue("app.platform.menedzher_iz_zakupivel"),
      catalogValue("app.platform.menedzher_iz_postachannya"),
      catalogValue("app.platform.bayer"),
      catalogValue("app.platform.mytnyy_broker"),
      catalogValue("app.platform.deklarant"),
      catalogValue("app.platform.menedzher_zed"),
      catalogValue("app.platform.fakhivets_iz_mizhnarodnykh_perevezen"),
      catalogValue("app.platform.operator_poshtomata"),
      catalogValue("app.platform.kur_yer"),
      catalogValue("app.platform.pishyy_kur_yer"),
      catalogValue("app.platform.velokur_yer"),
      catalogValue("app.platform.kur_yer_na_avto"),
      catalogValue("app.platform.koordynator_dostavky"),
    ],
  },
  {
    id: "transport",
    name: translate("app.platform.transport_i_vodinnya"),
    category: "logistics",
    names: [
      catalogValue("app.platform.vodiy"),
      catalogValue("app.platform.vodiy_katehoriyi_b"),
      catalogValue("app.platform.vodiy_katehoriyi_c"),
      catalogValue("app.platform.vodiy_katehoriyi_ce"),
      catalogValue("app.platform.vodiy_katehoriyi_d"),
      catalogValue("app.platform.vodiy_mizhnarodnyk"),
      catalogValue("app.platform.vodiy_dalekobiynyk"),
      catalogValue("app.platform.vodiy_avtobusa"),
      catalogValue("app.platform.vodiy_marshrutnoho_taksi"),
      catalogValue("app.platform.vodiy_taksi"),
      catalogValue("app.platform.osobystyy_vodiy"),
      catalogValue("app.platform.vodiy_ekspedytor"),
      catalogValue("app.platform.vodiy_spetstekhniky"),
      catalogValue("app.platform.vodiy_evakuatora"),
      catalogValue("app.platform.vodiy_shvydkoyi_dopomohy"),
      catalogValue("app.platform.vodiy_troleybusa"),
      catalogValue("app.platform.vodiy_tramvaya"),
      catalogValue("app.platform.mashynist_lokomotyva"),
      catalogValue("app.platform.pomichnyk_mashynista"),
      catalogValue("app.platform.mashynist_metropolitenu"),
      catalogValue("app.platform.providnyk_pasazhyrskoho_vahona"),
      catalogValue("app.platform.ohlyadach_vahoniv"),
      catalogValue("app.platform.skladach_poyizdiv"),
      catalogValue("app.platform.dyspetcher_zaliznychnoho_transportu"),
      catalogValue("app.platform.aviadyspetcher"),
      catalogValue("app.platform.pilot"),
      catalogValue("app.platform.bortprovidnyk"),
      catalogValue("app.platform.ahent_z_obsluhovuvannya_pasazhyriv"),
      catalogValue("app.platform.pratsivnyk_aeroportu"),
    ],
  },
  {
    id: "auto",
    name: translate("app.platform.avtoservis_ta_remont_tekhniky"),
    category: "logistics",
    names: [
      catalogValue("app.platform.mekhanik"),
      catalogValue("app.platform.avtomekhanik"),
      catalogValue("app.platform.avtoslyusar"),
      catalogValue("app.platform.avtoelektryk"),
      catalogValue("app.platform.avtodiahnost"),
      catalogValue("app.platform.avtomalyar"),
      catalogValue("app.platform.rykhtuvalnyk"),
      catalogValue("app.platform.shynomontazhnyk"),
      catalogValue("app.platform.motoryst"),
      catalogValue("app.platform.mayster_sto"),
      catalogValue("app.platform.mayster_pryymalnyk"),
      catalogValue("app.platform.administrator_sto"),
      catalogValue("app.platform.avtomyynyk"),
      catalogValue("app.platform.deteyler"),
      catalogValue("app.platform.tonuvalnyk_avtomobiliv"),
      catalogValue("app.platform.mayster_iz_remontu_avtoskla"),
      catalogValue("app.platform.menedzher_iz_prodazhu_avtozapchastyn"),
      catalogValue("app.platform.vstanovlyuvach_hbo"),
      catalogValue("app.platform.mekhanik_iz_remontu_spetstekhniky"),
      catalogValue("app.platform.mayster_iz_remontu_velosypediv"),
      catalogValue("app.platform.mayster_iz_remontu_mototekhniky"),
      catalogValue("app.platform.servisnyy_inzhener"),
      catalogValue("app.platform.mayster_iz_remontu_pobutovoyi_tekhniky"),
      catalogValue("app.platform.mayster_iz_remontu_telefoniv"),
      catalogValue("app.platform.mayster_iz_remontu_komp_yuteriv"),
    ],
  },
  {
    id: "maritime",
    name: translate("app.platform.morski_ta_richkovi_spetsialnosti"),
    category: "logistics",
    names: [
      catalogValue("app.platform.kapitan_sudna"),
      catalogValue("app.platform.starshyy_pomichnyk_kapitana"),
      catalogValue("app.platform.pomichnyk_kapitana"),
      catalogValue("app.platform.matros"),
      catalogValue("app.platform.botsman"),
      catalogValue("app.platform.sudnovyy_mekhanik"),
      catalogValue("app.platform.starshyy_sudnovyy_mekhanik"),
      catalogValue("app.platform.sudnovyy_elektromekhanik"),
      catalogValue("app.platform.sudnovyy_kukhar"),
      catalogValue("app.platform.sudnovyy_ahent"),
      catalogValue("app.platform.lotsman"),
      catalogValue("app.platform.portovyy_dyspetcher"),
      catalogValue("app.platform.doker"),
      catalogValue("app.platform.kranovyk_portu"),
      catalogValue("app.platform.inspektor_suden"),
      catalogValue("app.platform.vodolaz"),
      catalogValue("app.platform.sudnobudivnyk"),
      catalogValue("app.platform.menedzher_kryuyinhu"),
    ],
  },
  {
    id: "construction",
    name: translate("app.platform.budivnytstvo_arkhitektura_ta_remont"),
    category: "construction",
    names: [
      catalogValue("app.platform.budivelnyk"),
      catalogValue("app.platform.inzhener_budivelnyk"),
      catalogValue("app.platform.arkhitektor"),
      catalogValue("app.platform.holovnyy_arkhitektor"),
      catalogValue("app.platform.inzhener_proyektuvalnyk"),
      catalogValue("app.platform.inzhener_konstruktor"),
      catalogValue("app.platform.inzhener_koshtorysnyk"),
      catalogValue("app.platform.vykonrob"),
      catalogValue("app.platform.nachalnyk_dilnytsi"),
      catalogValue("app.platform.mayster_budivelnykh_robit"),
      catalogValue("app.platform.inzhener_tekhnichnoho_nahlyadu"),
      catalogValue("app.platform.heodezyst"),
      catalogValue("app.platform.zemlevporyadnyk"),
      catalogValue("app.platform.kadastrovyy_reyestrator"),
      catalogValue("app.platform.mulyar"),
      catalogValue("app.platform.betonyar"),
      catalogValue("app.platform.armaturnyk"),
      catalogValue("app.platform.shtukatur"),
      catalogValue("app.platform.malyar"),
      catalogValue("app.platform.plytochnyk"),
      catalogValue("app.platform.hipsokartonnyk"),
      catalogValue("app.platform.pokrivelnyk"),
      catalogValue("app.platform.fasadnyk"),
      catalogValue("app.platform.uteplyuvach"),
      catalogValue("app.platform.santekhnik"),
      catalogValue("app.platform.montazhnyk"),
      catalogValue("app.platform.montazhnyk_vikon"),
      catalogValue("app.platform.montazhnyk_dverey"),
      catalogValue("app.platform.montazhnyk_metalokonstruktsiy"),
      catalogValue("app.platform.montazhnyk_ventylyatsiyi"),
      catalogValue("app.platform.montazhnyk_kondytsioneriv"),
      catalogValue("app.platform.montazhnyk_sonyachnykh_elektrostantsiy"),
      catalogValue("app.platform.montazhnyk_system_opalennya"),
      catalogValue("app.platform.montazhnyk_natyazhnykh_stel"),
      catalogValue("app.platform.parketnyk"),
      catalogValue("app.platform.stolyar"),
      catalogValue("app.platform.teslyar"),
      catalogValue("app.platform.riznorobochyy"),
      catalogValue("app.platform.mashynist_ekskavatora"),
      catalogValue("app.platform.mashynist_buldozera"),
      catalogValue("app.platform.mashynist_avtokrana"),
      catalogValue("app.platform.mashynist_bashtovoho_krana"),
      catalogValue("app.platform.burylnyk"),
      catalogValue("app.platform.promyslovyy_alpinist"),
      catalogValue("app.platform.dorozhniy_robitnyk"),
      catalogValue("app.platform.asfaltobetonnyk"),
    ],
  },
  {
    id: "production",
    name: translate(
      "app.platform.vyrobnytstvo_inzhenery_ta_robitnychi_profesiyi",
    ),
    category: "production",
    names: [
      catalogValue("app.platform.operator_vyrobnytstva"),
      catalogValue("app.platform.operator_verstativ_z_chpk"),
      catalogValue("app.platform.nalahodzhuvalnyk_verstativ_z_chpk"),
      catalogValue("app.platform.prohramist_verstativ_z_chpk"),
      catalogValue("app.platform.tokar"),
      catalogValue("app.platform.frezeruvalnyk"),
      catalogValue("app.platform.shlifuvalnyk"),
      catalogValue("app.platform.sverdluvalnyk"),
      catalogValue("app.platform.zvaryuvalnyk"),
      catalogValue("app.platform.elektrozvaryuvalnyk"),
      catalogValue("app.platform.arhonnyk"),
      catalogValue("app.platform.hazorizalnyk"),
      catalogValue("app.platform.slyusar"),
      catalogValue("app.platform.slyusar_remontnyk"),
      catalogValue("app.platform.slyusar_skladalnyk"),
      catalogValue("app.platform.elektroslyusar"),
      catalogValue("app.platform.elektryk"),
      catalogValue("app.platform.elektromonter"),
      catalogValue("app.platform.elektromekhanik"),
      catalogValue("app.platform.elektronik"),
      catalogValue("app.platform.montazhnyk_radioelektronnoyi_aparatury"),
      catalogValue("app.platform.payalnyk"),
      catalogValue("app.platform.inzhener_mekhanik"),
      catalogValue("app.platform.inzhener_elektryk"),
      catalogValue("app.platform.inzhener_elektronik"),
      catalogValue("app.platform.inzhener_tekhnoloh"),
      catalogValue("app.platform.tekhnoloh"),
      catalogValue("app.platform.holovnyy_inzhener"),
      catalogValue("app.platform.inzhener_iz_yakosti"),
      catalogValue("app.platform.kontroler_yakosti"),
      catalogValue("app.platform.inzhener_iz_metrolohiyi"),
      catalogValue("app.platform.inzhener_iz_standartyzatsiyi"),
      catalogValue("app.platform.inzhener_z_okhorony_pratsi"),
      catalogValue("app.platform.inzhener_iz_pozhezhnoyi_bezpeky"),
      catalogValue("app.platform.mayster_vyrobnytstva"),
      catalogValue("app.platform.nachalnyk_tsekhu"),
      catalogValue("app.platform.operator_liniyi"),
      catalogValue("app.platform.operator_fasuvalnoyi_liniyi"),
      catalogValue("app.platform.operator_termoplastavtomata"),
      catalogValue("app.platform.lyvarnyk"),
      catalogValue("app.platform.koval"),
      catalogValue("app.platform.termist"),
      catalogValue("app.platform.halvanik"),
      catalogValue("app.platform.skladalnyk"),
      catalogValue("app.platform.skladalnyk_mebliv"),
      catalogValue("app.platform.meblyar"),
      catalogValue("app.platform.operator_derevoobrobnykh_verstativ"),
      catalogValue("app.platform.rizbyar_po_derevu"),
      catalogValue("app.platform.mayster_iz_kamenyu"),
      catalogValue("app.platform.sklyar"),
      catalogValue("app.platform.rizalnyk_skla"),
      catalogValue("app.platform.shvachka"),
      catalogValue("app.platform.kravets"),
      catalogValue("app.platform.zakriynyk"),
      catalogValue("app.platform.vyshyvalnyk"),
      catalogValue("app.platform.prasuvalnyk"),
      catalogValue("app.platform.obbyvalnyk_mebliv"),
      catalogValue("app.platform.vzuttovyk"),
      catalogValue("app.platform.yuvelir"),
      catalogValue("app.platform.hodynnykar"),
    ],
  },
  {
    id: "food",
    name: translate("app.platform.kharchove_vyrobnytstvo"),
    category: "production",
    names: [
      catalogValue("app.platform.tekhnoloh_kharchovoho_vyrobnytstva"),
      catalogValue("app.platform.tekhnoloh_m_yasnoho_vyrobnytstva"),
      catalogValue("app.platform.tekhnoloh_molochnoho_vyrobnytstva"),
      catalogValue("app.platform.tekhnoloh_khlibopekarskoho_vyrobnytstva"),
      catalogValue("app.platform.obvalyuvalnyk_m_yasa"),
      catalogValue("app.platform.zhyluvalnyk_m_yasa"),
      catalogValue("app.platform.m_yasnyk"),
      catalogValue("app.platform.kovbasnyk"),
      catalogValue("app.platform.koptylnyk"),
      catalogValue("app.platform.syrovar"),
      catalogValue("app.platform.maslorob"),
      catalogValue("app.platform.pyvovar"),
      catalogValue("app.platform.vynorob"),
      catalogValue("app.platform.kupazhyst"),
      catalogValue("app.platform.operator_kharchovoyi_liniyi"),
      catalogValue("app.platform.operator_rozlyvu"),
      catalogValue("app.platform.fasuvalnyk"),
      catalogValue("app.platform.kalibruvalnyk_produktsiyi"),
      catalogValue("app.platform.kontroler_kharchovoyi_bezpeky"),
      catalogValue("app.platform.laborant_kharchovoho_vyrobnytstva"),
    ],
  },
  {
    id: "agro",
    name: translate("app.platform.ahro_tvarynnytstvo_ta_lisove_hospodarstvo"),
    category: "production",
    names: [
      catalogValue("app.platform.ahronom"),
      catalogValue("app.platform.holovnyy_ahronom"),
      catalogValue("app.platform.ahronom_konsultant"),
      catalogValue("app.platform.ahrokhimik"),
      catalogValue("app.platform.ahroinzhener"),
      catalogValue("app.platform.traktoryst"),
      catalogValue("app.platform.kombayner"),
      catalogValue("app.platform.mekhanizator"),
      catalogValue("app.platform.pratsivnyk_fermy"),
      catalogValue("app.platform.doyar"),
      catalogValue("app.platform.operator_mashynnoho_doyinnya"),
      catalogValue("app.platform.zootekhnik"),
      catalogValue("app.platform.tvarynnyk"),
      catalogValue("app.platform.svynar"),
      catalogValue("app.platform.ptakhivnyk"),
      catalogValue("app.platform.konyukh"),
      catalogValue("app.platform.pastukh"),
      catalogValue("app.platform.bdzholyar"),
      catalogValue("app.platform.rybovod"),
      catalogValue("app.platform.pratsivnyk_teplytsi"),
      catalogValue("app.platform.ovochivnyk"),
      catalogValue("app.platform.sadivnyk"),
      catalogValue("app.platform.kvitnykar"),
      catalogValue("app.platform.pratsivnyk_rozsadnyka"),
      catalogValue("app.platform.vynohradar"),
      catalogValue("app.platform.hrybivnyk"),
      catalogValue("app.platform.lisnyk"),
      catalogValue("app.platform.lisnychyy"),
      catalogValue("app.platform.lisorub"),
      catalogValue("app.platform.operator_kharvestera"),
      catalogValue("app.platform.operator_elevatora"),
      catalogValue("app.platform.mayster_zernovoho_kompleksu"),
      catalogValue("app.platform.laborant_zernovoyi_laboratoriyi"),
      catalogValue("app.platform.operator_ahrodrona"),
      catalogValue("app.platform.fakhivets_iz_tochnoho_zemlerobstva"),
    ],
  },
  {
    id: "energy",
    name: translate(
      "app.platform.enerhetyka_vydobuvannya_ta_komunalni_systemy",
    ),
    category: "production",
    names: [
      catalogValue("app.platform.enerhetyk"),
      catalogValue("app.platform.holovnyy_enerhetyk"),
      catalogValue("app.platform.inzhener_enerhetyk"),
      catalogValue("app.platform.inzhener_teplotekhnik"),
      catalogValue("app.platform.inzhener_kvpia"),
      catalogValue("app.platform.inzhener_z_avtomatyzatsiyi"),
      catalogValue("app.platform.dyspetcher_enerhosystemy"),
      catalogValue("app.platform.elektromonter_liniy_elektroperedachi"),
      catalogValue("app.platform.operator_kotelni"),
      catalogValue("app.platform.mashynist_kotelni"),
      catalogValue("app.platform.mashynist_turbiny"),
      catalogValue("app.platform.operator_azs"),
      catalogValue("app.platform.mashynist_nasosnykh_ustanovok"),
      catalogValue("app.platform.slyusar_hazovoho_hospodarstva"),
      catalogValue("app.platform.obkhidnyk_hazoprovodu"),
      catalogValue("app.platform.mayster_vodopostachannya"),
      catalogValue("app.platform.operator_ochysnykh_sporud"),
      catalogValue("app.platform.hirnychyy_inzhener"),
      catalogValue("app.platform.shakhtar"),
      catalogValue("app.platform.prokhidnyk"),
      catalogValue("app.platform.marksheyder"),
      catalogValue("app.platform.zbahachuvach"),
      catalogValue("app.platform.burovyy_mayster"),
      catalogValue("app.platform.operator_naftohazovydobuvannya"),
      catalogValue("app.platform.inzhener_vidnovlyuvanoyi_enerhetyky"),
    ],
  },
  {
    id: "telecom",
    name: translate("app.platform.telekomunikatsiyi_ta_systemy_zv_yazku"),
    category: "it",
    names: [
      catalogValue("app.platform.inzhener_zv_yazku"),
      catalogValue("app.platform.telekomunikatsiynyy_inzhener"),
      catalogValue("app.platform.montazhnyk_internetu"),
      catalogValue("app.platform.montazhnyk_volokonno_optychnykh_liniy"),
      catalogValue("app.platform.zvaryuvalnyk_optovolokna"),
      catalogValue("app.platform.merezhevyy_inzhener"),
      catalogValue("app.platform.radioinzhener"),
      catalogValue("app.platform.radiotekhnik"),
      catalogValue("app.platform.tekhnik_zv_yazku"),
      catalogValue("app.platform.inzhener_bazovykh_stantsiy"),
      catalogValue("app.platform.montazhnyk_system_videosposterezhennya"),
      catalogValue("app.platform.montazhnyk_okhoronnoyi_syhnalizatsiyi"),
      catalogValue("app.platform.inzhener_slabkostrumovykh_system"),
      catalogValue("app.platform.kabelnyk"),
      catalogValue("app.platform.operator_telekomunikatsiynoyi_merezhi"),
    ],
  },
  {
    id: "security",
    name: translate("app.platform.okhorona_ta_tsyvilna_bezpeka"),
    category: "other",
    names: [
      catalogValue("app.platform.okhoronnyk"),
      catalogValue("app.platform.okhoronets"),
      catalogValue("app.platform.osobystyy_okhoronets"),
      catalogValue("app.platform.nachalnyk_okhorony"),
      catalogValue("app.platform.inspektor_okhorony"),
      catalogValue("app.platform.operator_videosposterezhennya"),
      catalogValue("app.platform.operator_pulta_okhorony"),
      catalogValue("app.platform.inkasator"),
      catalogValue("app.platform.kontroler_sluzhby_bezpeky"),
      catalogValue("app.platform.fakhivets_iz_ekonomichnoyi_bezpeky"),
      catalogValue("app.platform.detektyv"),
      catalogValue("app.platform.politseyskyy"),
      catalogValue("app.platform.patrulnyy_politseyskyy"),
      catalogValue("app.platform.kinoloh"),
      catalogValue("app.platform.pozhezhnyk"),
      catalogValue("app.platform.ryatuvalnyk"),
      catalogValue("app.platform.ryatuvalnyk_na_vodi"),
      catalogValue("app.platform.saper_humanitarnoho_rozminuvannya"),
      catalogValue("app.platform.instruktor_iz_minnoyi_bezpeky"),
      catalogValue("app.platform.fakhivets_iz_tsyvilnoho_zakhystu"),
    ],
  },
  {
    id: "services",
    name: translate("app.platform.pobutovi_posluhy_ta_domashniy_personal"),
    category: "other",
    names: [
      catalogValue("app.platform.prybyralnyk"),
      catalogValue("app.platform.prybyralnytsya"),
      catalogValue("app.platform.dvirnyk"),
      catalogValue("app.platform.domrobitnytsya"),
      catalogValue("app.platform.dohlyadalnyk"),
      catalogValue("app.platform.dohlyadalnytsya"),
      catalogValue("app.platform.simeynyy_pomichnyk"),
      catalogValue("app.platform.konsyerzh_budynku"),
      catalogValue("app.platform.komendant"),
      catalogValue(
        "app.platform.robitnyk_iz_kompleksnoho_obsluhovuvannya_budivel",
      ),
      catalogValue("app.platform.kliner"),
      catalogValue("app.platform.myynyk_vikon"),
      catalogValue("app.platform.operator_khimchystky"),
      catalogValue("app.platform.pryymalnyk_khimchystky"),
      catalogValue("app.platform.mayster_iz_remontu_odyahu"),
      catalogValue("app.platform.mayster_iz_remontu_vzuttya"),
      catalogValue("app.platform.mayster_iz_vyhotovlennya_klyuchiv"),
      catalogValue("app.platform.mayster_iz_remontu_zamkiv"),
      catalogValue("app.platform.sadivnyk_iz_dohlyadu_za_dilyankoyu"),
      catalogValue("app.platform.landshaftnyy_robitnyk"),
      catalogValue("app.platform.dezinfektor"),
      catalogValue("app.platform.ozelenyuvach"),
      catalogValue("app.platform.pet_siter"),
      catalogValue("app.platform.vyhulnyk_sobak"),
      catalogValue("app.platform.dresyruvalnyk"),
      catalogValue("app.platform.pratsivnyk_prytulku_dlya_tvaryn"),
      catalogValue("app.platform.orhanizator_prostoru"),
      catalogValue("app.platform.ahent_rytualnykh_posluh"),
    ],
  },
  {
    id: "public",
    name: translate("app.platform.derzhavna_sluzhba_ta_hromadskyy_sektor"),
    category: "office",
    names: [
      catalogValue("app.platform.derzhavnyy_sluzhbovets"),
      catalogValue("app.platform.holovnyy_spetsialist_derzhavnoyi_ustanovy"),
      catalogValue(
        "app.platform.spetsialist_orhanu_mistsevoho_samovryaduvannya",
      ),
      catalogValue("app.platform.administrator_tsnap"),
      catalogValue("app.platform.derzhavnyy_reyestrator"),
      catalogValue("app.platform.fakhivets_iz_publichnykh_zakupivel"),
      catalogValue("app.platform.fakhivets_iz_mizhnarodnykh_vidnosyn"),
      catalogValue("app.platform.dyplomat"),
      catalogValue("app.platform.hrant_menedzher"),
      catalogValue("app.platform.fandreyzer"),
      catalogValue("app.platform.koordynator_volonteriv"),
      catalogValue("app.platform.menedzher_humanitarnykh_proyektiv"),
      catalogValue("app.platform.koordynator_humanitarnoyi_dopomohy"),
      catalogValue("app.platform.fakhivets_iz_monitorynhu_ta_otsinyuvannya"),
      catalogValue("app.platform.fakhivets_iz_advokatsiyi"),
      catalogValue("app.platform.fakhivets_iz_roboty_z_hromadamy"),
      catalogValue("app.platform.menedzher_hromadskoyi_orhanizatsiyi"),
      catalogValue("app.platform.menedzher_blahodiynoho_fondu"),
      catalogValue("app.platform.proyektnyy_asystent"),
      catalogValue("app.platform.fakhivets_iz_humanitarnoho_zakhystu"),
    ],
  },
  {
    id: "military",
    name: translate("app.platform.syly_oborony_ta_oboronni_tekhnolohiyi"),
    category: "other",
    names: [
      catalogValue("app.platform.viyskovosluzhbovets"),
      catalogValue("app.platform.strilets"),
      catalogValue("app.platform.hranatometnyk"),
      catalogValue("app.platform.kulemetnyk"),
      catalogValue("app.platform.rozvidnyk"),
      catalogValue("app.platform.viyskovyy_vodiy"),
      catalogValue("app.platform.mekhanik_vodiy"),
      catalogValue("app.platform.operator_bpla"),
      catalogValue("app.platform.operator_fpv_drona"),
      catalogValue("app.platform.inzhener_bpla"),
      catalogValue("app.platform.tekhnik_bpla"),
      catalogValue("app.platform.instruktor_bpla"),
      catalogValue("app.platform.operator_reb"),
      catalogValue("app.platform.fakhivets_iz_radioelektronnoyi_rozvidky"),
      catalogValue("app.platform.viyskovyy_zv_yazkivets"),
      catalogValue("app.platform.boyovyy_medyk"),
      catalogValue("app.platform.viyskovyy_feldsher"),
      catalogValue("app.platform.viyskovyy_kukhar"),
      catalogValue("app.platform.viyskovyy_lohist"),
      catalogValue("app.platform.viyskovyy_dilovod"),
      catalogValue("app.platform.instruktor_iz_taktychnoyi_medytsyny"),
      catalogValue("app.platform.mayster_iz_remontu_ozbroyennya"),
      catalogValue("app.platform.inzhener_oboronnykh_system"),
      catalogValue("app.platform.fakhivets_iz_viyskovoho_rekrutynhu"),
    ],
  },
  {
    id: "other",
    name: translate("app.platform.inshi_spetsialnosti"),
    category: "other",
    names: [catalogValue("app.platform.insha_spetsialnist")],
  },
];
const occupations = occupationSections.flatMap((occupationSection) =>
  occupationSection.names.map((name) => ({
    name,
    category: occupationSection.category,
    section: occupationSection.id,
  })),
);
const occupationAliases = {
  [catalogValue("app.platform.yuryst")]: [
    catalogValue("app.platform.yuryskonsult_2"),
    catalogValue("catalog.terms.lawyer"),
    catalogValue("app.platform.yurysty"),
    catalogValue("app.platform.yurystka"),
  ],
  [catalogValue("app.platform.advokat")]: [
    catalogValue("catalog.terms.advocate"),
    catalogValue("catalog.terms.attorney"),
    catalogValue("app.platform.advokaty"),
    catalogValue("app.platform.advokatka"),
  ],
  [catalogValue("app.platform.pomichnyk_advokata")]: [
    catalogValue("app.platform.pomoshchnyk_advokata"),
    catalogValue("app.platform.pomichnytsya_advokata"),
    catalogValue("catalog.terms.legal_assistant"),
  ],
  [catalogValue("app.platform.notarius")]: [
    catalogValue("app.platform.notaryus"),
    catalogValue("app.platform.notariuska"),
  ],
  [catalogValue("app.platform.pryvatnyy_vykonavets")]: [
    catalogValue("app.platform.chastnyy_yspolnytel"),
  ],
  [catalogValue("app.platform.komplayens_ofitser")]: [
    catalogValue("catalog.terms.compliance_officer"),
    catalogValue("app.platform.komplaens"),
  ],
  [catalogValue("app.platform.fakhivets_iz_zakhystu_personalnykh_danykh")]: [
    catalogValue("catalog.terms.dpo"),
    catalogValue("catalog.terms.data_protection_officer"),
  ],
  [catalogValue("app.platform.trener")]: [
    catalogValue("catalog.terms.coach"),
    catalogValue("app.platform.trenery"),
    catalogValue("app.platform.trenerka"),
  ],
  [catalogValue("app.platform.fitnes_trener")]: [
    catalogValue("catalog.terms.fitness"),
    catalogValue("app.platform.fytnes"),
    catalogValue("app.platform.instruktor_z_fitnesu"),
  ],
  [catalogValue("app.platform.personalnyy_trener")]: [
    catalogValue("catalog.terms.personal_trainer"),
    catalogValue("app.platform.personalnyy_trener_2"),
  ],
  [catalogValue("app.platform.trener_z_yohy")]: [
    catalogValue("catalog.terms.yoga"),
    catalogValue("app.platform.yoha"),
    catalogValue("app.platform.yohy"),
    catalogValue("app.platform.instruktor_yohy"),
    catalogValue("app.platform.ynstruktor_yohy"),
  ],
  [catalogValue("app.platform.instruktor_z_pilatesu")]: [
    catalogValue("app.platform.pylates"),
    catalogValue("app.platform.pilates"),
    catalogValue("catalog.terms.pilates"),
  ],
  [catalogValue("app.platform.trener_zi_stretchynhu")]: [
    catalogValue("catalog.terms.stretching"),
    catalogValue("app.platform.rastyazhka"),
    catalogValue("app.platform.roztyazhka"),
    catalogValue("app.platform.stretchynh"),
  ],
  [catalogValue("app.platform.trener_iz_krosfitu")]: [
    catalogValue("app.platform.krossfyt"),
    catalogValue("catalog.terms.crossfit"),
  ],
  [catalogValue("app.platform.trener_z_plavannya")]: [
    catalogValue("app.platform.plavanye"),
    catalogValue("catalog.terms.swimming"),
  ],
  [catalogValue("app.platform.khoreohraf")]: [
    catalogValue("catalog.terms.choreographer"),
    catalogValue("app.platform.tantsy"),
    catalogValue("app.platform.tantsi"),
  ],
  [catalogValue("app.platform.model")]: [
    catalogValue("catalog.terms.model"),
    catalogValue("app.platform.modely"),
    catalogValue("app.platform.modellyu"),
  ],
  [catalogValue("app.platform.fotomodel")]: [
    catalogValue("catalog.terms.photo_model"),
    catalogValue("catalog.terms.photomodel"),
    catalogValue("app.platform.fotomodely"),
  ],
  [catalogValue("app.platform.podiumna_model")]: [
    catalogValue("catalog.terms.runway_model"),
    catalogValue("app.platform.podyumnaya_model"),
  ],
  [catalogValue("app.platform.model_plus_size")]: [
    catalogValue("catalog.terms.plus_size"),
    catalogValue("app.platform.plyus_sayz"),
    catalogValue("app.platform.plyus_sayz_2"),
  ],
  [catalogValue("app.platform.model_dlya_prymirok")]: [
    catalogValue("catalog.terms.fit_model"),
    catalogValue("app.platform.prymerochnaya_model"),
  ],
  [catalogValue("app.platform.buker_modelnoho_ahentstva")]: [
    catalogValue("catalog.terms.model_booker"),
    catalogValue("app.platform.buker"),
  ],
  [catalogValue("app.platform.stylist")]: [
    catalogValue("app.platform.stylyst"),
    catalogValue("catalog.terms.stylist"),
  ],
  [catalogValue("app.platform.smm_menedzher")]: [
    catalogValue("app.platform.smm"),
    catalogValue("catalog.terms.smm"),
    catalogValue("catalog.terms.sms"),
    catalogValue("app.platform.sotsmerezh"),
    catalogValue("app.platform.sotsyalnykh_setey"),
    catalogValue("catalog.terms.social_media_manager"),
  ],
  [catalogValue("app.platform.seo_fakhivets")]: [
    catalogValue("catalog.terms.seo"),
    catalogValue("app.platform.seo"),
    catalogValue("app.platform.seoshnyk"),
  ],
  [catalogValue("app.platform.ppc_fakhivets")]: [
    catalogValue("catalog.terms.ppc"),
    catalogValue("app.platform.kontekstoloh"),
    catalogValue("app.platform.kontekstnaya_reklama"),
    catalogValue("catalog.terms.google_ads"),
  ],
  [catalogValue("app.platform.tarhetoloh")]: [
    catalogValue("app.platform.tarhet"),
    catalogValue("catalog.terms.targeting"),
    catalogValue("catalog.terms.facebook_ads"),
    catalogValue("catalog.terms.meta_ads"),
  ],
  [catalogValue("app.platform.kopirayter")]: [
    catalogValue("app.platform.kopyrayter"),
    catalogValue("catalog.terms.copywriter"),
  ],
  [catalogValue("app.platform.kontent_menedzher")]: [
    catalogValue("app.platform.kontent_menedzher_2"),
    catalogValue("catalog.terms.content_manager"),
  ],
  [catalogValue("app.platform.prohramist")]: [
    catalogValue("app.platform.prohrammyst"),
    catalogValue("catalog.terms.developer"),
    catalogValue("app.platform.rozrobnyk"),
    catalogValue("catalog.terms.software_engineer"),
  ],
  [catalogValue("app.platform.frontend_rozrobnyk")]: [
    catalogValue("catalog.terms.frontend"),
    catalogValue("catalog.terms.front_end"),
    catalogValue("app.platform.frontend"),
    catalogValue("app.platform.verstalshchyk"),
  ],
  [catalogValue("app.platform.backend_rozrobnyk")]: [
    catalogValue("catalog.terms.backend"),
    catalogValue("catalog.terms.back_end"),
    catalogValue("app.platform.bekend"),
    catalogValue("app.platform.bekend_2"),
  ],
  [catalogValue("app.platform.fullstack_rozrobnyk")]: [
    catalogValue("catalog.terms.full_stack"),
    catalogValue("catalog.terms.fullstack"),
    catalogValue("app.platform.fulstek"),
  ],
  [catalogValue("app.platform.testuvalnyk")]: [
    catalogValue("app.platform.testyrovshchyk"),
    catalogValue("catalog.terms.qa"),
    catalogValue("catalog.terms.tester"),
  ],
  [catalogValue("app.platform.systemnyy_administrator")]: [
    catalogValue("app.platform.sysadmin"),
    catalogValue("app.platform.sysadmyn"),
    catalogValue("app.platform.systemnyy_admynystrator"),
    catalogValue("catalog.terms.sysadmin"),
  ],
  [catalogValue("app.platform.analityk_danykh")]: [
    catalogValue("catalog.terms.data_analyst"),
    catalogValue("app.platform.analytyk_dannykh"),
  ],
  "Data Scientist": [
    catalogValue("app.platform.data_sayentyst"),
    catalogValue("app.platform.data_sayentyst_2"),
  ],
  [catalogValue("app.platform.ai_inzhener")]: [
    catalogValue("app.platform.shtuchnyy_intelekt"),
    catalogValue("app.platform.yskusstvennyy_yntellekt"),
    catalogValue("catalog.terms.ai_engineer"),
  ],
  [catalogValue("app.platform.inzhener_iz_kiberbezpeky")]: [
    catalogValue("catalog.terms.cybersecurity"),
    catalogValue("app.platform.kyberbezopasnost"),
  ],
  [catalogValue("app.platform.pentester")]: [
    catalogValue("catalog.terms.pentester"),
    catalogValue("catalog.terms.penetration_tester"),
  ],
  [catalogValue("app.platform.ux_ui_dyzayner")]: [
    catalogValue("catalog.terms.ui_ux"),
    catalogValue("catalog.terms.ux_ui"),
    catalogValue("catalog.terms.ux_designer"),
    catalogValue("catalog.terms.ui_designer"),
  ],
  [catalogValue("app.platform.hrafichnyy_dyzayner")]: [
    catalogValue("app.platform.hrafycheskyy_dyzayner"),
    catalogValue("catalog.terms.graphic_designer"),
  ],
  [catalogValue("app.platform.videomontazher")]: [
    catalogValue("app.platform.montazher"),
    catalogValue("app.platform.videomontazh"),
    catalogValue("app.platform.vydeomontazh"),
    catalogValue("catalog.terms.video_editor"),
  ],
  [catalogValue("app.platform.fotohraf")]: [
    catalogValue("catalog.terms.photographer"),
    catalogValue("app.platform.fotohrafka"),
  ],
  [catalogValue("app.platform.videohraf")]: [
    catalogValue("app.platform.vydeohraf"),
    catalogValue("catalog.terms.videographer"),
  ],
  [catalogValue("app.platform.modelyer")]: [
    catalogValue("app.platform.modeler"),
    catalogValue("catalog.terms.fashion_designer"),
  ],
  [catalogValue("app.platform.hr_menedzher")]: [
    catalogValue("catalog.terms.hr"),
    catalogValue("app.platform.eychar"),
    catalogValue("app.platform.eychar_2"),
    catalogValue("app.platform.menedzher_po_personalu"),
  ],
  [catalogValue("app.platform.rekruter")]: [
    catalogValue("catalog.terms.recruiter"),
    catalogValue("app.platform.rekruterka"),
  ],
  [catalogValue("app.platform.biznes_trener")]: [
    catalogValue("app.platform.byznes_trener"),
    catalogValue("catalog.terms.business_trainer"),
  ],
  [catalogValue("app.platform.kar_yernyy_konsultant")]: [
    catalogValue("app.platform.karernyy_konsultant"),
    catalogValue("catalog.terms.career_advisor"),
  ],
  [catalogValue("app.platform.menedzher_z_prodazhu")]: [
    catalogValue("catalog.terms.sales"),
    catalogValue("app.platform.prodazh"),
    catalogValue("app.platform.prodazham"),
    catalogValue("app.platform.menedzher_po_prodazham"),
  ],
  [catalogValue("app.platform.menedzher_iz_klyuchovykh_kliyentiv")]: [
    catalogValue("catalog.terms.key_account_manager"),
    catalogValue("catalog.terms.kam"),
  ],
  [catalogValue("app.platform.prodavets_konsultant")]: [
    catalogValue("app.platform.prodavets_konsultant_2"),
    catalogValue("app.platform.prodavchynya"),
    catalogValue("app.platform.prodavtsy"),
  ],
  [catalogValue("app.platform.merchendayzer")]: [
    catalogValue("catalog.terms.merchandiser"),
    catalogValue("app.platform.merchendayzynh"),
  ],
  [catalogValue("app.platform.menedzher_internet_mahazynu")]: [
    catalogValue("app.platform.ynternet_mahazyn"),
    catalogValue("catalog.terms.ecommerce_manager"),
    catalogValue("catalog.terms.e_commerce"),
  ],
  [catalogValue("app.platform.riyeltor")]: [
    catalogValue("app.platform.ryeltor"),
    catalogValue("app.platform.rieltor"),
    catalogValue("catalog.terms.realtor"),
  ],
  [catalogValue("app.platform.bukhhalter")]: [
    catalogValue("catalog.terms.accountant"),
    catalogValue("app.platform.bukhhalterka"),
  ],
  [catalogValue("app.platform.holovnyy_bukhhalter")]: [
    catalogValue("app.platform.hlavnyy_bukhhalter"),
    catalogValue("app.platform.hlavbukh"),
    catalogValue("catalog.terms.chief_accountant"),
  ],
  [catalogValue("app.platform.finansovyy_dyrektor")]: [
    catalogValue("catalog.terms.cfo"),
    catalogValue("app.platform.fynansovyy_dyrektor"),
  ],
  [catalogValue("app.platform.heneralnyy_dyrektor")]: [
    catalogValue("catalog.terms.ceo"),
    catalogValue("app.platform.heneralnyy_dyrektor_2"),
  ],
  [catalogValue("app.platform.operatsiynyy_dyrektor")]: [
    catalogValue("catalog.terms.coo"),
    catalogValue("app.platform.operatsyonnyy_dyrektor"),
  ],
  [catalogValue("app.platform.asystent_kerivnyka")]: [
    catalogValue("app.platform.assystent_rukovodytelya"),
    catalogValue("app.platform.pomoshchnyk_rukovodytelya"),
    catalogValue("catalog.terms.executive_assistant"),
  ],
  [catalogValue("app.platform.ofis_menedzher")]: [
    catalogValue("app.platform.ofys_menedzher"),
    catalogValue("catalog.terms.office_manager"),
  ],
  [catalogValue("app.platform.operator_kontakt_tsentru")]: [
    catalogValue("app.platform.koll_tsentr"),
    catalogValue("catalog.terms.call_center"),
    catalogValue("app.platform.call_tsentr"),
    catalogValue("app.platform.operator_koltsentru"),
    catalogValue("app.platform.operator_koll_tsentra"),
  ],
  [catalogValue("app.platform.operator_chatu")]: [
    catalogValue("app.platform.chat_menedzher"),
    catalogValue("app.platform.chat_menedzherka"),
    catalogValue("app.platform.operator_chata"),
    catalogValue("catalog.terms.chat_support"),
  ],
  [catalogValue("app.platform.kukhar")]: [
    catalogValue("app.platform.povar"),
    catalogValue("catalog.terms.cook"),
    catalogValue("app.platform.kukharka"),
  ],
  [catalogValue("app.platform.shef_kukhar")]: [
    catalogValue("app.platform.shef_povar"),
    catalogValue("catalog.terms.chef"),
  ],
  [catalogValue("app.platform.ofitsiant")]: [
    catalogValue("app.platform.ofytsyant"),
    catalogValue("app.platform.ofitsiantka"),
    catalogValue("catalog.terms.waiter"),
    catalogValue("catalog.terms.waitress"),
  ],
  [catalogValue("app.platform.pekar")]: [
    catalogValue("app.platform.pekar_2"),
    catalogValue("catalog.terms.baker"),
  ],
  [catalogValue("app.platform.pokoyivka")]: [
    catalogValue("app.platform.hornychnaya"),
    catalogValue("catalog.terms.housekeeper"),
  ],
  [catalogValue("app.platform.turystychnyy_ahent")]: [
    catalogValue("app.platform.turahent"),
    catalogValue("catalog.terms.travel_agent"),
  ],
  [catalogValue("app.platform.likar")]: [
    catalogValue("app.platform.vrach"),
    catalogValue("catalog.terms.doctor"),
    catalogValue("app.platform.likarka"),
  ],
  [catalogValue("app.platform.medychna_sestra")]: [
    catalogValue("app.platform.medsestra"),
    catalogValue("app.platform.medsestry"),
    catalogValue("catalog.terms.nurse"),
  ],
  [catalogValue("app.platform.medychnyy_brat")]: [
    catalogValue("app.platform.medbrat"),
  ],
  [catalogValue("app.platform.stomatoloh")]: [
    catalogValue("catalog.terms.dentist"),
    catalogValue("app.platform.zubnyy_likar"),
  ],
  [catalogValue("app.platform.farmatsevt")]: [
    catalogValue("catalog.terms.pharmacist"),
    catalogValue("app.platform.farmatsevtka"),
  ],
  [catalogValue("app.platform.veterynar")]: [
    catalogValue("app.platform.veterynarnyy_vrach"),
    catalogValue("catalog.terms.veterinarian"),
  ],
  [catalogValue("app.platform.psykholoh")]: [
    catalogValue("catalog.terms.psychologist"),
    catalogValue("app.platform.psykholohynya"),
  ],
  [catalogValue("app.platform.psykhoterapevt")]: [
    catalogValue("catalog.terms.psychotherapist"),
    catalogValue("app.platform.psykhoterapevtka"),
  ],
  [catalogValue("app.platform.reabilitoloh")]: [
    catalogValue("app.platform.reabylytoloh"),
    catalogValue("app.platform.reabilitatsiya"),
  ],
  [catalogValue("app.platform.masazhyst")]: [
    catalogValue("app.platform.massazhyst"),
    catalogValue("app.platform.masazhystka"),
    catalogValue("catalog.terms.massage_therapist"),
  ],
  [catalogValue("app.platform.perukar")]: [
    catalogValue("app.platform.parykmakher"),
    catalogValue("catalog.terms.hairdresser"),
    catalogValue("app.platform.perukarka"),
  ],
  [catalogValue("app.platform.vizazhyst")]: [
    catalogValue("app.platform.vyzazhyst"),
    catalogValue("catalog.terms.makeup_artist"),
    catalogValue("app.platform.vizazhystka"),
  ],
  [catalogValue("app.platform.mayster_manikyuru")]: [
    catalogValue("app.platform.manykyur"),
    catalogValue("app.platform.manikyur"),
    catalogValue("catalog.terms.nail_technician"),
  ],
  [catalogValue("app.platform.brovist")]: [
    catalogValue("app.platform.brovyst"),
    catalogValue("catalog.terms.brow_artist"),
  ],
  [catalogValue("app.platform.leshmeyker")]: [
    catalogValue("catalog.terms.lash_artist"),
    catalogValue("app.platform.naroshchuvannya_viy"),
    catalogValue("app.platform.narashchyvanye_resnyts"),
  ],
  [catalogValue("app.platform.hrumer")]: [
    catalogValue("catalog.terms.groomer"),
    catalogValue("app.platform.hrummer"),
  ],
  [catalogValue("app.platform.vchytel")]: [
    catalogValue("app.platform.uchytel"),
    catalogValue("app.platform.uchytelnytsa"),
    catalogValue("app.platform.vchytelka"),
    catalogValue("catalog.terms.teacher"),
  ],
  [catalogValue("app.platform.vykladach_anhliyskoyi_movy")]: [
    catalogValue("catalog.terms.english_teacher"),
    catalogValue("app.platform.uchytel_anhlyyskoho"),
    catalogValue("app.platform.vchytel_anhliyskoyi"),
    catalogValue("app.platform.anhliyska"),
  ],
  [catalogValue("app.platform.vykhovatel")]: [
    catalogValue("app.platform.vospytatel"),
    catalogValue("app.platform.vykhovatelka"),
  ],
  [catalogValue("app.platform.nyanya")]: [
    catalogValue("catalog.terms.nanny"),
    catalogValue("app.platform.bebisiter"),
    catalogValue("app.platform.bebysytter"),
    catalogValue("catalog.terms.babysitter"),
  ],
  [catalogValue("app.platform.perekladach")]: [
    catalogValue("app.platform.perevodchyk"),
    catalogValue("catalog.terms.translator"),
    catalogValue("app.platform.perekladachka"),
  ],
  [catalogValue("app.platform.vodiy")]: [
    catalogValue("app.platform.vodytel"),
    catalogValue("catalog.terms.driver"),
    catalogValue("app.platform.vodiyka"),
  ],
  [catalogValue("app.platform.vodiy_mizhnarodnyk")]: [
    catalogValue("app.platform.dalnoboyshchyk"),
    catalogValue("app.platform.mizhnarodni_perevezennya"),
    catalogValue("catalog.terms.truck_driver"),
  ],
  [catalogValue("app.platform.kur_yer")]: [
    catalogValue("app.platform.kurer"),
    catalogValue("catalog.terms.courier"),
    catalogValue("app.platform.dostavka"),
  ],
  [catalogValue("app.platform.komirnyk")]: [
    catalogValue("app.platform.kladovshchyk"),
    catalogValue("catalog.terms.warehouse_keeper"),
    catalogValue("app.platform.komirnytsya"),
  ],
  [catalogValue("app.platform.vantazhnyk")]: [
    catalogValue("app.platform.hruzchyk"),
    catalogValue("catalog.terms.loader"),
  ],
  [catalogValue("app.platform.lohist")]: [
    catalogValue("app.platform.lohyst"),
    catalogValue("catalog.terms.logistics"),
  ],
  [catalogValue("app.platform.avtoslyusar")]: [
    catalogValue("app.platform.avtoslesar"),
    catalogValue("catalog.terms.car_mechanic"),
  ],
  [catalogValue("app.platform.shynomontazhnyk")]: [
    catalogValue("app.platform.shynomontazh"),
    catalogValue("catalog.terms.tyre_fitter"),
  ],
  [catalogValue("app.platform.budivelnyk")]: [
    catalogValue("app.platform.stroytel"),
    catalogValue("catalog.terms.builder"),
  ],
  [catalogValue("app.platform.vykonrob")]: [
    catalogValue("app.platform.prorab"),
    catalogValue("catalog.terms.foreman"),
  ],
  [catalogValue("app.platform.plytochnyk")]: [
    catalogValue("app.platform.plytochnyk_oblytsovshchyk"),
    catalogValue("catalog.terms.tiler"),
  ],
  [catalogValue("app.platform.inzhener_koshtorysnyk")]: [
    catalogValue("app.platform.smetchyk"),
    catalogValue("app.platform.koshtorysnyk"),
    catalogValue("catalog.terms.estimator"),
  ],
  [catalogValue("app.platform.zvaryuvalnyk")]: [
    catalogValue("app.platform.svarshchyk"),
    catalogValue("catalog.terms.welder"),
  ],
  [catalogValue("app.platform.shvachka")]: [
    catalogValue("app.platform.shveya"),
    catalogValue("catalog.terms.seamstress"),
  ],
  [catalogValue("app.platform.slyusar")]: [catalogValue("app.platform.slesar")],
  [catalogValue("app.platform.tokar")]: [
    catalogValue("app.platform.tokar_2"),
    catalogValue("catalog.terms.turner"),
  ],
  [catalogValue("app.platform.elektryk")]: [
    catalogValue("app.platform.elektryk_2"),
    catalogValue("catalog.terms.electrician"),
  ],
  [catalogValue("app.platform.doyar")]: [
    catalogValue("app.platform.doyarka"),
    catalogValue("app.platform.doyinnya"),
    catalogValue("app.platform.doenyya"),
  ],
  [catalogValue("app.platform.operator_mashynnoho_doyinnya")]: [
    catalogValue("app.platform.operator_mashynnoho_doenyya"),
  ],
  [catalogValue("app.platform.traktoryst")]: [
    catalogValue("app.platform.traktorystka"),
    catalogValue("catalog.terms.tractor_driver"),
  ],
  [catalogValue("app.platform.ahronom")]: [
    catalogValue("catalog.terms.agronomist"),
  ],
  [catalogValue("app.platform.prybyralnyk")]: [
    catalogValue("app.platform.uborshchyk"),
    catalogValue("catalog.terms.cleaner"),
  ],
  [catalogValue("app.platform.prybyralnytsya")]: [
    catalogValue("app.platform.uborshchytsa"),
  ],
  [catalogValue("app.platform.dohlyadalnytsya")]: [
    catalogValue("app.platform.sydelka"),
    catalogValue("catalog.terms.caregiver"),
  ],
  [catalogValue("app.platform.domrobitnytsya")]: [
    catalogValue("app.platform.domrabotnytsa"),
  ],
  [catalogValue("app.platform.okhoronnyk")]: [
    catalogValue("app.platform.okhrannyk"),
    catalogValue("catalog.terms.security_guard"),
  ],
  [catalogValue("app.platform.okhoronets")]: [
    catalogValue("app.platform.okhrannyk"),
    catalogValue("app.platform.okhorona"),
  ],
  [catalogValue("app.platform.operator_bpla")]: [
    catalogValue("app.platform.operator_drona"),
    catalogValue("catalog.terms.drone_pilot"),
    catalogValue("app.platform.bpla"),
  ],
  [catalogValue("app.platform.operator_fpv_drona")]: [
    catalogValue("catalog.terms.fpv"),
    catalogValue("app.platform.fpv"),
  ],
  [catalogValue("app.platform.hrant_menedzher")]: [
    catalogValue("catalog.terms.grant_manager"),
    catalogValue("app.platform.hrantrayter"),
  ],
  [catalogValue("app.platform.fandreyzer")]: [
    catalogValue("catalog.terms.fundraiser"),
    catalogValue("app.platform.fandrayzer"),
  ],
};
const cities = [
  catalogValue("app.platform.kyyiv"),
  catalogValue("app.platform.odesa"),
  catalogValue("app.platform.dnipro"),
  catalogValue("app.platform.lviv"),
  catalogValue("app.platform.kharkiv"),
  catalogValue("app.platform.zaporizhzhya"),
  catalogValue("app.platform.vinnytsya"),
  catalogValue("app.platform.poltava"),
  catalogValue("app.platform.cherkasy"),
  catalogValue("app.platform.chernivtsi"),
  catalogValue("app.platform.chernihiv"),
  catalogValue("app.platform.zhytomyr"),
  catalogValue("app.platform.sumy"),
  catalogValue("app.platform.mykolayiv"),
  catalogValue("app.platform.kherson"),
  catalogValue("app.platform.kropyvnytskyy"),
  catalogValue("app.platform.khmelnytskyy"),
  catalogValue("app.platform.ternopil"),
  catalogValue("app.platform.ivano_frankivsk"),
  catalogValue("app.platform.lutsk"),
  catalogValue("app.platform.rivne"),
  catalogValue("app.platform.uzhhorod"),
  catalogValue("app.platform.kryvyy_rih"),
  catalogValue("app.platform.kremenchuk"),
  catalogValue("app.platform.bila_tserkva"),
  catalogValue("app.platform.brovary"),
  catalogValue("app.platform.irpin"),
  catalogValue("app.platform.bucha"),
  catalogValue("app.platform.kam_yanets_podilskyy"),
  catalogValue("app.platform.mukachevo"),
  catalogValue("app.platform.uman"),
  catalogValue("app.platform.konotop"),
  catalogValue("app.platform.lubny"),
  catalogValue("app.platform.nizhyn"),
  catalogValue("app.platform.drohobych"),
  catalogValue("app.platform.stryy"),
  catalogValue("app.platform.kalush"),
  catalogValue("app.platform.kolomyya"),
  catalogValue("app.platform.boryspil"),
  catalogValue("app.platform.pavlohrad"),
  catalogValue("catalog.remote"),
];
const schedules = [
  catalogValue("catalog.fullTime"),
  catalogValue("app.platform.nepovna_zaynyatist"),
  catalogValue("app.platform.pozminno"),
  catalogValue("app.platform.hnuchkyy_hrafik"),
  catalogValue("app.platform.proyektna_robota"),
];
const experienceLevels = [
  catalogValue("catalog.noExperience"),
  catalogValue("app.platform.do_1_roku"),
  catalogValue("app.platform.1_3_roky"),
  catalogValue("app.platform.3_5_rokiv"),
  catalogValue("app.platform.ponad_5_rokiv"),
];
const demoJobs = [
  [
    catalogValue("app.platform.menedzher_z_prodazhu"),
    catalogValue("app.platform.obriy_pryklad"),
    catalogValue("app.platform.menedzher_z_prodazhu"),
    "sales",
    catalogValue("app.platform.kyyiv"),
    3e4,
    5e4,
    catalogValue("catalog.hybrid"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.smm_menedzher"),
    catalogValue("app.platform.lyst_pryklad"),
    catalogValue("app.platform.smm_menedzher"),
    "it",
    catalogValue("catalog.remote"),
    25e3,
    4e4,
    catalogValue("catalog.remote"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.prodavets_konsultant"),
    catalogValue("app.platform.dobra_kramnytsya_pryklad"),
    catalogValue("app.platform.prodavets_konsultant"),
    "sales",
    catalogValue("app.platform.odesa"),
    22e3,
    28e3,
    catalogValue("catalog.onsite"),
    catalogValue("catalog.noExperience"),
  ],
  [
    catalogValue("app.platform.yuryst_iz_dohovirnoyi_roboty"),
    catalogValue("app.platform.pravo_pryklad"),
    catalogValue("app.platform.yuryst"),
    "legal",
    catalogValue("app.platform.dnipro"),
    3e4,
    45e3,
    catalogValue("catalog.hybrid"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.barysta"),
    catalogValue("app.platform.ranok_pryklad"),
    catalogValue("app.platform.barysta"),
    "hospitality",
    catalogValue("app.platform.lviv"),
    2e4,
    27e3,
    catalogValue("catalog.onsite"),
    catalogValue("catalog.noExperience"),
  ],
  [
    catalogValue("app.platform.vodiy_katehoriyi_b"),
    catalogValue("app.platform.rukh_pryklad"),
    catalogValue("app.platform.vodiy"),
    "logistics",
    catalogValue("app.platform.kharkiv"),
    28e3,
    35e3,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.bukhhalter"),
    catalogValue("app.platform.balans_pryklad"),
    catalogValue("app.platform.bukhhalter"),
    "legal",
    catalogValue("app.platform.vinnytsya"),
    28e3,
    38e3,
    catalogValue("catalog.hybrid"),
    catalogValue("app.platform.3_5_rokiv"),
  ],
  [
    catalogValue("app.platform.trener_z_yohy"),
    catalogValue("app.platform.prostir_pryklad"),
    catalogValue("app.platform.trener_z_yohy"),
    "education",
    catalogValue("app.platform.poltava"),
    18e3,
    3e4,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.frontend_rozrobnyk"),
    catalogValue("app.platform.kod_pryklad"),
    catalogValue("app.platform.frontend_rozrobnyk"),
    "it",
    catalogValue("catalog.remote"),
    55e3,
    85e3,
    catalogValue("catalog.remote"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.medychna_sestra"),
    catalogValue("app.platform.turbota_pryklad"),
    catalogValue("app.platform.medychna_sestra"),
    "health",
    catalogValue("app.platform.cherkasy"),
    2e4,
    29e3,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.do_1_roku"),
  ],
  [
    catalogValue("app.platform.komirnyk"),
    catalogValue("app.platform.mist_pryklad"),
    catalogValue("app.platform.komirnyk"),
    "logistics",
    catalogValue("app.platform.zaporizhzhya"),
    22e3,
    3e4,
    catalogValue("catalog.onsite"),
    catalogValue("catalog.noExperience"),
  ],
  [
    catalogValue("app.platform.ahronom"),
    catalogValue("app.platform.pole_pryklad"),
    catalogValue("app.platform.ahronom"),
    "production",
    catalogValue("app.platform.kropyvnytskyy"),
    3e4,
    45e3,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.3_5_rokiv"),
  ],
  [
    catalogValue("app.platform.hr_menedzher"),
    catalogValue("app.platform.komanda_pryklad"),
    catalogValue("app.platform.hr_menedzher"),
    "office",
    catalogValue("app.platform.ivano_frankivsk"),
    27e3,
    38e3,
    catalogValue("catalog.hybrid"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.elektryk"),
    catalogValue("app.platform.mayster_pryklad"),
    catalogValue("app.platform.elektryk"),
    "production",
    catalogValue("app.platform.mykolayiv"),
    25e3,
    35e3,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.vchytel_anhliyskoyi_movy"),
    catalogValue("app.platform.slovo_pryklad"),
    catalogValue("app.platform.vykladach_anhliyskoyi_movy"),
    "education",
    catalogValue("catalog.remote"),
    22e3,
    4e4,
    catalogValue("catalog.remote"),
    catalogValue("app.platform.do_1_roku"),
  ],
  [
    catalogValue("app.platform.kukhar"),
    catalogValue("app.platform.smak_pryklad"),
    catalogValue("app.platform.kukhar"),
    "hospitality",
    catalogValue("app.platform.uzhhorod"),
    25e3,
    33e3,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.1_3_roky"),
  ],
  [
    catalogValue("app.platform.advokat"),
    catalogValue("app.platform.zakhyst_pryklad"),
    catalogValue("app.platform.advokat"),
    "legal",
    catalogValue("app.platform.kyyiv"),
    35e3,
    6e4,
    catalogValue("catalog.onsite"),
    catalogValue("app.platform.3_5_rokiv"),
  ],
  [
    catalogValue("app.platform.operator_mashynnoho_doyinnya"),
    catalogValue("app.platform.lany_pryklad"),
    catalogValue("app.platform.doyar"),
    "production",
    catalogValue("app.platform.khmelnytskyy"),
    22e3,
    3e4,
    catalogValue("catalog.onsite"),
    catalogValue("catalog.noExperience"),
  ],
].map((demoRow, index) => ({
  id: `demo-${index + 1}`,
  title: String(demoRow[0]),
  company: String(demoRow[1]),
  occupation: String(demoRow[2]),
  category: String(demoRow[3]),
  country: "UA",
  city: String(demoRow[4]),
  salaryMin: Number(demoRow[5]),
  salaryMax: Number(demoRow[6]),
  arrangement: String(demoRow[7]),
  experience: String(demoRow[8]),
  currency: "UAH",
  schedule:
    index % 4 == 0
      ? translate("app.platform.hnuchkyy_hrafik")
      : index % 3 == 0
        ? translate("app.platform.pozminno")
        : translate("catalog.fullTime"),
  description: translate(
    "app.platform.tse_vyhadanyy_pryklad_dlya_perevirky_poshuku_ta_interfeysu_kompaniya_i_umovy_ne_ye_re",
  ),
  requirements: translate(
    "app.platform.dosvid_i_navychky_vidpovidno_do_obranoyi_profesiyi_detalni_vymohy_robotodavets_zapovn",
  ),
  benefits: translate("app.platform.navchannya_ta_rozvytok_zruchnyy_hrafik"),
  status: "active",
  createdAt: "2026-10-24T09:00:00.000Z",
  expiresAt: "2099-12-31T23:59:59.000Z",
  demo: true,
  moderationStatus: "approved",
}));
const DEFAULT_FILTERS = {
  query: "",
  city: "",
  category: "all",
  remote: false,
  noExperience: false,
  minSalary: 0,
  schedule: "",
  sort: "newest",
};
function normalizeSearch(searchText) {
  return searchText
    .toLocaleLowerCase("uk")
    .replace(/[’'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function filterJobs(jobs, filters, now = Date.now()) {
  const normalizedQuery = normalizeSearch(filters.query);
  const matchingOccupationNames = normalizedQuery
    ? Object.entries(occupationAliases)
        .filter(
          ([occupationName, aliases]) =>
            normalizeSearch(occupationName).includes(normalizedQuery) ||
            aliases.some((alias) =>
              normalizeSearch(alias).includes(normalizedQuery),
            ),
        )
        .map(([matchedOccupation]) => normalizeSearch(matchedOccupation))
    : [];
  return jobs
    .filter(
      (job) =>
        "active" === job.status &&
        "approved" === job.moderationStatus &&
        Date.parse(job.expiresAt) > now &&
        (!normalizedQuery ||
          normalizeSearch(
            [job.title, job.company, job.occupation].join(" "),
          ).includes(normalizedQuery) ||
          matchingOccupationNames.includes(normalizeSearch(job.occupation))) &&
        (!filters.city ||
          normalizeSearch(job.city).includes(normalizeSearch(filters.city))) &&
        ("all" === filters.category || job.category === filters.category) &&
        (!filters.remote ||
          catalogValue("catalog.remote") === job.arrangement) &&
        (!filters.noExperience ||
          catalogValue("catalog.noExperience") === job.experience) &&
        (!filters.minSalary || job.salaryMin >= filters.minSalary) &&
        (!filters.schedule || job.schedule === filters.schedule),
    )
    .sort((job, job4) =>
      "salary" === filters.sort
        ? job4.salaryMin - job.salaryMin
        : Date.parse(job4.createdAt) - Date.parse(job.createdAt),
    );
}
function formatSalary(amount) {
  return formatNumber(amount);
}
function OccupationPicker({ onChoose, onClose }) {
  const [occupationQuery, setOccupationQuery] = useState("");
  const [occupationSection, setOccupationSection] = useState("all");
  const matchingOccupations = useMemo(
    () =>
      (function (query, section = "all") {
        const queryTerms = normalizeSearch(query).split(" ").filter(Boolean);
        return occupations
          .filter(
            (occupation) =>
              ("all" === section || occupation.section === section) &&
              queryTerms.every((queryTerm) =>
                normalizeSearch(
                  [
                    occupation.name,
                    ...(occupationAliases[occupation.name] || []),
                  ].join(" "),
                ).includes(queryTerm),
              ),
          )
          .sort((leftOccupation, rightOccupation) => {
            const normalizedQuery = normalizeSearch(query);
            return (
              Number(
                normalizeSearch(rightOccupation.name) === normalizedQuery,
              ) -
                Number(
                  normalizeSearch(leftOccupation.name) === normalizedQuery,
                ) ||
              Number(
                normalizeSearch(rightOccupation.name).startsWith(
                  normalizedQuery,
                ),
              ) -
                Number(
                  normalizeSearch(leftOccupation.name).startsWith(
                    normalizedQuery,
                  ),
                ) ||
              leftOccupation.name.localeCompare(rightOccupation.name, "uk")
            );
          });
      })(occupationQuery, occupationSection),
    [occupationQuery, occupationSection],
  );
  return (
    <div className={"overlay occupation-overlay"} onClick={onClose}>
      <section
        className={"occupation-picker"}
        role={"dialog"}
        aria-modal={"true"}
        aria-labelledby={"occupation-picker-title"}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={"occupation-heading"}>
          <div>
            <span className={"eyebrow"}>
              {translate("app.platform.znaydy_sviy_napryam")}
            </span>
            <h2 id={"occupation-picker-title"}>
              {translate("app.platform.usi_profesiyi")}
              <small>{occupations.length}</small>
            </h2>
            <p>
              {translate(
                "app.platform.vid_advokata_do_ahronoma_obery_profesiyu_abo_znaydy_yiyi_za_nazvoyu",
              )}
            </p>
          </div>
          <button
            type={"button"}
            className={"icon-btn"}
            aria-label={translate("app.platform.zakryty_kataloh_profesiy")}
            onClick={onClose}
          >
            <XIcon />
          </button>
        </header>
        <div className={"occupation-controls"}>
          <label className={"occupation-query"}>
            {(0, jsxRuntime.jsx)(SearchIcon, {
              size: 19,
            })}
            <input
              aria-label={translate("app.platform.poshuk_profesiyi_v_katalozi")}
              placeholder={translate(
                "app.platform.napryklad_advokat_trener_model_driver",
              )}
              value={occupationQuery}
              onChange={(event) => setOccupationQuery(event.target.value)}
            />
          </label>
          <label className={"occupation-section"}>
            {translate("app.platform.napryam")}
            <select
              value={occupationSection}
              aria-label={translate("app.platform.napryam_profesiy")}
              onChange={(event) => setOccupationSection(event.target.value)}
            >
              <option value={"all"}>
                {translate("app.platform.usi_napryamy")}
                {occupationSections.length}
                {")"}
              </option>
              {occupationSections.map((occupationSection3) => (
                <option
                  value={occupationSection3.id}
                  key={occupationSection3.id}
                >
                  {occupationSection3.name}
                  {" ("}
                  {occupationSection3.names.length}
                  {")"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={"occupation-summary"} aria-live={"polite"}>
          {translate("app.platform.znaydeno_profesiy")}
          <b>{matchingOccupations.length}</b>
          {occupationQuery && (
            <button type={"button"} onClick={() => setOccupationQuery("")}>
              {translate("app.platform.ochystyty_poshuk")}
            </button>
          )}
        </div>
        <div className={"occupation-results"}>
          {occupationSections
            .filter(
              (section) =>
                "all" === occupationSection || occupationSection === section.id,
            )
            .map((section) => {
              const sectionOccupations = matchingOccupations.filter(
                (occupation) => occupation.section === section.id,
              );
              return sectionOccupations.length ? (
                <section className={"occupation-group"} key={section.id}>
                  <h3>
                    {section.name}
                    <small>{sectionOccupations.length}</small>
                  </h3>
                  <div>
                    {sectionOccupations.map((occupation) => (
                      <button
                        type={"button"}
                        onClick={() => onChoose(occupation)}
                        key={occupation.name}
                      >
                        <span>{occupation.name}</span>
                        <ArrowRightIcon size={15} />
                      </button>
                    ))}
                  </div>
                </section>
              ) : null;
            })}
          {!matchingOccupations.length && (
            <div className={"occupation-empty"}>
              <h3>{translate("app.platform.sprobuy_inshu_nazvu")}</h3>
              <p>
                {translate(
                  "app.platform.skoroty_zapyt_abo_zminy_napryam_u_vakansiyi_ta_rezyume_takozh_mozhna_vpysaty_vlasnu_s",
                )}
              </p>
              <button
                type={"button"}
                className={"outline"}
                onClick={() => {
                  setOccupationQuery("");
                  setOccupationSection("all");
                }}
              >
                {translate("app.platform.pokazaty_vsi_profesiyi")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
function parseArray(serializedArray) {
  if (Array.isArray(serializedArray)) return serializedArray;
  try {
    const parsedArray = JSON.parse(
      "string" == typeof serializedArray ? serializedArray : "[]",
    );
    return Array.isArray(parsedArray) ? parsedArray : [];
  } catch {
    return [];
  }
}
function ResumeHistory({ workHistory, education }) {
  const workEntries = parseArray(workHistory);
  const educationEntries = parseArray(education);
  return (
    <jsxRuntime.Fragment>
      {workEntries.length > 0 && (
        <section className={"resume-section"}>
          <h3>{translate("app.platform.dosvid_roboty")}</h3>
          {workEntries.map((workEntry, index) => (
            <div className={"resume-entry"} key={index}>
              <h4>{workEntry.position}</h4>
              <b>{workEntry.company}</b>
              <small>
                {workEntry.start}
                {" — "}
                {workEntry.current
                  ? translate("app.platform.doteper")
                  : workEntry.end}
              </small>
              {workEntry.description && (
                <p className={"preline"}>{workEntry.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
      {educationEntries.length > 0 && (
        <section className={"resume-section"}>
          <h3>{translate("app.platform.osvita_ta_navchannya")}</h3>
          {educationEntries.map((educationEntry, index) => (
            <div className={"resume-entry"} key={index}>
              <h4>{educationEntry.qualification}</h4>
              <p>
                {educationEntry.institution}
                {" \xb7 "}
                {educationEntry.year}
              </p>
            </div>
          ))}
        </section>
      )}
    </jsxRuntime.Fragment>
  );
}
function ResumeBuilder({ profile, setProfile }) {
  return (
    <div className={"resume-builder"}>
      <div className={"builder-heading"}>
        <div>
          <h3>{translate("app.platform.dosvid_roboty")}</h3>
          <p>
            {translate(
              "app.platform.doday_ostanni_mistsya_roboty_yakshcho_dosvidu_shche_nemaye_propusty",
            )}
          </p>
        </div>
      </div>
      {profile.workHistory.map((workEntry, index) => (
        <fieldset className={"builder-entry"} key={index}>
          <legend>
            {translate("app.platform.mistse_roboty")}
            {index + 1}
          </legend>
          <button
            type={"button"}
            className={"builder-remove"}
            aria-label={
              translate("app.platform.prybraty_mistse_roboty") + (index + 1)
            }
            onClick={() =>
              setProfile({
                ...profile,
                workHistory: profile.workHistory.filter(
                  (workEntry3, index7) => index7 !== index,
                ),
              })
            }
          >
            <Trash2Icon size={15} />
            {translate("app.platform.prybraty")}
          </button>
          <label className={"field"}>
            {translate("app.platform.posada")}
            <input
              required={true}
              minLength={2}
              maxLength={120}
              value={workEntry.position}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry4, index8) =>
                    index8 === index
                      ? {
                          ...workEntry4,
                          position: event.target.value,
                        }
                      : workEntry4,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate("app.platform.kompaniya")}
            <input
              required={true}
              minLength={2}
              maxLength={100}
              value={workEntry.company}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry5, index9) =>
                    index9 === index
                      ? {
                          ...workEntry5,
                          company: event.target.value,
                        }
                      : workEntry5,
                  ),
                })
              }
            />
          </label>
          <div className={"form-grid"}>
            <label className={"field"}>
              {translate("app.platform.pochatok")}
              <input
                required={true}
                type={"month"}
                value={workEntry.start}
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    workHistory: profile.workHistory.map(
                      (workEntry6, index10) =>
                        index10 === index
                          ? {
                              ...workEntry6,
                              start: event.target.value,
                            }
                          : workEntry6,
                    ),
                  })
                }
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.zavershennya")}
              <input
                required={!workEntry.current}
                disabled={workEntry.current}
                type={"month"}
                min={workEntry.start}
                value={workEntry.end}
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    workHistory: profile.workHistory.map(
                      (workEntry7, index11) =>
                        index11 === index
                          ? {
                              ...workEntry7,
                              end: event.target.value,
                            }
                          : workEntry7,
                    ),
                  })
                }
              />
            </label>
          </div>
          <label className={"check-label"}>
            <input
              type={"checkbox"}
              checked={workEntry.current}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry8, index12) =>
                    index12 === index
                      ? {
                          ...workEntry8,
                          current: event.target.checked,
                          end: event.target.checked ? "" : workEntry8.end,
                        }
                      : workEntry8,
                  ),
                })
              }
            />
            {translate("app.platform.pratsyuyu_tut_zaraz")}
          </label>
          <label className={"field"}>
            {translate("app.platform.zavdannya_ta_rezultaty")}
            <small>{translate("app.platform.za_bazhannyam")}</small>
            <textarea
              maxLength={2e3}
              rows={2}
              value={workEntry.description}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry9, index13) =>
                    index13 === index
                      ? {
                          ...workEntry9,
                          description: event.target.value,
                        }
                      : workEntry9,
                  ),
                })
              }
            />
          </label>
        </fieldset>
      ))}
      <button
        type={"button"}
        className={"outline small"}
        disabled={profile.workHistory.length >= 10}
        onClick={() =>
          setProfile({
            ...profile,
            workHistory: [
              ...profile.workHistory,
              {
                company: "",
                position: "",
                start: "",
                end: "",
                current: false,
                description: "",
              },
            ],
          })
        }
      >
        <PlusIcon size={15} />
        {translate("app.platform.dodaty_mistse_roboty")}
      </button>
      <div className={"builder-heading"}>
        <div>
          <h3>{translate("app.platform.osvita_ta_navchannya")}</h3>
          <p>{translate("app.platform.zaklad_spetsialnist_abo_kurs")}</p>
        </div>
      </div>
      {profile.education.map((educationEntry, index) => (
        <fieldset className={"builder-entry"} key={index}>
          <legend>
            {translate("app.platform.osvita")}
            {index + 1}
          </legend>
          <button
            type={"button"}
            className={"builder-remove"}
            aria-label={translate("app.platform.prybraty_osvitu") + (index + 1)}
            onClick={() =>
              setProfile({
                ...profile,
                education: profile.education.filter(
                  (educationEntry3, index15) => index15 !== index,
                ),
              })
            }
          >
            <Trash2Icon size={15} />
            {translate("app.platform.prybraty")}
          </button>
          <label className={"field"}>
            {translate("app.platform.zaklad_abo_orhanizator_kursu")}
            <input
              required={true}
              minLength={2}
              maxLength={150}
              value={educationEntry.institution}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry4, index16) =>
                      index16 === index
                        ? {
                            ...educationEntry4,
                            institution: event.target.value,
                          }
                        : educationEntry4,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate("app.platform.spetsialnist_abo_nazva_kursu")}
            <input
              required={true}
              minLength={2}
              maxLength={150}
              value={educationEntry.qualification}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry5, index17) =>
                      index17 === index
                        ? {
                            ...educationEntry5,
                            qualification: event.target.value,
                          }
                        : educationEntry5,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate(
              "app.platform.rik_zavershennya_abo_ochikuvanoho_zavershennya",
            )}
            <input
              required={true}
              type={"number"}
              min={1940}
              max={2100}
              value={educationEntry.year || ""}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry6, index18) =>
                      index18 === index
                        ? {
                            ...educationEntry6,
                            year: Number(event.target.value),
                          }
                        : educationEntry6,
                  ),
                })
              }
            />
          </label>
        </fieldset>
      ))}
      <button
        type={"button"}
        className={"outline small"}
        disabled={profile.education.length >= 10}
        onClick={() =>
          setProfile({
            ...profile,
            education: [
              ...profile.education,
              {
                institution: "",
                qualification: "",
                year: new Date().getFullYear(),
              },
            ],
          })
        }
      >
        <PlusIcon size={15} />
        {translate("app.platform.dodaty_osvitu")}
      </button>
    </div>
  );
}
const EMPTY_PLATFORM_STATE = {
  jobs: [],
  user: null,
  profile: null,
  favorites: [],
  searches: [],
  applications: [],
  myJobs: [],
  incoming: [],
};
const EMPTY_PROFILE = {
  workHistory: [],
  education: [],
  name: "",
  phone: "",
  city: "",
  occupation: "",
  salary: 0,
  experience: catalogValue("catalog.noExperience"),
  skills: "",
  about: "",
  schedule: catalogValue("catalog.fullTime"),
  specialties: {},
};
const EMPTY_JOB = {
  title: "",
  company: "",
  occupation: "",
  category: "other",
  city: "",
  arrangement: catalogValue("catalog.onsite"),
  schedule: catalogValue("catalog.fullTime"),
  salaryMin: 0,
  salaryMax: 0,
  experience: catalogValue("catalog.noExperience"),
  description: "",
  requirements: "",
  benefits: "",
};
const categoryIcons = {
  all: LayoutGridIcon,
  sales: StoreIcon,
  it: CodeXmlIcon,
  office: BriefcaseBusinessIcon,
  legal: ScaleIcon,
  hospitality: CoffeeIcon,
  logistics: TruckIcon,
  health: HeartIcon,
  education: GraduationCapIcon,
  production: FactoryIcon,
  construction: HammerIcon,
  other: EllipsisIcon,
};
const applicationStatusLabels = {
  new: translate("app.platform.nadislano"),
  viewed: translate("app.platform.perehlyanuto"),
  invited: translate("app.platform.zaprosheno"),
  rejected: translate("app.platform.vidmova"),
};
function Salary({ job }) {
  return (
    <jsxRuntime.Fragment>
      {job.salaryMin
        ? translate("app.platform.value1_value2", {
            value1: formatSalary(job.salaryMin),
            value2:
              job.salaryMax > job.salaryMin
                ? " – " + formatSalary(job.salaryMax)
                : "",
          })
        : translate("salary.negotiable")}
    </jsxRuntime.Fragment>
  );
}
function Platform({ initialJobs = [], initialView = "search" }) {
  var selectedOccupationName;
  const [platformState, setPlatformState] = useState({
    ...EMPTY_PLATFORM_STATE,
    jobs: initialJobs,
  });
  const [isPlatformLoading, setPlatformLoading] = useState(true);
  const [platformError, setPlatformError] = useState("");
  const [searchResults, setSearchResults] = useState(initialJobs);
  const [totalJobs, setTotalJobs] = useState(initialJobs.length);
  const [nextCursor, setNextCursor] = useState(null);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const searchRequestIdRef = useRef(0);
  const searchAbortControllerRef = useRef(null);
  const jobCacheRef = useRef(new Map());
  const [activeView, setActiveView] = useState(initialView);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [queryInput, setQueryInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showDemoJobs, setShowDemoJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [comparisonJobIds, setComparisonJobIds] = useState([]);
  const [isComparisonOpen, setComparisonOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileForm, setProfileForm] = useState(EMPTY_PROFILE);
  const [jobForm, setJobForm] = useState(EMPTY_JOB);
  const [formStep, setFormStep] = useState(0);
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const [occupationPickerTarget, setOccupationPickerTarget] = useState(null);
  const [pendingApplicationJob, setPendingApplicationJob] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  useRef(false);
  const [isSaving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isFormConfirmed, setFormConfirmed] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const availableJobs = useMemo(
    () => [...searchResults, ...(showDemoJobs ? demoJobs : [])],
    [searchResults, showDemoJobs],
  );
  const visibleJobs = useMemo(
    () =>
      filterJobs(
        "saved" === activeView
          ? availableJobs.filter((job) =>
              platformState.favorites.includes(job.id),
            )
          : availableJobs,
        filters,
      ),
    [availableJobs, filters, activeView, platformState.favorites],
  );
  const matchingDemoCount = showDemoJobs
    ? filterJobs(
        "saved" === activeView
          ? demoJobs.filter((job) => platformState.favorites.includes(job.id))
          : demoJobs,
        filters,
      ).length
    : 0;
  const isEmployer = platformState.user?.accountType === "employer";
  useEffect(() => {
    loadPlatformState();
  }, []);
  async function loadPlatformState() {
    setPlatformError("");
    try {
      const response = await fetch("/api/platform");
      const responseData = await response.json();
      if (!response.ok) throw Error(responseData.error);
      setPlatformState(responseData);
      {
        if (responseData.profile) {
          setProfileForm({
            ...responseData.profile,
            specialties: JSON.parse(responseData.profile.specialties || "{}"),
            workHistory: parseArray(responseData.profile.workHistory),
            education: parseArray(responseData.profile.education),
          });
        }
      }
    } catch (error) {
      setPlatformError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka_zavantazhennya"),
      );
    } finally {
      setPlatformLoading(false);
    }
  }
  async function loadSearchResults(appendResults = false) {
    let searchParams;
    const requestId = ++searchRequestIdRef.current;
    searchAbortControllerRef.current?.abort();
    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;
    setSearchLoading(true);
    setSearchError("");
    {
      if (!appendResults) {
        setSearchResults([]);
        setTotalJobs(0);
        setNextCursor(null);
      }
    }
    const queryParams =
      ((searchParams = new URLSearchParams()),
      filters.query && searchParams.set("q", filters.query),
      filters.city && searchParams.set("city", filters.city),
      filters.category !== DEFAULT_FILTERS.category &&
        searchParams.set("category", filters.category),
      filters.remote && searchParams.set("remote", "1"),
      filters.noExperience && searchParams.set("noExperience", "1"),
      filters.minSalary &&
        searchParams.set("minSalary", String(filters.minSalary)),
      filters.schedule && searchParams.set("schedule", filters.schedule),
      "newest" !== filters.sort && searchParams.set("sort", filters.sort),
      searchParams);
    {
      if ("saved" === activeView) {
        queryParams.set("scope", "saved");
      }
    }
    {
      if (appendResults && nextCursor) {
        queryParams.set("cursor", nextCursor);
      }
    }
    try {
      const response = await fetch("/api/jobs?" + queryParams, {
        signal: abortController.signal,
      });
      const responseData = await response.json();
      if (!response.ok)
        throw Error(
          responseData.error || translate("app.platform.pomylka_poshuku"),
        );
      if (requestId !== searchRequestIdRef.current) return;
      setSearchResults((previousResults) =>
        appendResults
          ? Array.from(
              new Map(
                [...previousResults, ...responseData.jobs].map((job) => [
                  job.id,
                  job,
                ]),
              ).values(),
            )
          : responseData.jobs,
      );
      setTotalJobs(responseData.total);
      setNextCursor(responseData.nextCursor);
    } catch (error) {
      if (
        abortController.signal.aborted ||
        requestId !== searchRequestIdRef.current
      )
        return;
      setSearchError(
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka_poshuku"),
      );
    } finally {
      {
        if (requestId === searchRequestIdRef.current) {
          setSearchLoading(false);
        }
      }
    }
  }
  function navigateToView(view) {
    if (view === "employer") {
      window.location.assign(isEmployer ? "/employer" : "/employers");
      return;
    }
    setActiveView(view);
    setSidebarOpen(false);
    setSelectedJob(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function requireAuthentication() {
    return (
      !!platformState.user || (setActiveModal("auth"), setFormError(""), false)
    );
  }
  function openModal(modal) {
    if (modal === "publish" && !isEmployer) {
      if (!platformState.user) window.location.assign("/employers");
      return;
    }
    {
      if ("about" === modal || "auth" === modal || requireAuthentication()) {
        if ("publish" === modal) {
          setEditingJobId(null);
          setJobForm(EMPTY_JOB);
        }
        if ("profile" === modal) {
          setPendingApplicationJob(null);
        }
        if ("apply" === modal) {
          setApplicationMessage("");
          setFormConfirmed(false);
        }
        setActiveModal(modal);
        setFormError("");
        setFormStep(0);
        setFormConfirmed(false);
      }
    }
  }
  async function savePlatformAction(actionPayload) {
    setSaving(true);
    setFormError("");
    try {
      const response = await fetch("/api/platform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload),
      });
      const responseData = await response.json();
      if (!response.ok) {
        {
          if (responseData.needsAuth) {
            setPlatformState((previousState) => ({
              ...EMPTY_PLATFORM_STATE,
              jobs: previousState.jobs,
            }));
            setActiveModal("auth");
          }
        }
        throw Error(
          responseData.error || translate("app.platform.ne_vdalosya_zberehty"),
        );
      }
      await loadPlatformState();
      return responseData;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : translate("app.platform.pomylka");
      setFormError(errorMessage);
      setToastMessage(errorMessage);
      return null;
    } finally {
      setSaving(false);
    }
  }
  async function toggleFavorite(job) {
    {
      if (requireAuthentication()) {
        await savePlatformAction({
          action: "favorite",
          jobId: job.id,
          remove: platformState.favorites.includes(job.id),
        });
      }
    }
  }
  function resetFilters() {
    setQueryInput("");
    setCityInput("");
    setFilters({
      ...DEFAULT_FILTERS,
    });
    history.replaceState(null, "", "/");
  }
  const updateFilter = (filterName, filterValue) =>
    setFilters((previousFilters) => ({
      ...previousFilters,
      [filterName]: filterValue,
    }));
  async function submitProfile(event) {
    {
      if ((event.preventDefault(), formStep < 2)) {
        setFormStep(formStep + 1);
      } else {
        if (isFormConfirmed) {
          if (
            await savePlatformAction({
              action: "profile",
              data: profileForm,
            })
          ) {
            if (pendingApplicationJob) {
              setSelectedJob(pendingApplicationJob);
              setPendingApplicationJob(null);
              setApplicationMessage("");
              setFormConfirmed(false);
              setFormError("");
              setActiveModal("apply");
              setToastMessage(
                translate(
                  "app.platform.rezyume_zberezheno_teper_pidtverd_vidhuk",
                ),
              );
            } else {
              setActiveModal(null);
              navigateToView("profile");
              setToastMessage(translate("app.platform.rezyume_zberezheno"));
            }
          }
        } else {
          setFormError(
            translate("app.platform.pidtverdte_zberezhennya_ankety"),
          );
        }
      }
    }
  }
  async function submitJob(event) {
    {
      if ((event.preventDefault(), formStep < 3)) {
        setFormStep(formStep + 1);
      } else {
        if (isFormConfirmed) {
          if (
            await savePlatformAction({
              action: editingJobId ? "editJob" : "publish",
              jobId: editingJobId,
              data: jobForm,
            })
          ) {
            setActiveModal(null);
            setJobForm(EMPTY_JOB);
            navigateToView("employer");
            setToastMessage(
              translate(
                "app.platform.vakansiyu_nadislano_na_perevirku_moderatoru",
              ),
            );
          }
        } else {
          setFormError(
            translate("app.platform.pidtverdte_aktualnist_vakansiyi"),
          );
        }
      }
    }
  }
  const activeFilterCount =
    Number(filters.remote) +
    Number(filters.noExperience) +
    Number(!!filters.minSalary) +
    Number(!!filters.schedule) +
    Number("all" !== filters.category);
  return (
    <div className={"app-shell"}>
      <aside className={"sidebar " + (isSidebarOpen ? "show" : "")}>
        <a
          className={"brand"}
          href={"/"}
          aria-label={translate("app.platform.pratsya_holovna")}
        >
          <span className={"brand-mark"}>
            <span />
            <span />
          </span>
          {translate("app.platform.pratsya")}
          <span className={"brand-dot"}>{"."}</span>
        </a>
        <div className={"workspace-label"}>
          {translate("app.platform.robota_ye_znaydy_svoyu")}
        </div>
        <nav aria-label={translate("app.platform.osnovna_navihatsiya")}>
          {[
            ["search", translate("app.platform.znayty_robotu"), SearchIcon],
            ["saved", translate("app.platform.zberezheni"), BookmarkIcon],
            [
              "applications",
              translate("app.platform.moyi_vidhuky"),
              BriefcaseBusinessIcon,
            ],
            ["profile", translate("app.platform.moye_rezyume"), FileTextIcon],
            ["alerts", translate("app.platform.zberezheni_poshuky"), BellIcon],
          ].map(([viewId, viewLabel, NavigationIcon]) => (
            <button
              className={"nav-item " + (activeView === viewId ? "active" : "")}
              onClick={() => navigateToView(viewId)}
              key={viewId}
            >
              {(0, jsxRuntime.jsx)(NavigationIcon, {
                size: 19,
              })}
              <span>{viewLabel}</span>
              {"saved" === viewId && platformState.favorites.length > 0 && (
                <small>{platformState.favorites.length}</small>
              )}
            </button>
          ))}
          {platformState.user?.isAdmin && (
            <button
              className={
                "nav-item " + ("moderation" === activeView ? "active" : "")
              }
              onClick={() => navigateToView("moderation")}
            >
              <ShieldCheckIcon size={19} />
              <span>{translate("app.platform.moderatsiya")}</span>
            </button>
          )}
        </nav>
        <div className={"sidebar-rule"} />
        {!isPlatformLoading && (!platformState.user || isEmployer) && (
          <a
            className={
              "nav-item " +
              (["employer", "employers"].includes(activeView) ? "active" : "")
            }
            href={isEmployer ? "/employer" : "/employers"}
          >
            <Building2Icon size={19} />
            {translate("navigation.employers")}
            <ArrowUpRightIcon size={16} className="ml-auto" />
          </a>
        )}
        <div className={"sidebar-promo"}>
          <span className={"small-icon"}>
            <LeafIcon size={21} />
          </span>
          <h3>
            {translate("app.platform.ne_prosto")}
            <br />
            {translate("app.platform.shche_odna_robota")}
          </h3>
          <p>
            {translate("app.platform.zapovny_anketu_odyn_raz")}
            <br />
            {translate("app.platform.vykorystovuy_dlya_vidhukiv")}
          </p>
          <button onClick={() => openModal("profile")}>
            {translate("app.platform.stvoryty_rezyume")}
            <ArrowRightIcon size={16} />
          </button>
        </div>
        <div className={"sidebar-bottom"}>
          <span className={"ua-flag"} />
          {translate("app.platform.zrobleno_dlya_ukrayiny")}
          <button onClick={() => openModal("about")}>
            {translate("app.platform.pro_platformu")}
            <ArrowUpRightIcon size={13} />
          </button>
        </div>
      </aside>
      {isSidebarOpen && (
        <button
          className={"sidebar-scrim"}
          aria-label={translate("app.platform.zakryty_menyu")}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={"main-shell"}>
        <header className={"topbar"}>
          <div className={"topbar-left"}>
            <button
              className={"icon-btn menu-btn"}
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              aria-label={translate("app.platform.vidkryty_menyu")}
            >
              <MenuIcon />
            </button>
            <span className={"breadcrumb"}>
              {translate("app.platform.robota_po_vsiy_ukrayini")}
              <span>{"/"}</span>{" "}
              <b>
                {
                  {
                    search: translate("app.platform.poshuk_roboty"),
                    saved: translate("app.platform.zberezheni"),
                    applications: translate("app.platform.moyi_vidhuky"),
                    profile: translate("app.platform.moye_rezyume"),
                    alerts: translate("app.platform.zberezheni_poshuky"),
                    employer: translate("employer.dashboard.title"),
                    employers: translate("navigation.employers"),
                    moderation: translate("app.platform.moderatsiya"),
                  }[activeView]
                }
              </b>
            </span>
          </div>
          <div className={"header-actions"}>
            <span className={"country"}>
              <span className={"ua-flag"} />
              {translate("app.platform.ukrayina")}
            </span>
            {!isPlatformLoading && (!platformState.user || isEmployer) && (
              <button
                className={"post-top"}
                onClick={() => openModal("publish")}
              >
                <PlusIcon size={17} />
                {translate("jobs.publish")}
              </button>
            )}
            <button
              className={"avatar"}
              title={platformState.user?.email || translate("auth.login")}
              onClick={() =>
                platformState.user
                  ? navigateToView("profile")
                  : requireAuthentication()
              }
            >
              {platformState.user ? (
                platformState.user.name.slice(0, 2).toUpperCase()
              ) : (
                <UsersIcon size={18} />
              )}
            </button>
          </div>
        </header>
        <main>
          {("search" === activeView || "saved" === activeView) && (
            <jsxRuntime.Fragment>
              {"search" === activeView ? (
                <section className={"hero"}>
                  <div className={"hero-content"}>
                    <div className={"eyebrow"}>
                      <span />
                      {translate(
                        "app.platform.platforma_dlya_tykh_khto_rukhayetsya_dali",
                      )}
                    </div>
                    <h1>
                      {translate("app.platform.tvoya_robota")}
                      <br />
                      <span>{translate("app.platform.tvoyi_pravyla")}</span>
                      <i className={"hero-fullstop"}>{"*"}</i>
                    </h1>
                    <p>
                      {translate(
                        "app.platform.poruch_iz_domom_v_inshomu_misti_abo_tam_de_tviy_noutbuk_obyray_yak_pratsyuvaty_dali",
                      )}
                    </p>
                  </div>
                  <div className={"hero-art"} aria-hidden={"true"}>
                    <span className={"board-label"}>
                      {translate("app.platform.ya_khochu_pratsyuvaty")}
                    </span>
                    <div className={"profession-board"}>
                      <span>{translate("app.platform.z_lyudmy")}</span>
                      <span className={"board-active"}>
                        {translate("app.platform.z_ideyamy")}
                        <ArrowUpRightIcon size={45} />
                      </span>
                      <span>{translate("app.platform.svoyimy_rukamy")}</span>
                    </div>
                    <div className={"board-bottom"}>
                      <span className={"ua-flag"} />
                      <b>{translate("app.platform.ukrayina_usya")}</b>
                      <span className={"board-cross"}>{"✳"}</span>
                    </div>
                    <div className={"hand-note"}>
                      {translate("app.platform.tut_pochynayetsya")}
                      <br />
                      {translate("app.platform.shchos_tvoye")}
                      <svg viewBox={"0 0 80 50"}>
                        <path
                          d={"M70 4C20 0 50 42 8 40M8 40l12-12M8 40l17 5"}
                          fill={"none"}
                          stroke={"currentColor"}
                          strokeWidth={"2"}
                        />
                      </svg>
                    </div>
                  </div>
                  <form
                    className={"search-bar"}
                    onSubmit={function (event) {
                      event?.preventDefault();
                      setFilters((previousFilters) => ({
                        ...previousFilters,
                        query: queryInput,
                        city: cityInput,
                      }));
                      navigateToView("search");
                    }}
                  >
                    <label>
                      {(0, jsxRuntime.jsx)(SearchIcon, {
                        size: 21,
                      })}
                      <input
                        aria-label={translate(
                          "app.platform.profesiya_abo_kompaniya",
                        )}
                        placeholder={translate(
                          "app.platform.posada_profesiya_abo_kompaniya",
                        )}
                        value={queryInput}
                        onChange={(event) => setQueryInput(event.target.value)}
                        list={"occupation-search"}
                      />
                    </label>
                    <label className={"city-search"}>
                      <MapPinIcon size={20} />
                      <input
                        aria-label={translate("app.platform.misto_poshuku")}
                        placeholder={translate("app.platform.usya_ukrayina")}
                        value={cityInput}
                        onChange={(event) => setCityInput(event.target.value)}
                        list={"cities"}
                      />
                    </label>
                    <button className={"primary"} type={"submit"}>
                      {translate("app.platform.znayty_robotu_2")}
                      <ArrowRightIcon size={18} />
                    </button>
                  </form>
                  <button
                    type={"button"}
                    className={"occupation-browse"}
                    onClick={() => setOccupationPickerTarget("search")}
                  >
                    {(0, jsxRuntime.jsx)(LayoutGridIcon, {
                      size: 16,
                    })}
                    {translate("app.platform.usi_profesiyi")}
                    <span>{occupations.length}</span>
                    <ArrowUpRightIcon size={15} />
                  </button>
                  <div className={"popular"}>
                    <span>{translate("app.platform.sprobuy")}</span>
                    {[
                      translate("app.platform.smm_menedzher"),
                      translate("app.platform.yuryst"),
                      translate("app.platform.vodiy"),
                      translate("catalog.remote"),
                    ].map((suggestedQuery) => (
                      <button
                        onClick={() => {
                          {
                            if (
                              catalogValue("catalog.remote") === suggestedQuery
                            ) {
                              updateFilter("remote", true);
                            } else {
                              setQueryInput(suggestedQuery);
                              updateFilter("query", suggestedQuery);
                            }
                          }
                          navigateToView("search");
                        }}
                        key={suggestedQuery}
                      >
                        {suggestedQuery}
                        <ArrowUpRightIcon size={12} />
                      </button>
                    ))}
                  </div>
                </section>
              ) : (
                <div className={"page-heading"}>
                  <span className={"eyebrow"}>
                    {translate("app.platform.tvoya_dobirka")}
                  </span>
                  <h1>{translate("app.platform.zberezheni_vakansiyi")}</h1>
                  <p>
                    {translate(
                      "app.platform.povernysya_do_propozytsiy_yaki_tebe_zatsikavyly",
                    )}
                  </p>
                </div>
              )}
              <section className={"results-section"}>
                <div className={"results-header"}>
                  <div>
                    <h2>
                      {"saved" === activeView
                        ? translate("app.platform.tviy_korotkyy_spysok")
                        : translate(
                            "app.platform.shcho_shukayemo_sohodni",
                          )}{" "}
                      <span className={"count"}>
                        {totalJobs + matchingDemoCount}
                      </span>
                    </h2>
                    <p>
                      {showDemoJobs
                        ? translate(
                            "app.platform.perehlyad_prykladiv_ta_opublikovanykh_vakansiy",
                          )
                        : translate(
                            "app.platform.aktualni_propozytsiyi_po_vsiy_ukrayini",
                          )}
                    </p>
                  </div>
                  <div className={"result-controls"}>
                    <button
                      className={"outline small filter-toggle"}
                      aria-expanded={areFiltersOpen}
                      onClick={() => setFiltersOpen(!areFiltersOpen)}
                    >
                      <SlidersHorizontalIcon size={15} />
                      {translate("app.platform.filtry")}
                    </button>
                    <label className={"sort-label"}>
                      {translate("app.platform.sortuvaty")}
                      <select
                        aria-label={translate("app.platform.sortuvannya")}
                        value={filters.sort}
                        onChange={(event) =>
                          updateFilter("sort", event.target.value)
                        }
                      >
                        <option value={"newest"}>
                          {translate("app.platform.spochatku_novi")}
                        </option>
                        <option value={"salary"}>
                          {translate("app.platform.za_zarplatoyu")}
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className={"demo-notice"}>
                  <div>
                    <span className={"notice-dot"} />
                    <p>
                      <b>
                        {translate("app.platform.pochatkova_versiya_platformy")}
                      </b>
                      <span>
                        {showDemoJobs
                          ? translate(
                              "app.platform.pryklady_vyhadani_ta_poznacheni_vidhuk_na_nykh_nedostupnyy",
                            )
                          : translate(
                              "app.platform.doday_pershu_vakansiyu_abo_podyvys_yak_pratsyuye_poshuk_na_prykladakh",
                            )}
                      </span>
                    </p>
                  </div>
                  <button
                    className={"demo-switch " + (showDemoJobs ? "on" : "")}
                    role={"switch"}
                    aria-checked={showDemoJobs}
                    onClick={() => setShowDemoJobs(!showDemoJobs)}
                  >
                    <span className={"switch-track"}>
                      <i />
                    </span>
                    {translate("app.platform.pokazaty_pryklady")}
                  </button>
                </div>
                <div className={"results-grid"}>
                  <aside
                    className={
                      "filters " + (areFiltersOpen ? "filters-open" : "")
                    }
                  >
                    <div className={"filter-heading"}>
                      <h3>
                        <SlidersHorizontalIcon size={16} />
                        {translate("app.platform.filtry_2")}
                        {activeFilterCount > 0 && (
                          <small>{activeFilterCount}</small>
                        )}
                      </h3>
                      <button onClick={resetFilters}>
                        {translate("app.platform.skynuty")}
                      </button>
                    </div>
                    <div className={"filter-block"}>
                      <h4>{translate("app.platform.sfera_roboty")}</h4>
                      {jobCategories.map((category) => {
                        const CategoryIcon =
                          categoryIcons[category.id] || LayoutGridIcon;
                        return (
                          <button
                            className={
                              "category " +
                              (filters.category === category.id
                                ? "selected"
                                : "")
                            }
                            onClick={() =>
                              updateFilter("category", category.id)
                            }
                            key={category.id}
                          >
                            {(0, jsxRuntime.jsx)(CategoryIcon, {
                              size: 16,
                            })}
                            <span>{category.name}</span>
                            {filters.category === category.id && (
                              <span className={"radio-dot"} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className={"filter-block"}>
                      <h4>{translate("app.platform.tvoyi_pobazhannya")}</h4>
                      <label className={"check-label"}>
                        <input
                          type={"checkbox"}
                          checked={filters.remote}
                          onChange={(event) =>
                            updateFilter("remote", event.target.checked)
                          }
                        />
                        {translate("app.platform.dystantsiyna_robota")}
                      </label>
                      <label className={"check-label"}>
                        <input
                          type={"checkbox"}
                          checked={filters.noExperience}
                          onChange={(event) =>
                            updateFilter("noExperience", event.target.checked)
                          }
                        />
                        {translate("catalog.noExperience")}
                      </label>
                    </div>
                    <div className={"filter-block"}>
                      <h4>{translate("app.platform.zarplata_vid_misyats")}</h4>
                      <input
                        className={"salary-input"}
                        aria-label={translate(
                          "app.platform.minimalna_zarplata",
                        )}
                        type={"number"}
                        min={"0"}
                        max={"10000000"}
                        step={"1000"}
                        placeholder={translate("app.platform.napryklad_25_000")}
                        value={filters.minSalary || ""}
                        onChange={(event) =>
                          updateFilter("minSalary", Number(event.target.value))
                        }
                      />
                      <small className={"muted"}>
                        {translate(
                          "app.platform.za_nyzhnoyu_mezheyu_propozytsiyi",
                        )}
                      </small>
                    </div>
                    <div className={"filter-block"}>
                      <h4>{translate("app.platform.zaynyatist")}</h4>
                      <select
                        className={"full-select"}
                        value={filters.schedule}
                        onChange={(event) =>
                          updateFilter("schedule", event.target.value)
                        }
                        aria-label={translate("app.platform.hrafik")}
                      >
                        <option value={""}>
                          {translate("app.platform.bud_yaka")}
                        </option>
                        {schedules.map((schedule) => (
                          <option key={schedule} value={schedule}>
                            {catalogLabel(schedule)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </aside>
                  <div className={"job-list"}>
                    {(filters.query ||
                      filters.city ||
                      activeFilterCount > 0) && (
                      <div className={"active-filters"}>
                        {filters.query && (
                          <button
                            onClick={() => {
                              setQueryInput("");
                              updateFilter("query", "");
                            }}
                          >
                            {filters.query}
                            <XIcon size={13} />
                          </button>
                        )}
                        {filters.city && (
                          <button
                            onClick={() => {
                              setCityInput("");
                              updateFilter("city", "");
                            }}
                          >
                            {filters.city}
                            <XIcon size={13} />
                          </button>
                        )}
                        {filters.remote && (
                          <button onClick={() => updateFilter("remote", false)}>
                            {translate("catalog.remote")}
                            <XIcon size={13} />
                          </button>
                        )}
                        {filters.noExperience && (
                          <button
                            onClick={() => updateFilter("noExperience", false)}
                          >
                            {translate("catalog.noExperience")}
                            <XIcon size={13} />
                          </button>
                        )}
                      </div>
                    )}
                    {(isPlatformLoading || isSearchLoading) && (
                      <div className={"loading"}>
                        <LoaderCircleIcon className={"spin"} />
                        {translate("app.platform.zavantazhuyemo_vakansiyi")}
                      </div>
                    )}
                    {platformError && (
                      <div className={"error-panel"}>
                        {platformError}
                        <button
                          className={"outline small"}
                          onClick={loadPlatformState}
                        >
                          {translate("app.platform.sprobuvaty_shche_raz")}
                        </button>
                      </div>
                    )}
                    {!isPlatformLoading &&
                      !isSearchLoading &&
                      !searchError &&
                      0 === visibleJobs.length && (
                        <div className={"empty-state"}>
                          <div className={"empty-icon"}>
                            {(0, jsxRuntime.jsx)(SearchIcon, {
                              size: 28,
                            })}
                          </div>
                          <h3>
                            {"saved" === activeView
                              ? translate(
                                  "app.platform.zberezhy_te_shcho_spodobalos",
                                )
                              : filters.query ||
                                  filters.city ||
                                  activeFilterCount
                                ? translate(
                                    "app.platform.za_tsymy_umovamy_vakansiy_nemaye",
                                  )
                                : translate(
                                    "app.platform.tut_pochynayutsya_novi_mozhlyvosti",
                                  )}
                          </h3>
                          <p>
                            {"saved" === activeView
                              ? translate(
                                  "app.platform.natysny_na_zakladku_bilya_vakansiyi_i_vona_z_yavytsya_tut",
                                )
                              : filters.query ||
                                  filters.city ||
                                  activeFilterCount
                                ? translate(
                                    "app.platform.sprobuy_inshu_profesiyu_misto_abo_menshe_filtriv",
                                  )
                                : translate(
                                    "app.platform.my_hotuyemo_platformu_do_zapusku_uzhe_mozhna_opublikuvaty_vlasnu_vakansiyu_ta_stvoryt",
                                  )}
                          </p>
                          <div className={"button-row"}>
                            {filters.query ||
                            filters.city ||
                            activeFilterCount ? (
                              <button
                                className={"primary"}
                                onClick={resetFilters}
                              >
                                {translate("app.platform.skynuty_filtry")}
                              </button>
                            ) : (
                              <jsxRuntime.Fragment>
                                <button
                                  className={"primary"}
                                  onClick={() => {
                                    setShowDemoJobs(true);
                                    resetFilters();
                                  }}
                                >
                                  {translate(
                                    "app.platform.perehlyanuty_pryklady",
                                  )}
                                  <ArrowRightIcon size={16} />
                                </button>
                                {!isPlatformLoading &&
                                  (!platformState.user || isEmployer) && (
                                    <button
                                      className={"outline"}
                                      onClick={() => openModal("publish")}
                                    >
                                      {translate("jobs.add")}
                                    </button>
                                  )}
                              </jsxRuntime.Fragment>
                            )}
                          </div>
                        </div>
                      )}
                    {visibleJobs.map((job, index) => (
                      <article
                        className={"job-card"}
                        style={{
                          animationDelay: `${35 * Math.min(index, 6)}ms`,
                        }}
                        key={job.id}
                      >
                        <div className={"job-card-head"}>
                          <div
                            className={
                              "company-logo logo-" +
                              (Number(job.id.replace(/\D/g, "")) % 5)
                            }
                          >
                            {job.company.slice(0, 1).toUpperCase()}
                          </div>
                          <div className={"company-meta"}>
                            <span>{job.company}</span>
                            <small>
                              {job.demo ? (
                                <jsxRuntime.Fragment>
                                  <span className={"demo-badge"}>
                                    {translate("app.platform.pryklad")}
                                  </span>
                                  {translate("app.platform.vyhadana_kompaniya")}
                                </jsxRuntime.Fragment>
                              ) : (
                                <jsxRuntime.Fragment>
                                  <span className={"live-dot"} />
                                  {translate(
                                    "app.platform.pryama_publikatsiya",
                                  )}
                                </jsxRuntime.Fragment>
                              )}
                            </small>
                          </div>
                          <button
                            className={
                              "icon-btn bookmark " +
                              (platformState.favorites.includes(job.id)
                                ? "bookmarked"
                                : "")
                            }
                            onClick={() => toggleFavorite(job)}
                            aria-label={
                              platformState.favorites.includes(job.id)
                                ? translate(
                                    "app.platform.prybraty_zi_zberezhenykh",
                                  )
                                : translate("app.platform.zberehty_vakansiyu")
                            }
                          >
                            {(0, jsxRuntime.jsx)(BookmarkIcon, {
                              size: 21,
                              fill: platformState.favorites.includes(job.id)
                                ? "currentColor"
                                : "none",
                            })}
                          </button>
                        </div>
                        <button
                          className={"job-title"}
                          onClick={() => setSelectedJob(job)}
                        >
                          {job.title}
                          <ArrowUpRightIcon size={19} />
                        </button>
                        <div className={"job-salary"}>
                          <Salary job={job} />
                          <small>{translate("app.platform.misyats")}</small>
                        </div>
                        <div className={"job-tags"}>
                          <span>
                            <MapPinIcon size={13} />
                            {job.city}
                          </span>
                          <span>
                            {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                              size: 13,
                            })}
                            {catalogLabel(job.arrangement)}
                          </span>
                          <span>
                            <ClockIcon size={13} />
                            {catalogLabel(job.schedule)}
                          </span>
                          {catalogValue("catalog.noExperience") ===
                            job.experience && (
                            <span className={"green-tag"}>
                              {translate("catalog.noExperience")}
                            </span>
                          )}
                        </div>
                        <div className={"job-card-footer"}>
                          <span>
                            {job.demo
                              ? translate(
                                  "app.platform.pryklad_dlya_perevirky_interfeysu",
                                )
                              : translate("app.jobs.id.page.opublikovano") +
                                formatDate(job.createdAt)}
                          </span>
                          <div>
                            <button
                              className={
                                "compare-button " +
                                (comparisonJobIds.includes(job.id)
                                  ? "chosen"
                                  : "")
                              }
                              onClick={() => {
                                var job15;
                                job15 = job;
                                return void (jobCacheRef.current.set(
                                  job15.id,
                                  job15,
                                ),
                                setComparisonJobIds((previousComparisonIds) =>
                                  previousComparisonIds.includes(job15.id)
                                    ? previousComparisonIds.filter(
                                        (a) => a !== job15.id,
                                      )
                                    : previousComparisonIds.length < 3
                                      ? [...previousComparisonIds, job15.id]
                                      : previousComparisonIds,
                                ),
                                3 !== comparisonJobIds.length ||
                                  comparisonJobIds.includes(job15.id) ||
                                  setToastMessage(
                                    translate(
                                      "app.platform.porivnyayte_do_trokh_vakansiy_odnochasno",
                                    ),
                                  ));
                              }}
                              aria-label={translate(
                                "app.platform.porivnyaty_vakansiyu",
                              )}
                            >
                              <GitCompareArrowsIcon size={15} />
                              <span>
                                {translate("app.platform.porivnyaty")}
                              </span>
                            </button>
                            <button
                              className={"details-link"}
                              onClick={() => setSelectedJob(job)}
                            >
                              {translate("app.platform.detalnishe")}
                              <ArrowRightIcon size={15} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                    {searchError && (
                      <div className={"error-panel"} role={"alert"}>
                        {searchError}
                        <button
                          className={"outline small"}
                          onClick={() =>
                            loadSearchResults(!!searchResults.length)
                          }
                        >
                          {translate("app.platform.sprobuvaty_shche_raz")}
                        </button>
                      </div>
                    )}
                    {nextCursor && (
                      <button
                        className={"load-more outline"}
                        disabled={isSearchLoading}
                        onClick={() => loadSearchResults(true)}
                      >
                        {isSearchLoading
                          ? translate("app.platform.zavantazhuyemo")
                          : translate("app.platform.pokazaty_shche_vakansiyi")}
                        <ChevronDownIcon size={16} />
                      </button>
                    )}
                  </div>
                  <aside className={"right-rail"}>
                    <div className={"resume-promo"}>
                      <div className={"resume-illustration"}>
                        {(0, jsxRuntime.jsx)(FileTextIcon, {
                          size: 44,
                          strokeWidth: 1.3,
                        })}
                        <span>
                          <CheckIcon size={14} />
                        </span>
                      </div>
                      <span className={"eyebrow"}>
                        {translate("app.platform.tviy_nastupnyy_krok")}
                      </span>
                      <h3>
                        {translate("app.platform.ty_bilshe")}
                        <br />
                        {translate("app.platform.nizh_pdf")}
                      </h3>
                      <p>
                        {translate("app.platform.pokazhy_shcho_vmiyesh")}
                        <br />
                        {translate("app.platform.anketa_dopomozhe_z_reshtoyu")}
                      </p>
                      <button
                        className={"primary"}
                        onClick={() => openModal("profile")}
                      >
                        {translate("app.platform.zapovnyty_anketu")}
                        <ArrowUpRightIcon size={16} />
                      </button>
                      <small>
                        {translate(
                          "app.platform.bezkoshtovno_zberihayetsya_v_kabineti",
                        )}
                      </small>
                    </div>
                    {!isPlatformLoading &&
                      (!platformState.user || isEmployer) && (
                        <div className={"employer-promo"}>
                          <span className={"small-icon"}>
                            <Building2Icon size={20} />
                          </span>
                          <h3>{translate("app.platform.shukayesh_lyudey")}</h3>
                          <p>
                            {translate(
                              "app.platform.rozmishchuy_vakansiyi_po_vsiy_ukrayini_na_starti_bez_oplaty",
                            )}
                          </p>
                          <button onClick={() => openModal("publish")}>
                            {translate("jobs.add")}
                            <ArrowUpRightIcon size={16} />
                          </button>
                        </div>
                      )}
                    <div className={"trust-note"}>
                      <ShieldCheckIcon size={18} />
                      <p>
                        {translate(
                          "app.platform.pomityv_pidozrilu_propozytsiyu_povidom_nam_u_karttsi_vakansiyi",
                        )}
                      </p>
                    </div>
                  </aside>
                </div>
                <div className={"save-search-strip"}>
                  <div className={"small-icon"}>
                    <BellIcon size={21} />
                  </div>
                  <div>
                    <h3>{translate("app.platform.zberezhy_sviy_poshuk")}</h3>
                    <p>
                      {translate(
                        "app.platform.povertaysya_do_potribnykh_profesiy_mist_i_umov_odnym_natyskannyam",
                      )}
                    </p>
                  </div>
                  <button
                    className={"outline"}
                    disabled={isSaving}
                    onClick={async () => {
                      {
                        if (
                          requireAuthentication() &&
                          (await savePlatformAction({
                            action: "saveSearch",
                            name: [
                              filters.query ||
                                translate("app.platform.usi_profesiyi_2"),
                              filters.city ||
                                translate("app.platform.usya_ukrayina"),
                            ].join(" \xb7 "),
                            filters,
                          }))
                        ) {
                          setToastMessage(
                            translate(
                              "app.platform.poshuk_zberezheno_v_kabineti",
                            ),
                          );
                        }
                      }
                    }}
                  >
                    {translate("app.platform.zberehty_poshuk")}
                    <PlusIcon size={16} />
                  </button>
                </div>
              </section>
            </jsxRuntime.Fragment>
          )}
          {"profile" === activeView && (
            <section className={"dashboard"}>
              <div className={"page-heading"}>
                <span className={"eyebrow"}>
                  {translate("app.platform.pro_tebe_po_suti")}
                </span>
                <h1>{translate("app.platform.moye_rezyume")}</h1>
                <p>
                  {translate(
                    "app.platform.odna_anketa_dlya_vsikh_vidhukiv_kontakty_bachyt_robotodavets_yakomu_ty_vidhukneshsya",
                  )}
                </p>
              </div>
              {platformState.profile ? (
                <jsxRuntime.Fragment>
                  <div className={"profile-card printable"}>
                    <div className={"profile-title"}>
                      <div className={"profile-avatar"}>
                        {profileForm.name.slice(0, 1)}
                      </div>
                      <div>
                        <h2>{profileForm.name}</h2>
                        <p>
                          {profileForm.occupation}
                          {" \xb7 "}
                          {profileForm.city}
                        </p>
                      </div>
                      <button
                        className={"outline no-print"}
                        onClick={() => openModal("profile")}
                      >
                        {translate("app.platform.redahuvaty")}
                      </button>
                    </div>
                    <div className={"profile-facts"}>
                      <span>
                        <WalletIcon size={18} />
                        {profileForm.salary
                          ? formatSalary(profileForm.salary) +
                            translate("app.platform.text")
                          : translate("salary.byAgreement")}
                      </span>
                      <span>
                        {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                          size: 18,
                        })}
                        {catalogLabel(profileForm.experience)}
                      </span>
                      <span>
                        <ClockIcon size={18} />
                        {catalogLabel(profileForm.schedule)}
                      </span>
                    </div>
                    <h3>{translate("app.platform.navychky")}</h3>
                    <p className={"preline"}>{profileForm.skills}</p>
                    <ResumeHistory
                      workHistory={profileForm.workHistory}
                      education={profileForm.education}
                    />
                    {profileForm.about && (
                      <jsxRuntime.Fragment>
                        <h3>{translate("app.platform.pro_sebe_ta_dosvid")}</h3>
                        <p className={"preline"}>{profileForm.about}</p>
                      </jsxRuntime.Fragment>
                    )}
                    {Object.entries(profileForm.specialties)
                      .filter(([, specialtyName]) => specialtyName)
                      .map(([specialtyName, specialtyValue]) => (
                        <div key={specialtyName}>
                          <h3>{specialtyName}</h3>
                          <p>{specialtyValue}</p>
                        </div>
                      ))}
                    <h3>{translate("app.platform.kontakty")}</h3>
                    <p>
                      {profileForm.phone}
                      {" \xb7 "}
                      {platformState.user?.email}
                    </p>
                  </div>
                  <div className={"button-row"}>
                    <button
                      className={"primary"}
                      onClick={function () {
                        window.print();
                      }}
                    >
                      <DownloadIcon size={17} />
                      {translate("app.platform.druk_zberehty_pdf")}
                    </button>
                    <button
                      className={"outline"}
                      onClick={() => navigateToView("search")}
                    >
                      {translate("app.platform.do_vakansiy")}
                      <ArrowRightIcon size={16} />
                    </button>
                  </div>
                </jsxRuntime.Fragment>
              ) : (
                <div className={"empty-state"}>
                  {(0, jsxRuntime.jsx)(FileTextIcon, {
                    size: 36,
                  })}
                  <h3>
                    {translate(
                      "app.platform.rozkazhy_pro_sebe_u_trokh_krokakh",
                    )}
                  </h3>
                  <p>
                    {translate(
                      "app.platform.kontakty_profesiya_ta_navychky_anketu_mozhna_redahuvaty_bud_koly",
                    )}
                  </p>
                  <button
                    className={"primary"}
                    onClick={() => openModal("profile")}
                  >
                    {translate("app.platform.stvoryty_rezyume_2")}
                    <PlusIcon size={16} />
                  </button>
                </div>
              )}
            </section>
          )}
          {"applications" === activeView && (
            <section className={"dashboard"}>
              <div className={"page-heading"}>
                <span className={"eyebrow"}>
                  {translate("app.platform.trymay_ruku_na_pulsi")}
                </span>
                <h1>{translate("app.platform.moyi_vidhuky")}</h1>
                <p>
                  {translate(
                    "app.platform.tut_vydno_na_yaki_vakansiyi_ty_vidhuknuvsya_ta_yakyy_status_vstanovyv_robotodavets",
                  )}
                </p>
              </div>
              {platformState.applications.length ? (
                platformState.applications.map(({ application, job }) => (
                  <div className={"dashboard-card"} key={application.id}>
                    <div>
                      <small>{job.company}</small>
                      <h3>{job.title}</h3>
                      <p>{formatDate(application.createdAt)}</p>
                    </div>
                    <span className={"status status-" + application.status}>
                      {applicationStatusLabels[application.status]}
                    </span>
                    <button
                      className={"outline small"}
                      onClick={() => setSelectedJob(job)}
                    >
                      {translate("app.platform.vakansiya")}
                      <ArrowUpRightIcon size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className={"empty-state"}>
                  {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                    size: 36,
                  })}
                  <h3>
                    {translate("app.platform.nastupnyy_krok_pershyy_vidhuk")}
                  </h3>
                  <p>
                    {translate(
                      "app.platform.obery_vakansiyu_ta_nadishly_anketu_pryklady_ne_pryymayut_vidhukiv",
                    )}
                  </p>
                  <button
                    className={"primary"}
                    onClick={() => navigateToView("search")}
                  >
                    {translate("app.platform.znayty_robotu")}
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              )}
            </section>
          )}
          {"alerts" === activeView && (
            <section className={"dashboard"}>
              <div className={"page-heading"}>
                <span className={"eyebrow"}>
                  {translate("app.platform.use_potribne_pid_rukoyu")}
                </span>
                <h1>{translate("app.platform.zberezheni_poshuky")}</h1>
                <p>
                  {translate(
                    "app.platform.umovy_poshuku_zberihayutsya_u_tvoyemu_kabineti_zovnishni_spovishchennya_shche_ne_pidk",
                  )}
                </p>
              </div>
              {platformState.searches.length ? (
                platformState.searches.map((savedSearch) => (
                  <div className={"dashboard-card"} key={savedSearch.id}>
                    <div>
                      <h3>{savedSearch.name}</h3>
                      <p>
                        {translate(
                          "app.platform.shvydkyy_perekhid_do_aktualnoyi_dobirky",
                        )}
                      </p>
                    </div>
                    <button
                      className={"primary small"}
                      onClick={() => {
                        const restoredFilters = {
                          ...DEFAULT_FILTERS,
                          ...JSON.parse(savedSearch.filters),
                        };
                        setFilters(restoredFilters);
                        setQueryInput(restoredFilters.query);
                        setCityInput(restoredFilters.city);
                        navigateToView("search");
                      }}
                    >
                      {translate("app.platform.vidkryty")}
                      <ArrowRightIcon size={15} />
                    </button>
                    <button
                      className={"icon-btn"}
                      aria-label={translate("app.platform.vydalyty_poshuk")}
                      onClick={() =>
                        savePlatformAction({
                          action: "deleteSearch",
                          id: savedSearch.id,
                        })
                      }
                    >
                      <Trash2Icon size={17} />
                    </button>
                  </div>
                ))
              ) : (
                <div className={"empty-state"}>
                  <BellIcon size={36} />
                  <h3>{translate("app.platform.zberezhy_zruchnu_dobirku")}</h3>
                  <p>
                    {translate(
                      "app.platform.vstanovy_filtry_u_poshuku_ta_natysny_zberehty_poshuk",
                    )}
                  </p>
                  <button
                    className={"primary"}
                    onClick={() => navigateToView("search")}
                  >
                    {translate("app.platform.do_poshuku")}
                  </button>
                </div>
              )}
            </section>
          )}
          {activeView === "employers" && (
            <section className="dashboard">
              <div className="page-heading">
                <span className="eyebrow">
                  {translate("app.platform.robotodavtsyam")}
                </span>
                <h1>
                  {translate(
                    "app.platform.znaydit_lyudey_dlya_svoyeyi_komandy",
                  )}
                </h1>
                <p>
                  {translate(
                    "app.platform.rozmishchuyte_vakansiyi_ta_otrymuyte_vidhuky_kandydativ_na_starti_bezkoshtovno",
                  )}
                </p>
              </div>
              <div className="profile-card">
                <h2>
                  {translate(
                    "app.platform.vid_vakansiyi_do_znayomstva_z_kandydatom",
                  )}
                </h2>
                <ol>
                  <li>
                    {translate(
                      "app.platform.zareyestruytesya_yak_robotodavets_i_zapovnit_informatsiyu_pro_kompaniyu",
                    )}
                  </li>
                  <li>
                    {translate(
                      "app.platform.stvorit_vakansiyu_ta_nadishlit_yiyi_na_perevirku",
                    )}
                  </li>
                  <li>
                    {translate(
                      "app.platform.perehlyadayte_vidhuky_ta_zv_yazuytesya_z_kandydatamy_u_svoyemu_kabineti",
                    )}
                  </li>
                </ol>
                <a className="primary" href="/employer?register=1">
                  {translate("employer.register")}
                </a>
                <p>
                  {translate("app.platform.vzhe_mayete_akaunt")}
                  <a href="/employer">{translate("auth.login")}</a>
                </p>
              </div>
            </section>
          )}
          {activeView === "employer" && !isEmployer && (
            <section className="dashboard">
              <div className="page-heading">
                <h1>{translate("app.platform.vkhid_dlya_robotodavtsiv")}</h1>
              </div>
              {isPlatformLoading ? (
                <p role="status">{translate("app.platform.zavantazhuyemo")}</p>
              ) : platformError ? (
                <p role="alert">{platformError}</p>
              ) : platformState.user ? (
                <div className="profile-card">
                  <p>
                    {translate(
                      "app.platform.kabinet_dostupnyy_lyshe_robotodavtsyam_vy_uviyshly_yak_shukach_roboty",
                    )}
                  </p>
                  <a href="/">
                    {translate("app.platform.do_poshuku_vakansiy")}
                  </a>
                </div>
              ) : (
                <div className="profile-card">
                  <AuthForm
                    defaultAccountType="employer"
                    initialMode={
                      typeof window !== "undefined" &&
                      new URLSearchParams(window.location.search).has(
                        "register",
                      )
                        ? "register"
                        : "login"
                    }
                    onSuccess={loadPlatformState}
                  />
                </div>
              )}
            </section>
          )}
          {"employer" === activeView && isEmployer && (
            <section className={"dashboard"}>
              <div className={"employer-heading"}>
                <div className={"page-heading"}>
                  <span className={"eyebrow"}>
                    {translate("app.platform.lyudy_z_yakymy_zrostaye_biznes")}
                  </span>
                  <h1>{translate("employer.dashboard.title")}</h1>
                  <p>
                    {translate(
                      "app.platform.vakansiyi_ta_vidhuky_v_odnomu_mistsi_publikatsiya_na_starti_bezkoshtovna",
                    )}
                  </p>
                </div>
                <button
                  className={"primary"}
                  onClick={() => openModal("publish")}
                >
                  <PlusIcon size={17} />
                  {translate("jobs.add")}
                </button>
              </div>
              <CompanyEditor onSaved={loadPlatformState} />
              <div className={"stat-grid"}>
                <div>
                  <span>{translate("app.platform.moyi_vakansiyi")}</span>
                  <strong>
                    {
                      platformState.myJobs.filter(
                        (job) =>
                          "active" === job.status &&
                          "approved" === job.moderationStatus &&
                          Date.parse(job.expiresAt) > Date.now(),
                      ).length
                    }
                  </strong>
                  <small>
                    {translate("app.platform.aktyvnykh_publikatsiy")}
                  </small>
                </div>
                <div>
                  <span>{translate("app.platform.vidhuky")}</span>
                  <strong>{platformState.incoming.length}</strong>
                  <small>
                    {translate("app.platform.otrymano_vid_kandydativ")}
                  </small>
                </div>
                <div>
                  <span>{translate("app.platform.novi_kandydaty")}</span>
                  <strong>
                    {
                      platformState.incoming.filter(
                        (incoming) => "new" === incoming.application.status,
                      ).length
                    }
                  </strong>
                  <small>
                    {translate("app.platform.ochikuyut_tvoho_perehlyadu")}
                  </small>
                </div>
              </div>
              <h2 className={"section-title"}>
                {translate("app.platform.moyi_vakansiyi")}
              </h2>
              {platformState.myJobs.length ? (
                platformState.myJobs.map((job) => (
                  <div className={"dashboard-card"} key={job.id}>
                    <div>
                      <small>
                        {job.company}
                        {" \xb7 "}
                        {job.city}
                      </small>
                      <h3>{job.title}</h3>
                      {"pending" === job.moderationStatus && (
                        <p className="inline-note">
                          {translate(
                            "app.platform.ochikuye_perevirky_moderatorom_u_poshuku_shche_ne_vidobrazhayetsya",
                          )}
                        </p>
                      )}
                      {"blocked" === job.moderationStatus && (
                        <p className={"form-error"}>
                          {translate("app.platform.prykhovano_moderatorom_2")}
                          {job.moderationReason}
                        </p>
                      )}
                      <p>
                        <Salary job={job} />
                        {" \xb7 "}
                        {"active" === job.status &&
                        Date.parse(job.expiresAt) > Date.now()
                          ? translate("app.platform.do") +
                            formatDate(job.expiresAt)
                          : translate("app.platform.zakryta_strok_mynuv")}
                      </p>
                    </div>
                    <button
                      className={"outline small"}
                      onClick={() => setSelectedJob(job)}
                    >
                      {translate("app.platform.perehlyanuty")}
                    </button>
                    <button
                      className={"outline small"}
                      onClick={() => {
                        {
                          if (requireAuthentication()) {
                            setEditingJobId(job.id);
                            setJobForm({
                              title: job.title,
                              company: job.company,
                              occupation: job.occupation,
                              category: job.category,
                              city: job.city,
                              arrangement: job.arrangement,
                              schedule: job.schedule,
                              salaryMin: job.salaryMin,
                              salaryMax: job.salaryMax,
                              experience: job.experience,
                              description: job.description,
                              requirements: job.requirements,
                              benefits: job.benefits,
                            });
                            setFormStep(0);
                            setFormError("");
                            setFormConfirmed(false);
                            setActiveModal("publish");
                          }
                        }
                      }}
                    >
                      {translate("app.platform.redahuvaty")}
                    </button>
                    <button
                      className={"outline small"}
                      disabled={isSaving || "blocked" === job.moderationStatus}
                      onClick={() =>
                        savePlatformAction({
                          action: "jobStatus",
                          jobId: job.id,
                          status:
                            "active" === job.status &&
                            Date.parse(job.expiresAt) > Date.now()
                              ? "closed"
                              : "active",
                        })
                      }
                    >
                      {"active" === job.status &&
                      Date.parse(job.expiresAt) > Date.now()
                        ? translate("app.platform.zakryty")
                        : translate("app.platform.opublikuvaty_znovu")}
                    </button>
                  </div>
                ))
              ) : (
                <div className={"empty-state compact"}>
                  <Building2Icon size={30} />
                  <h3>
                    {translate(
                      "app.platform.persha_vakansiya_pochatok_komandy",
                    )}
                  </h3>
                  <p>
                    {translate(
                      "app.platform.vkazhy_profesiyu_umovy_ta_zavdannya_publikatsiya_diyatyme_30_dniv",
                    )}
                  </p>
                  <button
                    className={"primary"}
                    onClick={() => openModal("publish")}
                  >
                    {translate("app.platform.stvoryty_vakansiyu")}
                  </button>
                </div>
              )}
              <h2 className={"section-title"}>
                {translate("app.platform.vidhuky_kandydativ")}
              </h2>
              {platformState.incoming.length ? (
                platformState.incoming.map(({ application, job }) => {
                  const candidateProfile = JSON.parse(
                    application.profileSnapshot,
                  );
                  return (
                    <div className={"incoming-card"} key={application.id}>
                      <div className={"incoming-top"}>
                        <div>
                          <small>{job.title}</small>
                          <h3>{candidateProfile.name}</h3>
                          <p>
                            {candidateProfile.occupation}
                            {" \xb7 "}
                            {candidateProfile.city}
                            {" \xb7 "}
                            {candidateProfile.experience}
                          </p>
                        </div>
                        <span className={"status status-" + application.status}>
                          {applicationStatusLabels[application.status]}
                        </span>
                      </div>
                      <p className={"preline"}>{candidateProfile.skills}</p>
                      {candidateProfile.about && (
                        <p className={"preline"}>{candidateProfile.about}</p>
                      )}
                      <ResumeHistory
                        workHistory={candidateProfile.workHistory}
                        education={candidateProfile.education}
                      />
                      {Object.entries(
                        JSON.parse(candidateProfile.specialties || "{}"),
                      )
                        .filter(([, specialtyValue]) => specialtyValue)
                        .map(([specialtyName, historyLabel]) => (
                          <div
                            className={"candidate-specialty"}
                            key={specialtyName}
                          >
                            <b>{specialtyName}</b>
                            <p>{historyLabel}</p>
                          </div>
                        ))}
                      {application.message && (
                        <blockquote>{application.message}</blockquote>
                      )}
                      <div className={"candidate-contacts"}>
                        <a
                          href={
                            "tel:" +
                            candidateProfile.phone.replace(/[^+\d]/g, "")
                          }
                        >
                          {candidateProfile.phone}
                        </a>
                        <a href={"mailto:" + candidateProfile.email}>
                          {candidateProfile.email}
                        </a>
                      </div>
                      <div className={"button-row"}>
                        {[
                          ["viewed", translate("app.platform.perehlyanuto")],
                          ["invited", translate("app.platform.zaprosyty")],
                          ["rejected", translate("app.platform.vidmovyty")],
                        ].map(([historyLabel, historyValue]) => (
                          <button
                            disabled={
                              isSaving || application.status === historyLabel
                            }
                            className={
                              "invited" === historyLabel
                                ? "primary small"
                                : "outline small"
                            }
                            onClick={() =>
                              savePlatformAction({
                                action: "applicationStatus",
                                id: application.id,
                                status: historyLabel,
                              })
                            }
                            key={historyLabel}
                          >
                            {historyValue}
                          </button>
                        ))}
                      </div>
                      <small className={"muted"}>
                        {translate(
                          "app.platform.status_vydno_kandydatu_v_kabineti_chas_spivbesidy_uzhodte_za_kontaktamy",
                        )}
                      </small>
                    </div>
                  );
                })
              ) : (
                <p className={"muted"}>
                  {translate(
                    "app.platform.vidhuky_na_tvoyi_vakansiyi_z_yavlyatsya_tut",
                  )}
                </p>
              )}
            </section>
          )}
          <footer>
            <a className={"footer-brand"} href={"/"}>
              {translate("brand.logo")}
            </a>
            <span>
              {translate("app.platform.tvoya_robota_tvoyi_pravyla_ukrayina")}
            </span>
            <button onClick={() => openModal("about")}>
              {translate("app.platform.pro_platformu_2")}
            </button>
            {platformState.user && (
              <button
                onClick={async () => {
                  await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      action: "logout",
                    }),
                  });
                  location.reload();
                }}
              >
                <LogOutIcon size={14} />
                {translate("app.platform.vyyty")}
              </button>
            )}
            <span className={"footer-country"}>
              <span className={"ua-flag"} />
              {translate("app.platform.ukrayina")}
            </span>
          </footer>
        </main>
      </div>
      {"moderation" === activeView && platformState.user?.isAdmin && (
        <ModerationPanel />
      )}
      <datalist id={"occupation-search"}>
        {occupations.map((occupation) => (
          <option value={occupation.name} key={occupation.name} />
        ))}
      </datalist>
      <datalist id={"cities"}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {catalogLabel(city)}
          </option>
        ))}
      </datalist>
      {comparisonJobIds.length > 0 && (
        <div className={"compare-tray"}>
          <GitCompareArrowsIcon size={18} />
          <span>
            {translate("app.platform.dlya_porivnyannya")}
            <b>
              {comparisonJobIds.length}
              {"/3"}
            </b>
          </span>
          <button
            className={"primary small"}
            onClick={() => setComparisonOpen(true)}
          >
            {translate("app.platform.porivnyaty")}
            <ArrowRightIcon size={14} />
          </button>
          <button
            className={"icon-btn"}
            aria-label={translate("app.platform.ochystyty_porivnyannya")}
            onClick={() => setComparisonJobIds([])}
          >
            <XIcon size={17} />
          </button>
        </div>
      )}
      {toastMessage && (
        <div className={"toast"} role={"status"}>
          <CircleCheckIcon size={18} />
          {toastMessage}
          <button
            aria-label={translate("app.platform.zakryty_povidomlennya")}
            onClick={() => setToastMessage("")}
          >
            <XIcon size={15} />
          </button>
        </div>
      )}
      {selectedJob && (
        <div className={"overlay"} onClick={() => setSelectedJob(null)}>
          <section
            className={"detail-panel"}
            role={"dialog"}
            aria-modal={"true"}
            aria-labelledby={"job-detail-title"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={"detail-toolbar"}>
              <span>{translate("app.platform.detali_vakansiyi")}</span>
              <button
                className={"icon-btn"}
                onClick={() => setSelectedJob(null)}
                aria-label={translate("app.platform.zakryty_vakansiyu")}
              >
                <XIcon />
              </button>
            </div>
            <div className={"detail-content"}>
              <div className={"company-line"}>
                <span className={"company-logo"}>{selectedJob.company[0]}</span>
                <div>
                  <b>{selectedJob.company}</b>
                  <small>
                    {selectedJob.demo
                      ? translate("app.platform.vyhadanyy_pryklad")
                      : translate(
                          "app.platform.pryama_publikatsiya_robotodavtsya",
                        )}
                  </small>
                </div>
              </div>
              <h2 id={"job-detail-title"}>{selectedJob.title}</h2>
              <div className={"detail-salary"}>
                <Salary job={selectedJob} />
                <small>{translate("app.platform.misyats_2")}</small>
              </div>
              <div className={"detail-facts"}>
                <span>
                  <MapPinIcon size={17} />
                  {selectedJob.city}
                </span>
                <span>
                  <GlobeIcon size={17} />
                  {selectedJob.arrangement}
                </span>
                <span>
                  <ClockIcon size={17} />
                  {selectedJob.schedule}
                </span>
                <span>
                  {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                    size: 17,
                  })}
                  {selectedJob.experience}
                </span>
              </div>
              {selectedJob.demo && (
                <div className={"inline-note"}>
                  {translate(
                    "app.platform.tse_demonstratsiyna_vakansiya_kompaniya_ta_umovy_vyhadani_vidhuk_nedostupnyy",
                  )}
                </div>
              )}
              <h3>{translate("jobs.about")}</h3>
              <p className={"preline"}>{selectedJob.description}</p>
              <h3>{translate("app.platform.shcho_ochikuyemo")}</h3>
              <p className={"preline"}>{selectedJob.requirements}</p>
              {selectedJob.benefits && (
                <jsxRuntime.Fragment>
                  <h3>{translate("jobs.benefits")}</h3>
                  <p className={"preline"}>{selectedJob.benefits}</p>
                </jsxRuntime.Fragment>
              )}
              <p className={"muted"}>
                {selectedJob.demo
                  ? translate(
                      "app.platform.pryklad_dlya_testuvannya_interfeysu",
                    )
                  : translate("app.jobs.id.page.opublikovano") +
                    formatDate(selectedJob.createdAt) +
                    translate("app.platform.diye_do") +
                    formatDate(selectedJob.expiresAt)}
              </p>
              <button
                className={"report-link"}
                onClick={() => openModal("report")}
              >
                <FlagIcon size={14} />
                {translate("app.platform.povidomyty_pro_problemu")}
              </button>
            </div>
            <div className={"detail-actions"}>
              {!selectedJob.demo && (
                <a
                  className={"outline"}
                  href={"/jobs/" + selectedJob.id}
                  aria-label={translate(
                    "app.platform.okrema_storinka_vakansiyi",
                  )}
                >
                  <ExternalLinkIcon size={17} />
                </a>
              )}
              <button
                className={"primary"}
                disabled={
                  selectedJob.demo ||
                  isSaving ||
                  selectedJob.moderationStatus !== "approved" ||
                  "active" !== selectedJob.status ||
                  Date.parse(selectedJob.expiresAt) <= Date.now() ||
                  platformState.myJobs.some(
                    (myJob) => myJob.id === selectedJob.id,
                  ) ||
                  platformState.applications.some(
                    (application) => application.job.id === selectedJob.id,
                  )
                }
                onClick={() => {
                  {
                    if (platformState.profile) {
                      openModal("apply");
                    } else {
                      if (requireAuthentication()) {
                        openModal("profile");
                        setPendingApplicationJob(selectedJob);
                        setToastMessage(
                          translate(
                            "app.platform.zapovny_rezyume_potim_povernemosya_do_tsoho_vidhuku",
                          ),
                        );
                      }
                    }
                  }
                }}
              >
                {selectedJob.demo
                  ? translate("app.platform.demonstratsiyna_vakansiya")
                  : platformState.myJobs.some(
                        (myJob) => myJob.id === selectedJob.id,
                      )
                    ? translate("app.platform.tvoya_vakansiya")
                    : platformState.applications.some(
                          (application) =>
                            application.job.id === selectedJob.id,
                        )
                      ? translate("app.platform.vidhuk_nadislano")
                      : "active" !== selectedJob.status ||
                          Date.parse(selectedJob.expiresAt) <= Date.now()
                        ? translate("app.platform.vakansiya_zakryta")
                        : translate("jobs.apply")}
                <ArrowRightIcon size={17} />
              </button>
              <button
                className={"outline"}
                onClick={() => toggleFavorite(selectedJob)}
              >
                {(0, jsxRuntime.jsx)(BookmarkIcon, {
                  size: 18,
                })}
                {platformState.favorites.includes(selectedJob.id)
                  ? translate("app.platform.zberezheno")
                  : translate("common.save")}
              </button>
            </div>
          </section>
        </div>
      )}
      {isComparisonOpen && (
        <div
          className={"overlay center"}
          onClick={() => setComparisonOpen(false)}
        >
          <section
            className={"modal compare-modal"}
            role={"dialog"}
            aria-modal={"true"}
            aria-labelledby={"compare-title"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={"modal-header"}>
              <h2 id={"compare-title"}>
                {translate("app.platform.porivnyay_umovy")}
              </h2>
              <button
                className={"icon-btn"}
                aria-label={translate("app.platform.zakryty_porivnyannya")}
                onClick={() => setComparisonOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className={"comparison-scroll"}>
              <table>
                <thead>
                  <tr>
                    <th>{translate("app.platform.umovy")}</th>
                    {Array.from(jobCacheRef.current.values())
                      .filter((cachedJob) =>
                        comparisonJobIds.includes(cachedJob.id),
                      )
                      .map((comparedJob) => (
                        <th key={comparedJob.id}>
                          {comparedJob.title}
                          <small>{comparedJob.company}</small>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    translate("app.platform.zarplata"),
                    translate("fields.city"),
                    translate("app.platform.format"),
                    translate("app.platform.zaynyatist"),
                    translate("app.platform.dosvid"),
                  ].map((comparisonLabel, index) => (
                    <tr key={comparisonLabel}>
                      <td>{comparisonLabel}</td>
                      {Array.from(jobCacheRef.current.values())
                        .filter((cachedJob) =>
                          comparisonJobIds.includes(cachedJob.id),
                        )
                        .map((comparedJob) => (
                          <td key={comparedJob.id}>
                            {0 === index ? (
                              <Salary job={comparedJob} />
                            ) : 1 === index ? (
                              comparedJob.city
                            ) : 2 === index ? (
                              comparedJob.arrangement
                            ) : 3 === index ? (
                              comparedJob.schedule
                            ) : (
                              comparedJob.experience
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
      {activeModal && (
        <div
          className={"overlay center"}
          onClick={() => !isSaving && setActiveModal(null)}
        >
          <section
            className={"modal"}
            role={"dialog"}
            aria-modal={"true"}
            aria-labelledby={"modal-title"}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={"modal-header"}>
              <div>
                <span className={"eyebrow"}>
                  {"profile" === activeModal
                    ? translate("app.platform.tvoya_profesiyna_istoriya")
                    : "publish" === activeModal
                      ? translate("app.platform.znaydy_svoyikh_lyudey")
                      : translate("app.platform.pratsya_2")}
                </span>
                <h2 id={"modal-title"}>
                  {
                    {
                      profile: pendingApplicationJob
                        ? translate("app.platform.rezyume_dlya_vidhuku")
                        : platformState.profile
                          ? translate("app.platform.redahuvaty_rezyume")
                          : translate("app.platform.stvoryty_rezyume_2"),
                      publish: editingJobId
                        ? translate("app.platform.redahuvaty_vakansiyu")
                        : translate("app.platform.nova_vakansiya"),
                      apply: translate("app.platform.vidhuk_na_vakansiyu"),
                      report: translate("app.platform.povidomyty_pro_problemu"),
                      auth: translate("app.platform.tviy_kabinet"),
                      about: translate(
                        "app.platform.robota_pochynayetsya_z_lyudey",
                      ),
                    }[activeModal]
                  }
                </h2>
              </div>
              <button
                className={"icon-btn"}
                aria-label={translate("app.platform.zakryty_vikno")}
                onClick={() => setActiveModal(null)}
                disabled={isSaving}
              >
                <XIcon />
              </button>
            </div>
            {("profile" === activeModal || "publish" === activeModal) && (
              <div className={"steps"}>
                {("profile" === activeModal
                  ? [
                      translate("app.platform.kontakty"),
                      translate("app.platform.profesiya"),
                      translate("app.platform.dosvid"),
                    ]
                  : [
                      translate("app.platform.osnovne"),
                      translate("app.platform.umovy"),
                      translate("app.platform.zavdannya"),
                      translate("app.platform.perevirka"),
                    ]
                ).map((stepLabel, stepIndex) => (
                  <span
                    className={stepIndex <= formStep ? "current" : ""}
                    key={stepLabel}
                  >
                    <i>
                      {stepIndex < formStep ? (
                        <CheckIcon size={12} />
                      ) : (
                        stepIndex + 1
                      )}
                    </i>
                    {stepLabel}
                  </span>
                ))}
              </div>
            )}
            {"profile" === activeModal && (
              <form onSubmit={submitProfile}>
                <div className={"form-body"}>
                  {0 === formStep && (
                    <jsxRuntime.Fragment>
                      <p className={"form-intro"}>
                        {translate(
                          "app.platform.yak_tebe_zvaty_ta_de_ty_shukayesh_robotu",
                        )}
                      </p>
                      <label className={"field"}>
                        {translate("app.platform.im_ya_ta_prizvyshche")}
                        <input
                          required={true}
                          minLength={2}
                          maxLength={100}
                          value={profileForm.name}
                          onChange={(event) =>
                            setProfileForm({
                              ...profileForm,
                              name: event.target.value,
                            })
                          }
                          autoComplete={"name"}
                          placeholder={translate("app.platform.olena_koval")}
                        />
                      </label>
                      <div className={"form-grid"}>
                        <label className={"field"}>
                          {translate("app.platform.telefon")}
                          <input
                            required={true}
                            type={"tel"}
                            minLength={7}
                            maxLength={30}
                            pattern={"[+0-9 ()\\-]+"}
                            value={profileForm.phone}
                            onChange={(event) =>
                              setProfileForm({
                                ...profileForm,
                                phone: event.target.value,
                              })
                            }
                            autoComplete={"tel"}
                            placeholder={"+380"}
                          />
                        </label>
                        <label className={"field"}>
                          {translate("app.platform.misto_abo_dystantsiyno")}
                          <input
                            required={true}
                            list={"cities"}
                            minLength={2}
                            maxLength={100}
                            value={profileForm.city}
                            onChange={(event) =>
                              setProfileForm({
                                ...profileForm,
                                city: event.target.value,
                              })
                            }
                            placeholder={translate(
                              "app.platform.obery_abo_vvedy_svoye",
                            )}
                          />
                        </label>
                      </div>
                      <div className={"inline-note"}>
                        <ShieldCheckIcon size={17} />
                        {translate(
                          "app.platform.anketa_ne_publikuyetsya_u_vidkrytiy_bazi_robotodavets_otrymuye_yiyi_pislya_tvoho_vidh",
                        )}
                      </div>
                    </jsxRuntime.Fragment>
                  )}
                  {1 === formStep && (
                    <jsxRuntime.Fragment>
                      <p className={"form-intro"}>
                        {translate(
                          "app.platform.obery_profesiyu_pidkazhemo_shcho_vazhlyvo_vkazaty",
                        )}
                      </p>
                      <label className={"field"}>
                        {translate("app.platform.kym_khochesh_pratsyuvaty")}
                        <input
                          required={true}
                          list={"occupation-search"}
                          minLength={2}
                          maxLength={100}
                          value={profileForm.occupation}
                          onChange={(event) =>
                            setProfileForm({
                              ...profileForm,
                              occupation: event.target.value,
                              specialties: {},
                            })
                          }
                          placeholder={translate(
                            "app.platform.pochny_vvodyty_profesiyu",
                          )}
                        />
                        <button
                          type={"button"}
                          className={"occupation-field-button"}
                          onClick={() => setOccupationPickerTarget("profile")}
                        >
                          {translate("app.platform.obraty_z_katalohu")}
                          {occupations.length}
                          {translate("app.platform.profesiyi")}
                        </button>
                      </label>
                      <div className={"form-grid"}>
                        <label className={"field"}>
                          {translate("app.platform.dosvid")}
                          <select
                            value={catalogLabel(profileForm.experience)}
                            onChange={(event) =>
                              setProfileForm({
                                ...profileForm,
                                experience: event.target.value,
                              })
                            }
                          >
                            {experienceLevels.map((experienceLevel) => (
                              <option
                                key={experienceLevel}
                                value={experienceLevel}
                              >
                                {catalogLabel(experienceLevel)}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className={"field"}>
                          {translate("app.platform.bazhana_zarplata_misyats")}
                          <input
                            type={"number"}
                            min={0}
                            max={1e7}
                            value={profileForm.salary || ""}
                            onChange={(event) =>
                              setProfileForm({
                                ...profileForm,
                                salary: Number(event.target.value),
                              })
                            }
                            placeholder={translate("salary.negotiable")}
                          />
                        </label>
                      </div>
                      <label className={"field"}>
                        {translate("app.platform.zaynyatist")}
                        <select
                          value={catalogLabel(profileForm.schedule)}
                          onChange={(event) =>
                            setProfileForm({
                              ...profileForm,
                              schedule: event.target.value,
                            })
                          }
                        >
                          {schedules.map((schedule) => (
                            <option key={schedule} value={schedule}>
                              {catalogLabel(schedule)}
                            </option>
                          ))}
                        </select>
                      </label>
                    </jsxRuntime.Fragment>
                  )}
                  {2 === formStep && (
                    <jsxRuntime.Fragment>
                      <label className={"field"}>
                        {translate("app.platform.tvoyi_navychky")}
                        <textarea
                          required={true}
                          minLength={2}
                          maxLength={2e3}
                          rows={3}
                          value={profileForm.skills}
                          onChange={(event) =>
                            setProfileForm({
                              ...profileForm,
                              skills: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.shcho_ty_vmiyesh_i_z_yakymy_instrumentamy_pratsyuyesh",
                          )}
                        />
                      </label>
                      {((selectedOccupationName = profileForm.occupation),
                      /водій/i.test(selectedOccupationName)
                        ? [
                            catalogValue(
                              "app.platform.katehoriyi_posvidchennya",
                            ),
                            catalogValue("app.platform.vlasnyy_avtomobil"),
                          ]
                        : /адвокат/i.test(selectedOccupationName)
                          ? [
                              catalogValue(
                                "app.platform.nomer_svidotstva_za_bazhannyam",
                              ),
                              catalogValue("app.platform.praktyky"),
                            ]
                          : /юрист/i.test(selectedOccupationName)
                            ? [
                                catalogValue("app.platform.haluzi_prava"),
                                catalogValue(
                                  "app.platform.dosvid_predstavnytstva",
                                ),
                              ]
                            : /йог|тренер/i.test(selectedOccupationName)
                              ? [
                                  catalogValue("app.platform.napryamy_zanyat"),
                                  catalogValue("app.platform.sertyfikatsiya"),
                                ]
                              : /бухгалтер/i.test(selectedOccupationName)
                                ? [
                                    catalogValue(
                                      "app.platform.oblikovi_prohramy",
                                    ),
                                    catalogValue(
                                      "app.platform.dilyanky_obliku",
                                    ),
                                  ]
                                : /SMM|маркет/i.test(selectedOccupationName)
                                  ? [
                                      catalogValue(
                                        "app.platform.sotsialni_merezhi_instrumenty",
                                      ),
                                      catalogValue(
                                        "app.platform.posylannya_na_portfolio",
                                      ),
                                    ]
                                  : [
                                      catalogValue(
                                        "app.platform.klyuchovi_instrumenty_navychky",
                                      ),
                                      catalogValue(
                                        "app.platform.posylannya_na_portfolio_za_bazhannyam",
                                      ),
                                    ]).map((specialtyName) => (
                        <label className={"field"} key={specialtyName}>
                          {catalogLabel(specialtyName)}
                          <input
                            maxLength={1e3}
                            value={profileForm.specialties[specialtyName] || ""}
                            onChange={(event) =>
                              setProfileForm({
                                ...profileForm,
                                specialties: {
                                  ...profileForm.specialties,
                                  [specialtyName]: event.target.value,
                                },
                              })
                            }
                          />
                        </label>
                      ))}
                      <ResumeBuilder
                        profile={profileForm}
                        setProfile={setProfileForm}
                      />
                      <label className={"field"}>
                        {translate("app.platform.pro_sebe")}
                        <small>{translate("app.platform.za_bazhannyam")}</small>
                        <textarea
                          maxLength={5e3}
                          rows={3}
                          value={profileForm.about}
                          onChange={(event) =>
                            setProfileForm({
                              ...profileForm,
                              about: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.poperednya_robota_navchannya_dosyahnennya",
                          )}
                        />
                      </label>
                      <label className={"check-label consent"}>
                        <input
                          type={"checkbox"}
                          checked={isFormConfirmed}
                          onChange={(event) =>
                            setFormConfirmed(event.target.checked)
                          }
                          required={true}
                        />
                        {translate(
                          "app.platform.pohodzhuyus_na_zberezhennya_ankety_ta_yiyi_peredavannya_robotodavtsyam_yakym_samostiy",
                        )}
                      </label>
                    </jsxRuntime.Fragment>
                  )}
                  {formError && (
                    <p className={"form-error"} role={"alert"}>
                      {formError}
                    </p>
                  )}
                </div>
                <div className={"form-footer"}>
                  {formStep > 0 ? (
                    <button
                      className={"outline"}
                      type={"button"}
                      onClick={() => {
                        setFormStep(formStep - 1);
                        setFormError("");
                      }}
                    >
                      <ArrowLeftIcon size={16} />
                      {translate("app.platform.nazad")}
                    </button>
                  ) : (
                    <span className={"muted"}>
                      {translate("app.platform.krok")}
                      {formStep + 1}
                      {translate("app.platform.iz_3")}
                    </span>
                  )}
                  <button className={"primary"} disabled={isSaving}>
                    {isSaving ? (
                      <LoaderCircleIcon size={17} className={"spin"} />
                    ) : 2 === formStep ? (
                      translate("app.platform.zberehty_rezyume")
                    ) : (
                      translate("app.platform.dali")
                    )}
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </form>
            )}
            {"publish" === activeModal && (
              <form onSubmit={submitJob}>
                <div className={"form-body"}>
                  {0 === formStep && (
                    <jsxRuntime.Fragment>
                      <p className={"form-intro"}>
                        {translate(
                          "app.platform.rozmishchennya_bezkoshtovne_vakansiya_aktyvna_30_dniv",
                        )}
                      </p>
                      <label className={"field"}>
                        {translate("company.name")}
                        <input
                          required={true}
                          minLength={2}
                          maxLength={100}
                          value={jobForm.company}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              company: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.kompaniya_abo_fop",
                          )}
                        />
                      </label>
                      <label className={"field"}>
                        {translate("app.platform.profesiya")}
                        <input
                          required={true}
                          list={"occupation-search"}
                          minLength={2}
                          maxLength={100}
                          value={jobForm.occupation}
                          onChange={(event) => {
                            const matchedOccupation = occupations.find(
                              (occupation) =>
                                occupation.name === event.target.value,
                            );
                            setJobForm({
                              ...jobForm,
                              occupation: event.target.value,
                              title:
                                jobForm.title &&
                                jobForm.title !== jobForm.occupation
                                  ? jobForm.title
                                  : event.target.value,
                              category:
                                matchedOccupation?.category || jobForm.category,
                            });
                          }}
                          placeholder={translate(
                            "app.platform.obery_zi_spysku_abo_vvedy_svoyu",
                          )}
                        />
                        <button
                          type={"button"}
                          className={"occupation-field-button"}
                          onClick={() => setOccupationPickerTarget("job")}
                        >
                          {translate("app.platform.obraty_z_katalohu")}
                          {occupations.length}
                          {translate("app.platform.profesiyi")}
                        </button>
                      </label>
                      <label className={"field"}>
                        {translate("app.platform.nazva_vakansiyi")}
                        <input
                          required={true}
                          minLength={3}
                          maxLength={120}
                          value={jobForm.title}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              title: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.napryklad_yuryst_iz_dohovirnoyi_roboty",
                          )}
                        />
                      </label>
                      <label className={"field"}>
                        {translate("app.platform.sfera")}
                        <select
                          value={jobForm.category}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              category: event.target.value,
                            })
                          }
                        >
                          {jobCategories
                            .filter((category) => "all" !== category.id)
                            .map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </label>
                    </jsxRuntime.Fragment>
                  )}
                  {1 === formStep && (
                    <jsxRuntime.Fragment>
                      <div className={"form-grid"}>
                        <label className={"field"}>
                          {translate("fields.city")}
                          <input
                            required={true}
                            minLength={2}
                            maxLength={100}
                            list={"cities"}
                            value={jobForm.city}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                city: event.target.value,
                              })
                            }
                            placeholder={translate(
                              "app.platform.obery_abo_vvedy_svoye",
                            )}
                          />
                        </label>
                        <label className={"field"}>
                          {translate("app.platform.format_roboty")}
                          <select
                            value={jobForm.arrangement}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                arrangement: event.target.value,
                              })
                            }
                          >
                            {[
                              translate("catalog.onsite"),
                              translate("catalog.hybrid"),
                              translate("catalog.remote"),
                            ].map((arrangement) => (
                              <option key={arrangement} value={arrangement}>
                                {catalogLabel(arrangement)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className={"form-grid"}>
                        <label className={"field"}>
                          {translate("app.platform.zarplata_vid_misyats")}
                          <input
                            required={true}
                            type={"number"}
                            min={0}
                            max={1e7}
                            value={jobForm.salaryMin}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                salaryMin: Number(event.target.value),
                              })
                            }
                          />
                        </label>
                        <label className={"field"}>
                          {translate("app.platform.zarplata_do_misyats")}
                          <input
                            required={true}
                            type={"number"}
                            min={jobForm.salaryMin}
                            max={1e7}
                            value={jobForm.salaryMax}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                salaryMax: Number(event.target.value),
                              })
                            }
                          />
                        </label>
                      </div>
                      <small className={"muted"}>
                        {translate(
                          "app.platform.vkazhy_0_v_obokh_polyakh_yakshcho_zarplata_za_domovlenistyu_u_zavdannyakh_utochny_sta",
                        )}
                      </small>
                      <div className={"form-grid"}>
                        <label className={"field"}>
                          {translate("app.platform.zaynyatist")}
                          <select
                            value={jobForm.schedule}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                schedule: event.target.value,
                              })
                            }
                          >
                            {schedules.map((schedule) => (
                              <option key={schedule} value={schedule}>
                                {catalogLabel(schedule)}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className={"field"}>
                          {translate("app.platform.neobkhidnyy_dosvid")}
                          <select
                            value={jobForm.experience}
                            onChange={(event) =>
                              setJobForm({
                                ...jobForm,
                                experience: event.target.value,
                              })
                            }
                          >
                            {experienceLevels.map((experienceLevel) => (
                              <option
                                key={experienceLevel}
                                value={experienceLevel}
                              >
                                {catalogLabel(experienceLevel)}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </jsxRuntime.Fragment>
                  )}
                  {2 === formStep && (
                    <jsxRuntime.Fragment>
                      <label className={"field"}>
                        {translate("app.platform.pro_robotu_ta_zavdannya")}
                        <textarea
                          required={true}
                          minLength={40}
                          maxLength={1e4}
                          rows={4}
                          value={jobForm.description}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              description: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.chym_zaymatymetsya_lyudyna_de_pratsyuvatyme_ta_yaki_umovy_oplaty_vid_40_symvoliv",
                          )}
                        />
                      </label>
                      <label className={"field"}>
                        {translate("app.platform.vymohy_do_kandydata")}
                        <textarea
                          required={true}
                          minLength={10}
                          maxLength={5e3}
                          rows={3}
                          value={jobForm.requirements}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              requirements: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.potribni_navychky_ta_dosvid",
                          )}
                        />
                      </label>
                      <label className={"field"}>
                        {translate("app.platform.dodatkovi_perevahy")}
                        <textarea
                          rows={2}
                          maxLength={3e3}
                          value={jobForm.benefits}
                          onChange={(event) =>
                            setJobForm({
                              ...jobForm,
                              benefits: event.target.value,
                            })
                          }
                          placeholder={translate(
                            "app.platform.navchannya_obladnannya_hnuchkyy_hrafik",
                          )}
                        />
                      </label>
                    </jsxRuntime.Fragment>
                  )}
                  {3 === formStep && (
                    <jsxRuntime.Fragment>
                      <p className={"form-intro"}>
                        {translate(
                          "app.platform.os_yak_kandydaty_pobachat_tvoyu_vakansiyu_perevir_umovy_pered_publikatsiyeyu",
                        )}
                      </p>
                      <article className={"vacancy-review"}>
                        <small>{jobForm.company}</small>
                        <h3>{jobForm.title}</h3>
                        <div className={"job-salary"}>
                          <Salary job={jobForm} />
                        </div>
                        <div className={"job-tags"}>
                          <span>{jobForm.city}</span>
                          <span>{jobForm.arrangement}</span>
                          <span>{jobForm.schedule}</span>
                          <span>{jobForm.experience}</span>
                        </div>
                        <h4>{translate("jobs.about")}</h4>
                        <p className={"preline"}>{jobForm.description}</p>
                        <h4>{translate("jobs.requirements")}</h4>
                        <p className={"preline"}>{jobForm.requirements}</p>
                        {jobForm.benefits && (
                          <jsxRuntime.Fragment>
                            <h4>{translate("app.platform.perevahy")}</h4>
                            <p className={"preline"}>{jobForm.benefits}</p>
                          </jsxRuntime.Fragment>
                        )}
                      </article>
                      <label className={"check-label consent"}>
                        <input
                          required={true}
                          type={"checkbox"}
                          checked={isFormConfirmed}
                          onChange={(event) =>
                            setFormConfirmed(event.target.checked)
                          }
                        />
                        {translate(
                          "app.platform.ya_mayu_pravo_rozmishchuvaty_tsyu_vakansiyu_pidtverdzhuyu_yiyi_aktualnist_i_hotovyy_o",
                        )}
                      </label>
                    </jsxRuntime.Fragment>
                  )}
                  {formError && (
                    <p className={"form-error"} role={"alert"}>
                      {formError}
                    </p>
                  )}
                </div>
                <div className={"form-footer"}>
                  {formStep > 0 ? (
                    <button
                      type={"button"}
                      className={"outline"}
                      onClick={() => {
                        setFormStep(formStep - 1);
                        setFormError("");
                      }}
                    >
                      <ArrowLeftIcon size={16} />
                      {translate("app.platform.nazad")}
                    </button>
                  ) : (
                    <span className={"muted"}>
                      {translate("app.platform.krok_1_iz_4")}
                    </span>
                  )}
                  <button className={"primary"} disabled={isSaving}>
                    {isSaving ? (
                      <LoaderCircleIcon size={17} className={"spin"} />
                    ) : 3 === formStep ? (
                      editingJobId ? (
                        translate("app.platform.zberehty_zminy")
                      ) : (
                        translate("app.platform.nadislaty_na_perevirku")
                      )
                    ) : 2 === formStep ? (
                      translate("app.platform.perehlyanuty_vakansiyu")
                    ) : (
                      translate("app.platform.dali")
                    )}
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </form>
            )}
            {"apply" === activeModal && (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  {
                    if (
                      isFormConfirmed &&
                      (await savePlatformAction({
                        action: "apply",
                        jobId: selectedJob?.id,
                        message: applicationMessage,
                      }))
                    ) {
                      setActiveModal(null);
                      setToastMessage(
                        translate(
                          "app.platform.vidhuk_dostavleno_do_kabinetu_robotodavtsya",
                        ),
                      );
                    }
                  }
                }}
              >
                <div className={"form-body"}>
                  <h3>{selectedJob?.title}</h3>
                  <p className={"muted"}>{selectedJob?.company}</p>
                  <div className={"inline-note"}>
                    {translate(
                      "app.platform.bude_nadislano_tvoyu_zberezhenu_anketu",
                    )}
                    {profileForm.name}
                    {", "}
                    {profileForm.phone}
                    {"."}
                  </div>
                  <label className={"field"}>
                    {translate("app.platform.kilka_sliv_robotodavtsyu")}
                    <small>{translate("app.platform.za_bazhannyam")}</small>
                    <textarea
                      maxLength={2e3}
                      rows={4}
                      value={applicationMessage}
                      onChange={(event) =>
                        setApplicationMessage(event.target.value)
                      }
                      placeholder={translate(
                        "app.platform.chomu_tebe_zatsikavyla_tsya_robota",
                      )}
                    />
                  </label>
                  <label className={"check-label consent"}>
                    <input
                      type={"checkbox"}
                      required={true}
                      checked={isFormConfirmed}
                      onChange={(event) =>
                        setFormConfirmed(event.target.checked)
                      }
                    />
                    {translate(
                      "app.platform.peredaty_anketu_ta_kontakty_robotodavtsyu_tsiyeyi_vakansiyi",
                    )}
                  </label>
                  {formError && <p className={"form-error"}>{formError}</p>}
                </div>
                <div className={"form-footer"}>
                  <span className={"muted"}>
                    {translate("app.platform.anketa_zberezhetsya_u_vidhuku")}
                  </span>
                  <button className={"primary"} disabled={isSaving}>
                    {translate("app.platform.nadislaty_vidhuk")}
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </form>
            )}
            {"report" === activeModal && (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  {
                    if (
                      await savePlatformAction({
                        action: "report",
                        jobId: selectedJob?.id,
                        reason: reportReason,
                      })
                    ) {
                      setActiveModal(null);
                      setReportReason("");
                      setToastMessage(
                        translate(
                          "app.platform.povidomlennya_zberezheno_dlya_rozhlyadu",
                        ),
                      );
                    }
                  }
                }}
              >
                <div className={"form-body"}>
                  <p>
                    {translate(
                      "app.platform.opyshy_shcho_same_ne_tak_iz_vakansiyeyu",
                    )}
                    {selectedJob?.title}
                    {"\xbb."}
                  </p>
                  <label className={"field"}>
                    {translate("app.platform.opys_problemy")}
                    <textarea
                      required={true}
                      minLength={5}
                      maxLength={2e3}
                      rows={5}
                      value={reportReason}
                      onChange={(event) => setReportReason(event.target.value)}
                    />
                  </label>
                  {formError && <p className={"form-error"}>{formError}</p>}
                </div>
                <div className={"form-footer"}>
                  <span />
                  <button className={"primary"} disabled={isSaving}>
                    {translate("app.platform.nadislaty_povidomlennya")}
                  </button>
                </div>
              </form>
            )}
            {"auth" === activeModal && (
              <AuthForm
                onRecoveryComplete={() => setPasswordResetToken("")}
                resetToken={passwordResetToken || void 0}
                onSuccess={async () => {
                  await loadPlatformState();
                  setPasswordResetToken("");
                  setActiveModal(null);
                  setToastMessage(translate("app.platform.vkhid_vykonano"));
                }}
              />
            )}
            {"about" === activeModal && (
              <div className={"form-body about-body"}>
                <p>
                  {translate(
                    "app.platform.pratsya_platforma_vakansiy_ta_rezyume_dlya_vsiyeyi_ukrayiny_domen_proyektu_pratsia_co",
                  )}
                </p>
                <h3>{translate("app.platform.shcho_vzhe_mozhna_zrobyty")}</h3>
                <p>
                  {translate(
                    "app.platform.opublikuvaty_vakansiyu_stvoryty_pryvatnu_anketu_znayty_ta_zberehty_propozytsiyi_vidhu",
                  )}
                </p>
                <h3>{translate("app.platform.vlasnyy_oblikovyy_zapys")}</h3>
                <p>
                  {translate(
                    "app.platform.poshuk_dostupnyy_bez_vkhodu_dlya_rezyume_vidhukiv_i_publikatsiyi_vakansiy_stvory_akau",
                  )}
                </p>
                <h3>{translate("app.platform.pro_dani")}</h3>
                <p>
                  {translate(
                    "app.platform.anketa_ta_kontaktni_dani_zberihayutsya_na_serveri_vidhuk_peredaye_robotodavtsyu_kopiy",
                  )}
                </p>
                <h3>{translate("app.platform.pryklady_ta_dzherela")}</h3>
                <p>
                  {translate(
                    "app.platform.demonstratsiyni_kompaniyi_y_vakansiyi_vyhadani_ta_poznacheni_avtomatychnyy_import_zov",
                  )}
                </p>
              </div>
            )}
          </section>
        </div>
      )}
      {occupationPickerTarget && (
        <OccupationPicker
          onClose={() => setOccupationPickerTarget(null)}
          onChoose={(chosenOccupation) => {
            {
              if ("search" === occupationPickerTarget) {
                setQueryInput(chosenOccupation.name);
                setFilters((previousFilters) => ({
                  ...previousFilters,
                  query: chosenOccupation.name,
                }));
                navigateToView("search");
              } else {
                if ("profile" === occupationPickerTarget) {
                  setProfileForm((previousProfile) => ({
                    ...previousProfile,
                    occupation: chosenOccupation.name,
                    specialties: {},
                  }));
                } else {
                  setJobForm((previousJob) => ({
                    ...previousJob,
                    occupation: chosenOccupation.name,
                    category: chosenOccupation.category,
                    title:
                      previousJob.title &&
                      previousJob.title !== previousJob.occupation
                        ? previousJob.title
                        : chosenOccupation.name,
                  }));
                }
              }
            }
            setOccupationPickerTarget(null);
          }}
        />
      )}
    </div>
  );
}
export { Platform as default };
