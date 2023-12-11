import { readFile } from "fs/promises";

type Input = string;
type Filename = "input.txt" | "sample.txt" | "sample-b.txt";

const year = 2023;
const day = 8;

async function getInput(filename: Filename) {
  return (await readFile(`puzzles/${year}/day-${day}/${filename}`)).toString();
}

function challenge1(input: Input) {
  let [directions, unformatedNodes] = input.split("\n\n");
  const nodes = unformatedNodes
    .split("\n")
    .map((line) => line.match(/(.*?) = \((.*)?, (.*)\)/)?.slice(1) ?? [])
    .reduce<Record<string, Record<string, string>>>((acc, [from, L, R]) => {
      acc[from] = { L, R };
      return acc;
    }, {});

  let current = "AAA";
  let i = 0;
  for (i = 0; current !== "ZZZ"; i++) {
    current = nodes[current][directions[i % directions.length]];
  }

  return i;
}

export function leastCommonMultiple(a: number, b: number) {
  return (a * b) / greatestCommonDivisor(a, b);
}

export function greatestCommonDivisor(a: number, b: number): number {
  return !b ? a : greatestCommonDivisor(b, a % b);
}

function challenge2(input: Input) {
  let [directions, unformatedNodes] = input.split("\n\n");
  const nodes = unformatedNodes
    .split("\n")
    .map((line) => line.match(/(.*?) = \((.*)?, (.*)\)/)?.slice(1) ?? [])
    .reduce<Record<string, Record<string, string>>>((acc, [from, L, R]) => {
      acc[from] = { L, R };
      return acc;
    }, {});

  const starts = Object.keys(nodes).filter((node) => node.endsWith("A"));

  return starts
    .map((node) => {
      let nodeSeen = new Map();
      let cycle = [];
      let i = 0;
      while (true) {
        const j = i % directions.length;
        i++;
        const key = [j, node].join();
        if (nodeSeen.has(key)) {
          return i - nodeSeen.get(key);
        }
        nodeSeen.set(key, i);
        node = nodes[node][directions[j]];
        if (node.endsWith("Z")) {
          cycle.push([node, i]);
        }
      }
    })
    .reduce(leastCommonMultiple);
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
