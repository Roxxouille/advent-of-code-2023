import { readFile } from "fs/promises";

type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 5;

async function getInput(filename: Filename): Promise<string> {
  return (await readFile(`puzzles/${year}/day-${day}/${filename}`)).toString();
}

function challenge1(input: string) {
  const [unformatedSeeds, ...unformatedMaps] = input.split("\n\n");
  let seeds: (number | null)[] = unformatedSeeds
    .split(": ")[1]
    .split(" ")
    .map(Number);
  const maps = unformatedMaps.map((map) =>
    map
      .split(":\n")[1]
      .split("\n")
      .map((line) => line.split(" ").map(Number))
  );
  maps.forEach((map) => {
    const newSeeds: number[] = [];
    map.forEach(([to, from, length]) => {
      seeds.forEach((seed, index) => {
        if (seed === null) return;
        if (seed >= from && seed < from + length) {
          newSeeds.push(seed - from + to);
          seeds[index] = null;
        }
      });
    });
    seeds = seeds.filter((seed) => seed !== null).concat(newSeeds);
  });

  return Math.min(...(seeds as number[]));
}

function chunk<T>(arr: Array<T>, chunkLength: number) {
  arr = [...arr];
  return [...Array(Math.ceil(arr.length / chunkLength))].map((_, index) =>
    arr.slice(index * chunkLength, (index + 1) * chunkLength)
  );
}

export function mergeRanges(ranges: number[][]) {
  ranges.sort(([min1], [min2]) => min1 - min2);
  const merged = [ranges[0]];
  for (const [min, max] of ranges.slice(1)) {
    const last = merged[merged.length - 1];
    if (min <= last[1] + 1) {
      last[1] = Math.max(max, last[1]);
    } else {
      merged.push([min, max]);
    }
  }
  return merged;
}

export function findRangesIntersection([a, b]: number[], [c, d]: number[]) {
  if (a > d || b < c) return null;
  if (a >= c) {
    return b < d ? [a, b] : [a, d];
  }
  return b < d ? [c, b] : [c, d];
}

function challenge2(input: string) {
  const [unformatedSeeds, ...unformatedMaps] = input.split("\n\n");
  let seedsRanges = chunk(
    unformatedSeeds.split(": ")[1].split(" ").map(Number),
    2
  ).map(([seed, length]) => [seed, seed + length - 1]);

  const maps = unformatedMaps.map((map) =>
    map
      .split(":\n")[1]
      .split("\n")
      .map((line) => line.split(" ").map(Number))
  );

  maps.forEach((map) => {
    const newSeedsRanges: number[][] = [];
    map.forEach(([to, from, length]) => {
      seedsRanges = seedsRanges.flatMap((seedRange) => {
        const toMove = findRangesIntersection(
          [from, from + length - 1],
          seedRange
        );
        if (!toMove) {
          return [seedRange];
        }
        newSeedsRanges.push([toMove[0], toMove[1]].map((n) => n - from + to));
        return [
          [seedRange[0], toMove[0] - 1],
          [toMove[1] + 1, seedRange[1]],
        ].filter(([seed, max]) => seed <= max);
      });
    });
    seedsRanges = mergeRanges(newSeedsRanges.concat(seedsRanges));
  });

  return Math.min(...seedsRanges.map(([min]) => min));
}

const [input, sample] = await Promise.all([
  getInput("input.txt"),
  getInput("sample.txt"),
]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sample),
  "Part 2 (final)": challenge2(input),
});
