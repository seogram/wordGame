export default function randomArrayPicker(arr, n) {
  let m = n;
  const result = new Array(m);
  let len = arr.length;
  const taken = new Array(len);
  if (m > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (m) {
    m -= 1;
    const x = Math.floor(Math.random() * len);
    result[m] = arr[x in taken ? taken[x] : x];
    len -= 1;
    taken[x] = len in taken ? taken[len] : len;
  }
  return result;
}
