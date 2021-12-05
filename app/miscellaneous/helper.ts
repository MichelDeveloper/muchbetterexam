interface BoardObject {
  id: number;
  value: string;
}

export const calculateWinner = (squares: BoardObject[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a]?.value &&
      squares[a]?.value === squares[b]?.value &&
      squares[a]?.value === squares[c]?.value
    ) {
      return { winner: squares[a]?.value, victoryPositions: [a, b, c] };
    }
  }
  return false;
};

export const calculateMove = (index: number) => {
  let count = 0;
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      if (count === index) {
        return { x: i, y: j };
      }
      count++;
    }
  }
  return { x: 0, y: 0 };
};

export const defaultArray = [
  { id: 0, value: '' },
  { id: 1, value: '' },
  { id: 2, value: '' },
  { id: 3, value: '' },
  { id: 4, value: '' },
  { id: 5, value: '' },
  { id: 6, value: '' },
  { id: 7, value: '' },
  { id: 8, value: '' },
];

export const backgroundAnimation = {
  0: {
    opacity: 0.4,
    scale: 1.95,
    top: 0,
    left: 0,
  },
  1: {
    opacity: 0.5,
    scale: 2,
    top: 200,
    left: -75,
  },
};
