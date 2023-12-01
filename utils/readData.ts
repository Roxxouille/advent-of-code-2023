import { readFile } from "fs/promises";

export async function readData({
  year,
  day,
  filename,
}: {
  year: number;
  day: number;
  filename: string;
}) {
  return (await readFile(`puzzles/${year}/day-${day}/${filename}`))
    .toString()
    .replace(/\r/g, "")
    .trim()
    .split("\n");
}
