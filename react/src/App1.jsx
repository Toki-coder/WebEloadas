import { useState } from 'react';

function App1() {
    const [display, setDisplay] = useState("");
    const handleClick = (val) => setDisplay(display + val);
    const calculate = () => {
        try { setDisplay(eval(display).toString()); } 
        catch { setDisplay("Hiba"); }
    };
    return (
        <div className="card p-4 shadow-sm text-center">
            <h3>Számológép</h3>
            <div className="bg-dark text-white p-3 mb-3 text-end fs-2 rounded">{display || "0"}</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
                {["7","8","9","/" , "4","5","6","*" , "1","2","3","-" , "0",".","=","+"].map(btn => (
                    <button key={btn} className="btn btn-secondary py-2" onClick={() => btn === "=" ? calculate() : handleClick(btn)}>{btn}</button>
                ))}
                <button className="btn btn-danger" style={{gridColumn: "span 4"}} onClick={() => setDisplay("")}>Törlés</button>
            </div>
        </div>
    );
}
export default App1;