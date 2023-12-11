import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 9;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function challenge1(input: Input) {
  return input
    .map((line) => line.split(" ").map(Number))
    .map((sequence) => {
      const rows = [sequence];

      for (let r = 0; ; r++) {
        const row: number[] = [];
        for (let i = 0; i < rows[r].length - 1; i++) {
          row.push(rows[r][i + 1] - rows[r][i]);
        }
        rows.push(row);
        if (row.every((e) => e === 0)) {
          break;
        }
      }

      for (let r = rows.length - 1; r >= 0; r--) {
        rows[r].push((rows.at(r + 1)?.at(-1) ?? 0) + rows[r].at(-1)!);
      }

      return rows[0].at(-1)!;
    })
    .reduce((a, b) => a + b, 0);
}

function challenge2(input: Input) {
  return input
    .map((line) => line.split(" ").map(Number))
    .map((sequence) => {
      const rows = [sequence];

      for (let r = 0; ; r++) {
        const row: number[] = [];
        for (let i = 0; i < rows[r].length - 1; i++) {
          row.push(rows[r][i + 1] - rows[r][i]);
        }
        rows.push(row);
        if (row.every((e) => e === 0)) {
          break;
        }
      }

      for (let r = rows.length - 1; r >= 0; r--) {
        rows[r].unshift(rows[r][0] - (rows.at(r + 1)?.[0] ?? 0));
      }

      return rows[0][0];
    })
    .reduce((a, b) => a + b, 0);
}

const [input, sample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sample),
  "Part 2 (final)": challenge2(input),
});
