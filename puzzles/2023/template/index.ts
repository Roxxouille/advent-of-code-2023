import { readData } from "../../../utils/readData";

type Input = string[];
type Filename =
  | "input-a.txt"
  | "input-a-sample.txt"
  | "input-b.txt"
  | "input-b-sample.txt";

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

const [inputA, inputASample, inputB, inputBSample] = await Promise.all([
  getInput("input-a.txt"),
  getInput("input-a-sample.txt"),
  getInput("input-b.txt"),
  getInput("input-b-sample.txt"),
]);

console.log({
  "Part 1 (sample)": challenge1(inputASample),
  "Part 1 (final)": challenge1(inputA),
  "Part 2 (sample)": challenge2(inputBSample),
  "Part 2 (final)": challenge2(inputB),
});
