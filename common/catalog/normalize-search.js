export function normalizeSearch(searchText) {
  return searchText
    .toLocaleLowerCase("uk")
    .replace(/[’'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
