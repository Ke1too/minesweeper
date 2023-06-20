import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 0 -> 未クリック
  // 1 -> 左クリック
  // 2 -> はてな
  // 3 -> 旗(右クリック)

  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // 0 -> ボム無し
  // 1 -> ボム有り
  const [bombMap, setbombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  // -1 -> 石
  // 0 -> 画像なしセル
  // 1~8 -> 数字セル
  // 9 -> 石＋はてな
  // 10 -> 石＋旗
  // 11 -> ボムセル
  // 12 -> クリックしたところがボムだった場合、そこの背景を赤にする

  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];

  // ボム設置、10個置いたら終了する
  const clickLeft = (x: number, y: number) => {
    console.log(x, y);
    if (!bombMap.flat().includes(1)) {
      const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
      let bomb = 0;
      while (bomb < 10) {
        const s = Math.floor(Math.random() * 9);
        const t = Math.floor(Math.random() * 9);

        if (!newBombMap[s][t]) {
          console.log('🤩');
          newBombMap[s][t] = 1;
          bomb += 1;
        }
      }

      setbombMap(newBombMap);
    }
  };

  //再帰関数、クリックした周り８方向にあるボムの把握
  const Checkaround = (x: number, y: number) => {
    let bombCount = 0;
    for (const [y2, x2] of directions) {
      if (
        bombMap[y + y2] !== undefined &&
        bombMap[y + y2][x + x2] !== undefined &&
        bombMap[y + y2][x + x2] === 1
      ) {
        bombCount++;
      }
    }
    board[y][x] = bombCount;
    if (bombCount === 0) {
      for (const [y2, x2] of directions) {
        if (
          board[y + y2] !== undefined &&
          board[y + y2][x + x2] !== undefined &&
          (board[y + y2][x + x2] === -1 ||
            board[y + y2][x + x2] === 9 ||
            board[y + y2][x + x2] === 10)
        ) {
          Checkaround(x + x2, y + y2);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => clickLeft(x, y)}
              style={{ backgroundPositionX: 80 + -80 * color }}
            >
              {(color === -1 || color === 9 || color === 10) && (
                <div className={styles.stone} style={{ backgroundPositionX: 60 + -60 * color }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
