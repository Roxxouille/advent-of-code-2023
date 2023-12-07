import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 2;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

const maxCubesByColors: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function challenge1(input: Input) {
  return input.reduce((acc, str) => {
    let possible = true;
    const yolo = str
      .split(/(:|,|;)/)
      .filter((value) => value !== ":" && value !== ";" && value !== ",")
      .map((value) => value.trim());
    yolo.forEach((value, index) => {
      if (index === 0) return;
      const [cubes, color] = value.split(" ");
      if (Number(cubes) > maxCubesByColors[color]) {
        possible = false;
      }
    });
    if (possible) {
      acc += Number(yolo[0].split(" ")[1]);
    }
    return acc;
  }, 0);
}

function challenge2(input: Input) {
  return input.reduce((acc, str) => {
    const powers: Record<string, number> = { red: 0, green: 0, blue: 0 };
    const format = str
      .split(/(:|,|;)/)
      .filter((value) => value !== ":" && value !== ";" && value !== ",")
      .map((value) => value.trim());
    format.forEach((value, index) => {
      if (index === 0) return;
      const [cubes, color] = value.split(" ");
      if (Number(cubes) > powers[color]) {
        powers[color] = Number(cubes);
      }
    });
    acc += Object.values(powers).reduce((acc, power) => acc * power, 1);
    return acc;
  }, 0);
}

const [input, inputSample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(inputSample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(inputSample),
  "Part 2 (final)": challenge2(input),
});
