import React, { useState, useEffect } from 'react';

const TowerGroup = () => {
  const maxDiscCount = 10;
  const [discCount, setDiscCount] = useState(3);
  const [towers, setTowers] = useState({
    A: Array.from({ length: discCount }, (_, index) => discCount - index),
    B: [],
    C: [],
  });
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  useEffect(() => {
    setTowers({
      A: Array.from({ length: discCount }, (_, index) => discCount - index),
      B: [],
      C: [],
    });
    setMoves([]);
    setCurrentMoveIndex(0);
  }, [discCount]);

  const solutionMoves = (n, from, to, aux) => {
    if (n === 1) {
      setMoves((prevMoves) => [...prevMoves, { from, to }]);
      return;
    }
    solutionMoves(n - 1, from, aux, to);
    setMoves((prevMoves) => [...prevMoves, { from, to }]);
    solutionMoves(n - 1, aux, to, from);
  };

  const handleSolve = () => {
    setMoves([]);
    solutionMoves(discCount, 'A', 'C', 'B');
    setCurrentMoveIndex(0);
  };

  const handlePrevMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex((prevIndex) => prevIndex - 1);
      moveDisk(moves[currentMoveIndex - 1].to, moves[currentMoveIndex - 1].from);
    }
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length) {
      moveDisk(moves[currentMoveIndex].from, moves[currentMoveIndex].to);
      setCurrentMoveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const moveDisk = (from, to) => {
    const updatedTowers = { ...towers };
    const disk = updatedTowers[from].pop();
    updatedTowers[to].push(disk);
    setTowers(updatedTowers);
  };

  return (
    <div className="App">
      <h1>Tower of Hanoi</h1>
      <div>
        <label>Number of Discs (up to {maxDiscCount}):</label>
        <input
          type="number"
          value={discCount}
          onChange={(e) =>
            setDiscCount(Math.min(maxDiscCount, Math.max(1, parseInt(e.target.value, 10))))
          }
          max={maxDiscCount}
          min="1"
        />
      </div>
      <div id="towers">
        {Object.keys(towers).map((tower) => (
          <div key={tower} className="tower-container">
            <div className="tower">
              {towers[tower].map((diskSize, index) => (
                <div key={index} className="disk" style={{ width: `${diskSize * 20}px` }}>
                  {diskSize}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handlePrevMove} disabled={currentMoveIndex === 0}>
          Previous Move
        </button>
        <button onClick={handleSolve}>Solve</button>
        <button onClick={handleNextMove} disabled={currentMoveIndex === moves.length}>
          Next Move
        </button>
      </div>
    </div>
  );
};

export default TowerGroup;
