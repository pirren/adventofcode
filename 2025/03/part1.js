import { pipe, sum } from '../../lib/utils.js'

export const metadata = {
  "Puzzle Name": "Lobby"
};

const maxDigit = arr =>
  arr.reduce((max, x) =>
    (+x > +max ? x : max)
  );

const buildJoltage = (size, battery, idx = 0, joltage = '') => {
  if (joltage.length === size)
    return joltage;

  const remaining = size - joltage.length;
  const end = battery.length - remaining + 1;

  const batteryParts = [...battery.slice(idx, end)];
  const digit = maxDigit(batteryParts);
  const localIndex = batteryParts.indexOf(digit);

  const nextIdx = idx + localIndex + 1;
  const nextJoltage = joltage + digit;

  return buildJoltage(size, battery, nextIdx, nextJoltage);
};

export const largestJoltages = size => batteries =>
  batteries
    .map(battery => buildJoltage(size, battery))
    .map(Number);

export default pipe(
  largestJoltages(2),
  sum
);