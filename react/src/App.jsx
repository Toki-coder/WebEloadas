import { useState } from 'react';
import App1 from "./App1";
import App2 from "./App2";

function App() {
  const [menu, setMenu] = useState("app1");
  return (
    <div className="container mt-4">
      <nav className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => setMenu("app1")}>Számológép</button> 
        <button className="btn btn-success" onClick={() => setMenu("app2")}>Amőba Játék</button>
      </nav>
      {menu === "app1" ? <App1 /> : <App2 />}
    </div>
  );
}
export default App;