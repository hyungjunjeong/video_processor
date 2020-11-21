export function isMatched(keyword: string, title: string): boolean {
  if (keyword == "") {
    return true;
  }

  const matched = title.match(new RegExp(keyword, "gi"));
  if (matched) {
    return true;
  }
  return false;
}
