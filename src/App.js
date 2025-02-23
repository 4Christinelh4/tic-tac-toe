import './App.css';
import { useState } from 'react'

function App() {
  const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState('');
  const [winningTiles, setWinningTiles] = useState([]);

  const handleTurn = (y, x) => {
    if (board[y][x] === '') {
      let newBoard = board;
      newBoard[y][x] = turn;
      setTurn(turn === 'X'?'O':'X');
      setBoard(newBoard);
      checkWin();
    }
  }
  
  const checkWin = () => {
    if (board[0][0] !== ''
    && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      setGameWinner([[0, 0], [1, 1], [2, 2]], board[0][0]);
      return;
    }

    if (board[0][2] !== ''
    && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      setGameWinner([[0, 2], [1, 1], [2, 0]], board[0][2]);
      return;
    }

    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        setGameWinner([[i, 0], [i, 1], [i, 2]], board[i][0])
        return
      }
    }

    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        setGameWinner([[0, i], [1, i], [2, i]], board[0][i])
        return
      }
    }
  }

  const setGameWinner = (winnerCells, player) => {
    setWinningTiles(winnerCells);
    setWinner(player);
    let winCount  = localStorage.getItem(`${player}_WIN`);
    localStorage.setItem(`${player}_WIN`, winCount? parseInt(winCount)+1:1);
  }

  const checkWinningTile = (y, x) => {
    let win = false;
    if (winningTiles.length === 0) {
      return '';
    }
    winningTiles.forEach(cell => {
      if (cell[0] === y && cell[1] === x) {
        win = true
      }
    });

    if (win === true) {
      return 'winner'
    }
    return ''
  }

  return (
    <div className='parent'>
      {board.map((row, y) => {
        return (
          <div className='row' key={`row-${y}`}>
            {row.map((cell, x)=> {
              return (
                <button 
                key={`col-${x}`}
                className={checkWinningTile(y, x)}
                onClick={() => handleTurn(y, x)}>
                  {cell}
                  </button>
              )
            })}
          </div>
        )
      })}
      {winner && 
      (<div>
        <div>winner is {winner}</div>
        <div>{winner} won {localStorage.getItem(`${winner}_WIN`)} times</div>
      </div>)}
    </div>
  );
}

export default App;
