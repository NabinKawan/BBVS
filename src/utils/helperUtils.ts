export function hasDuplicates(arr: any) {
  return arr.filter((value: any, index: any) => arr.indexOf(value) !== index).length > 0;
}

export function removeDuplicates(arr: any) {
  const set = new Set(arr);
  return Array.from(set);
}

export function isEmpty(data: string | any[]) {
  return data.length === 0;
}
