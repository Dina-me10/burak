console.log("MIT TASK X");

function countOccurrences(obj: any, target: string): number {
  if (typeof obj !== "object" || obj === null) {
    return 0;
  }

  let count = 0;

  for (const key in obj) {
    if (key === target) {
      count++;
    }
    count += countOccurrences(obj[key], target);
  }

  return count;
}

const chocolateShop = {
  chocolate: "Snickers",
  giftBox: {
    chocolate: "Mars",
    smallBag: {
      chocolate: "Bounty",
    },
  },
};

console.log(countOccurrences(chocolateShop, "chocolate"));

console.log("MIT TASK W");
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

const numbers = [10, 20, 30, 40, 50, 60, 70];
const chunk_numbers = chunkArray(numbers, 2);
console.log(chunk_numbers);

const names = ["dina", "aisha", "alex", "mark"];
const chunk_names = chunkArray(names, 2);
console.log(chunk_names);
