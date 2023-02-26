export function hasDuplicates(arr: any) {
  console.log({ arr });
  return arr.filter((value: any, index: any) => arr.indexOf(value) !== index).length > 0;
}

export function removeDuplicates(arr: any) {
  const set = new Set(arr);
  return Array.from(set);
}
