export function permute(arr) {
  let result = [];
  
  if (typeof arr === 'string') arr = arr.split('')

  if (arr.length === 0) return [[]];

  for (let i = 0; i < arr.length; i++) {
    let currentNum = arr[i];
    let remainingNums = arr.slice(0, i).concat(arr.slice(i + 1));
    let remainingPerms = permute(remainingNums);
    for (let perm of remainingPerms) {
      result.push([currentNum].concat(perm));
    }
  }

  return result;
}