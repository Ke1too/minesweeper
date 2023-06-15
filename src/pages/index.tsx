import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 0 -> 未クリック
  // 1 -> 左クリック
  // 2 -> はてな
  // 3 -> 旗(右クリック)

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
  const [userInputs,setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    const bombCount = 10;
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
    const isFailure = userInputs.some((row,y) => 
      row.some((input,x) => input === 1 && bombMap[y][x] === 1)
    );
    // -1 -> 石
    // 0 -> 画像なしセル
    // 1~8 -> 数字セル
    // 9 -> 石＋はてな
    // 10 -> 石＋旗
    // 11 -> ボムセル
    const board: number[][] = [];
      
    const onClick = (x: number, y: number) => {
      console.log(x, y);
      const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default Home;
