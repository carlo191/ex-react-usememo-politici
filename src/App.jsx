import React, { useState, useEffect, useMemo, memo } from "react";
import "./index.css";

function App() {
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

  const PoliticiCard = memo(({ name, image, position, biography }) => {
    console.log("card");
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <h3>
          <strong>Posizione: </strong> {position}
        </h3>
        <p>{biography}</p>
      </div>
    );
  });

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
          <PoliticiCard key={p.id} {...p} />
        ))}
      </div>
    </>
  );
}

export default App;
