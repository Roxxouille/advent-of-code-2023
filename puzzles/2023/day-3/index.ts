import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample-a.txt" | "sample-b.txt";

const year = 2023;
const day = 3;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function format(input: string[]) {
  return input.flatMap((line, lineIndex) =>
    line.split("").map((character, characterIndex) => ({
      x: characterIndex,
      y: lineIndex,
      content: character,
    }))
  );
}

const neighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

function getNeighboursCoordinate(x: number, y: number) {
  return neighbours.map(([nX, nY]) => [x + nX, y + nY]);
}

function challenge1(input: Input) {
  const grid = input.map((str) => str.split(""));
  const seen = new Set();
  const numbers: number[] = [];
  for (const { x, y, content } of format(input)) {
    if (content.match(/(\d|\.)/)) continue;

    for (const [nX, nY] of getNeighboursCoordinate(x, y)) {
      if (!grid[nY][nX].match(/\d/) || seen.has([nX, nY].join())) continue;
      let left = nX;
      let right = nX;
      while ((grid[nY][left - 1] || "").match(/\d/)) left--;
      while ((grid[nY][right + 1] || "").match(/\d/)) right++;
      numbers.push(Number(grid[nY].slice(left, right + 1).join("")));
      for (let i = left; i <= right; i++) seen.add([i, nY].join());
    }
  }

  return numbers.reduce((acc, number) => (acc += number), 0);
}

function challenge2(input: Input) {
  const grid = input.map((str) => str.split(""));
  const seen = new Set();
  const numbers: number[] = [];
  for (const { x, y, content } of format(input)) {
    if (content !== "*") continue;
    const neighboursNumbers: number[] = [];
    for (const [nX, nY] of getNeighboursCoordinate(x, y)) {
      if (!grid[nY][nX].match(/\d/) || seen.has([nX, nY].join())) continue;
      let left = nX;
      let right = nX;
      while ((grid[nY][left - 1] || "").match(/\d/)) left--;
      while ((grid[nY][right + 1] || "").match(/\d/)) right++;
      neighboursNumbers.push(Number(grid[nY].slice(left, right + 1).join("")));
      for (let i = left; i <= right; i++) seen.add([i, nY].join());
    }

    if (neighboursNumbers.length === 2) {
      numbers.push(neighboursNumbers[0] * neighboursNumbers[1]);
    }
  }

  return numbers.reduce((acc, number) => (acc += number), 0);
}

const [input, sampleA, sampleB] = await Promise.all([
  getInput("input.txt"),
  getInput("sample-a.txt"),
  getInput("sample-b.txt"),
]);

console.log({
  "Part 1 (sample)": challenge1(sampleA),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sampleB),
  "Part 2 (final)": challenge2(input),
});
