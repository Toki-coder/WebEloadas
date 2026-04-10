import { useState } from 'react';

function App2() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (sqs) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a,b,c] of lines) {
      if (sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]) return sqs[a];
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "🍞" : "🍎";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  return (
    <div className="card p-4 shadow-sm text-center">
      <h3>Élelmiszer Amőba</h3>
      <h4>{winner ? `Győztes: ${winner}` : `Következő: ${isXNext ? "🍞" : "🍎"}`}</h4>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '5px', justifyContent: 'center'}}>
        {squares.map((sq, i) => (
          <button key={i} className="btn btn-outline-secondary fs-2" onClick={() => handleClick(i)} style={{height: '80px'}}>{sq}</button>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setSquares(Array(9).fill(null))}>Új játék</button>
    </div>
  );
}
export default App2;