import { useState, useEffect } from "react";

import "./index.css";

function App() {
  const [count, setCount] = useState(0);
  const [politici, setPolitici] = useState([]);
  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPolitici(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Lista Politici</h1>
      <div className="politici-list">
        {politici.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p>
              <strong>Postion:</strong>
              {p.position}
            </p>
            <p>{p.biography}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
