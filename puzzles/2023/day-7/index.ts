import { readData } from "../../../utils/readData";

type Input = string[];
type Filename = "input.txt" | "sample.txt";

const year = 2023;
const day = 7;

async function getInput(filename: Filename): Promise<Input> {
  return await readData({ year, day, filename });
}

const numCardLabels = ["2", "3", "4", "5", "6", "7", "8", "9", "T"];
const faceCardLabels = ["Q", "K", "A"];

function getCardLabels(options?: { withJoker: boolean }) {
  return options?.withJoker ? ["J", ...numCardLabels, ...faceCardLabels] : [...numCardLabels, "J", ...faceCardLabels];
}

function assignCardValues(cards: string, options?: { withJoker: boolean }) {
  return cards.split("").map((card) => getCardLabels(options).indexOf(card));
}

function getHandScore(cards: string, options?: { withJoker: boolean }) {
  const cardsNumber: Record<string, number> = {};
  let jokers = 0;
  cards.split("").forEach((card) => (cardsNumber[card] = (cardsNumber[card] || 0) + 1));
  if (options?.withJoker) {
    jokers = cardsNumber["J"] || 0;
    delete cardsNumber["J"];
  }
  const [max = 0, second = 0] = [...Object.values(cardsNumber).sort((a, b) => b - a)];
  return (max + jokers) * 2 + second;
}

function getTotalWinnings(input: Input, options?: { withJoker: boolean }) {
  return input
    .map((line) => line.split(" "))
    .map(([cards, bid]) => ({
      cards: assignCardValues(cards, options),
      bid: Number(bid),
      score: getHandScore(cards, options),
    }))
    .sort(({ cards: a, score: scoreA }, { cards: b, score: scoreB }) => {
      if (scoreA !== scoreB) return scoreA - scoreB;
      for (let i = 0; i < 5; i++) {
        if (a[i] !== b[i]) {
          return a[i] - b[i];
        }
      }

      return 0;
    })
    .map(({ bid }, i) => bid * (i + 1))
    .reduce((sum, bid) => sum + bid, 0);
}

function challenge1(input: Input) {
  return getTotalWinnings(input);
}

function challenge2(input: Input) {
  return getTotalWinnings(input, { withJoker: true });
}

const [input, sample] = await Promise.all([getInput("input.txt"), getInput("sample.txt")]);

console.log({
  "Part 1 (sample)": challenge1(sample),
  "Part 1 (final)": challenge1(input),
  "Part 2 (sample)": challenge2(sample),
  "Part 2 (final)": challenge2(input),
});
