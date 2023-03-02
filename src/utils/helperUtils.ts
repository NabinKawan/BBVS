export function hasDuplicates(arr: any) {
  return arr.filter((value: any, index: any) => arr.indexOf(value) !== index).length > 0;
}

export function removeDuplicatesAndOriginal(arr: any) {
  let duplicates = arr.filter((item: any, index: number) => arr.indexOf(item) !== index);
  const set = new Set(arr);
  let setList = Array.from(set);
  let uniqueList = setList.filter((item) => !duplicates.includes(item));
  return uniqueList;
}

export function isEmpty(data: string | any[]) {
  return data.length === 0;
}
