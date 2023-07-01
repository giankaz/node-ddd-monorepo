export function exportTableColumnParser(columns: unknown[]): string[][] {
  const parsedColumns: string[][] = [];

  const keysSet = new Set<string>();

  for (const column of columns) {
    const keys = Object.keys(column);
    const values: string[] = [];

    for (const key of keys) {
      keysSet.add(key);
    }

    for (const key of keysSet) {
      if (!column[key]) {
        values.push(null);
      } else {
        values.push(column[key]);
      }
    }

    parsedColumns.push(values);
  }

  const headers = Array.from(keysSet);

  parsedColumns.unshift(headers);

  return parsedColumns;
}
