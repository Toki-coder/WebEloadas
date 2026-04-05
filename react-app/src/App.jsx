import { useState, useEffect } from 'react'

function App() {
  const [termekek, setTermekek] = useState([]);
  const [hiba, setHiba] = useState(null);

  // Adatok lekérése a XAMPP-os PHP-tól
  useEffect(() => {
    // Figyelem: Itt a backend.php pontos elérési útját add meg!
    fetch('http://localhost/WebEloadas/backend.php')
      .then(res => {
        if (!res.ok) throw new Error('Hiba a hálózati kérésben');
        return res.json();
      })
      .then(data => setTermekek(data))
      .catch(err => setHiba(err.message));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4 text-primary">Élelmiszerbolt Készlet (React)</h1>
        
        {hiba && <div className="alert alert-danger">Hiba: {hiba}</div>}
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Kód</th>
                <th>Megnevezés</th>
                <th>Ár</th>
              </tr>
            </thead>
            <tbody>
              {termekek.length > 0 ? (
                termekek.map((aru) => (
                  <tr key={aru.aru_kod}>
                    <td>{aru.aru_kod}</td>
                    <td>{aru.nev}</td>
                    <td>{aru.ar} Ft</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Betöltés vagy üres adatbázis...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App