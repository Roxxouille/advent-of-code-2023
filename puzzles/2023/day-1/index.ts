import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample-a.txt" | "sample-b.txt";

const year = 2023;
const day = 1;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function challenge1(input: Input) {
  return input
    .map((line) => {
      const digits = line
        .split("")
        .map(Number)
        .filter((n) => !Number.isNaN(n));
      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
}

const validNumbers: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function convertWordToNumber(str: string) {
  for (const key in validNumbers) {
    if (str.startsWith(key)) return validNumbers[key];
  }

  return Number.parseInt(str.charAt(0));
}

function challenge2(input: Input) {
  return input
    .map((line) => {
      const digits = line
        .split("")
        .map((_, i) => convertWordToNumber(line.slice(i)))
        .filter((n) => !isNaN(n));

      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
}

const [input, sampleA, sampleB] = await Promise.all([
  getInput("input.txt"),
  getInput("sample-a.txt"),
  getInput("sample-b.txt"),
]);

console.table({
  "Part 1 (sample)": challenge1(sampleA),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sampleB),
  "Part 2 (final)": challenge2(input),
});
