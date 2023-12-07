import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 0;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function challenge1(input: Input) {
  return input;
}

function challenge2(input: Input) {
  return input;
}

const [input, sample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
});
