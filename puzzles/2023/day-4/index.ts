import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 4;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

function format(input: Input) {
  return input.map((line) => {
    const splittedLine = line.split(/(:|\|)/);
    return {
      winningNumbers: splittedLine[2].trim().split(/\s+/).map(Number),
      numbers: splittedLine[4].trim().split(/\s+/).map(Number),
      copy: 1,
    };
  });
}

function challenge1(input: Input) {
  return format(input).reduce((acc, card, index, array) => {
    const sameNumbers: number[] = [];
    card.winningNumbers.forEach((number) => {
      if (card.numbers.includes(number)) {
        sameNumbers.push(number);
      }
    });
    const cardValue = sameNumbers.reduce((acc, number, index) => {
      if (index !== 0) return acc * 2;
      return acc;
    }, 1);

    return (acc += sameNumbers.length > 0 ? cardValue : 0);
  }, 0);
}

function challenge2(input: Input) {
  const scratchcards = format(input);
  scratchcards.forEach((card, index) => {
    const wins = card.winningNumbers.reduce((acc, number) => {
      if (card.numbers.includes(number)) {
        acc += 1;
      }
      return acc;
    }, 0);
    for (let i = 1; i <= wins; i++) {
      scratchcards[index + i].copy += card.copy;
    }
  });
  return scratchcards.reduce((acc, card) => (acc += card.copy), 0);
}

const [input, sample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sample),
  "Part 2 (final)": challenge2(input),
});
