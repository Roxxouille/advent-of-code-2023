import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt" | "sample-b.txt";

const year = 2023;
const day = 10;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

const directNeighbours = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const connections: Record<string, number[][]> = {
  "|": [
    [0, 1],
    [0, -1],
  ],
  "-": [
    [1, 0],
    [-1, 0],
  ],
  L: [
    [0, -1],
    [1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  7: [
    [0, 1],
    [-1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
};

function format(input: string[]) {
  return input.flatMap((line, lineIndex) =>
    line.split("").map((character, characterIndex) => ({
      x: characterIndex,
      y: lineIndex,
      content: character,
    })),
  );
}

function getNeighboursCoordinate(x: number, y: number) {
  return directNeighbours.map(([nX, nY]) => [x + nX, y + nY]);
}

function challenge1(input: Input) {
  const grid = input.map((line) => line.split(""));

  let start: number[] = [];
  for (const { x, y, content } of format(input)) {
    if (content === "S") {
      start = [x, y];
    }
  }

  let queue = [];
  for (const [x, y] of getNeighboursCoordinate(start[0], start[1])) {
    const currentElement = grid[y][x];
    if (currentElement in connections) {
      const connection = [x - start[0], y - start[1]];
      if (connections[currentElement].some(([pX, pY]) => connection[0] === pX && connection[1] === pY)) {
        queue.push([x, y]);
      }
    }
  }

  const seenPipe = new Set([start.join(",")]);
  while (queue.length) {
    queue = queue.flatMap(([x, y]) => {
      seenPipe.add([x, y].join(","));
      const pipe = grid[y][x];
      return connections[pipe]
        .map(([cX, cY]) => [cX + x, cY + y])
        .filter((position) => !seenPipe.has(position.join(",")));
    });
  }

  return seenPipe.size / 2;
}

function challenge2(input: Input) {
  const grid = input.map((line) => line.split(""));

  let start: number[] = [];
  for (const { x, y, content } of format(input)) {
    if (content === "S") {
      start = [x, y];
    }
  }

  let queue = [];
  for (const [x, y] of getNeighboursCoordinate(start[0], start[1])) {
    if (!(y in grid) || !(x in grid[y])) continue;
    const currentElement = grid[y][x];
    if (currentElement in connections) {
      const connection = [x - start[0], y - start[1]];
      if (connections[currentElement].some(([pX, pY]) => connection[0] === pX && connection[1] === pY)) {
        queue.push([x, y]);
      }
    }
  }

  for (const [k, conns] of Object.entries(connections)) {
    if (
      queue
        .map(([x, y]) => [x - start[0], y - start[1]])
        .every(([x, y]) => conns.find(([cX, cY]) => cX === x && cY === y))
    ) {
      grid[start[1]][start[0]] = k;
    }
  }

  const seenPipe = new Set([start.join(",")]);
  while (queue.length) {
    queue = queue.flatMap(([x, y]) => {
      seenPipe.add([x, y].join(","));
      const pipe = grid[y][x];
      return connections[pipe]
        .map(([cX, cY]) => [cX + x, cY + y])
        .filter((position) => !seenPipe.has(position.join(",")));
    });
  }

  let enclosed = 0;
  const inside = new Set();
  for (const { x, y } of format(input)) {
    if (seenPipe.has([x, y].join(","))) continue;

    let lefts = grid[y]
      .slice(0, x)
      .map((left, index) => [index, left])
      .filter(([lx, left]) => seenPipe.has([lx, y].join(",")) && ["7", "J", "F", "L", "|"].includes(String(left)))
      .map((pos) => pos[1])
      .join("");
    lefts = lefts.replaceAll("FJ", "|");
    lefts = lefts.replaceAll("F7", "");
    lefts = lefts.replaceAll("L7", "|");
    lefts = lefts.replaceAll("LJ", "");
    if (lefts.length % 2) {
      inside.add([x, y].join(","));
      enclosed += 1;
    }
  }

  return enclosed;
}

const [input, sample, sampleB] = await Promise.all([
  getInput("input.txt"),
  getInput("sample.txt"),
  getInput("sample-b.txt"),
]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sampleB),
  "Part 2 (final)": challenge2(input),
});
