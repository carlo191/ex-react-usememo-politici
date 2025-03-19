import { useState, useEffect, useMemo } from "react";

import "./index.css";

function App() {
  const [count, setCount] = useState(0);
  const [politici, setPolitici] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPolitici(data))
      .catch((error) => console.error(error));
  }, []);
  const filteredPolitici = useMemo(() => {
    return politici.filter((p) => {
      const isNameIncluded = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const isBioIncluded = p.biography
        .toLowerCase()
        .includes(search.toLowerCase());
      return isNameIncluded || isBioIncluded;
    });
  }, [politici, search]);
  return (
    <>
      <input
        type="text"
        placeholder="Cerca"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>Lista Politici</h1>
      <div className="politici-list">
        {filteredPolitici.map((p) => (
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
