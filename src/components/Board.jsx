import React, { useState, useEffect } from 'react';
import Square from './Square'

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [blueScore, setBlueScore] = useState(0);
    const [redScore, setRedScore] = useState(0);
    const [isXTurn, setXTurn] = useState(true);

    useEffect(() => {
        const storedBlueScore = localStorage.getItem('blueScore');
        const storedRedScore = localStorage.getItem('redScore');
        if (storedBlueScore) setBlueScore(parseInt(storedBlueScore));
        if (storedRedScore) setRedScore(parseInt(storedRedScore));
      }, []);

    const checkWinner = (squares) => {
        const winnerLogic = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let logic of winnerLogic) {
            const [a,b,c] = logic;
            if(squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (!squares.includes(null)) {
            return 'Draw';
          }
        
          return null;
    }

    
    const handleClick = (index) => {
        if (state[index] || checkWinner(state)) return setState(Array(9).fill(null));
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);

        const winner = checkWinner(copyState);
        if (winner === 'X') {
            setBlueScore(blueScore + 1);
            localStorage.setItem('blueScore', blueScore + 1);
        } else if (winner === 'O') {
            setRedScore(redScore + 1);
            localStorage.setItem('redScore', redScore + 1);
        }

        setXTurn(!isXTurn);
    }

    const resetScores = () => {
        setBlueScore(0);
        setRedScore(0);
        localStorage.removeItem('blueScore');
        localStorage.removeItem('redScore');
    };

    const resetBoard = () => {
        setState(Array(9).fill(null));
    }

  return (
    <div className='container-board'>
        <h2>Tic-Tac-Toe Game</h2>
        <div className='btn'>
            <button onClick={resetBoard}>Reset Board</button>
            <button onClick={resetScores}>Reset Score</button>
        </div>
        <div className='scores'>
            <div>Blue Score: {blueScore}</div>
            <div>Red Score: {redScore}</div>
        </div>
        <div className='board-row'>
            <Square onClick={() => handleClick(0)} value={state[0]}/>
            <Square onClick={() => handleClick(1)} value={state[1]}/>
            <Square onClick={() => handleClick(2)} value={state[2]}/>
        </div>
        <div className='board-row'>
            <Square onClick={() => handleClick(3)} value={state[3]}/>
            <Square onClick={() => handleClick(4)} value={state[4]}/>
            <Square onClick={() => handleClick(5)} value={state[5]}/>
        </div>
        <div className='board-row'>
            <Square onClick={() => handleClick(6)} value={state[6]}/>
            <Square onClick={() => handleClick(7)} value={state[7]}/>
            <Square onClick={() => handleClick(8)} value={state[8]}/>
        </div>
    </div>
  )
}

export default Board;