export function parseArray(serializedArray) {
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
