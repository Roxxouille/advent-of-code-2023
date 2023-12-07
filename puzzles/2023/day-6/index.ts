import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 6;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function challenge1(input: Input) {
  const [time, distance] = input;
  const times = time.split(":")[1].trim().split(/\s+/).map(Number);
  const distances = distance.split(":")[1].trim().split(/\s+/).map(Number);

  const possibilities = Array.from({ length: times.length }).map(() => 0);
  for (let index = 0; index < times.length; index++) {
    const distanceToBeat = distances[index];
    const maxTime = times[index];
    for (let milliseconds = 1; milliseconds < maxTime; milliseconds++) {
      const distance = milliseconds * (maxTime - milliseconds);
      if (distance > distanceToBeat) possibilities[index] += 1;
    }
  }
  return possibilities.reduce((a, b) => a * b, 1);
}

function challenge2(input: Input) {
  const [maxTime, distanceToBeat] = input.map((str) => Number(str.replace(/\s+/g, "").match(/\d+/g)?.[0]));
  let possibilities = 0;
  for (let milliseconds = 1; milliseconds < maxTime; milliseconds++) {
    const distance = milliseconds * (maxTime - milliseconds);
    if (distance > distanceToBeat) possibilities += 1;
  }
  return possibilities;
}

const [input, sample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sample),
  "Part 2 (final)": challenge2(input),
});
