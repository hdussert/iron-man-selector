import { useEffect, useState } from "react";
import images from "../assets/images";

type CharacterListProps = {
  playerName: string;
  list: string[];
};

export const CharacterList = ({ playerName, list }: CharacterListProps) => {
  const [nbWin, setNbWin] = useState(0);
  useEffect(() => {
    setNbWin(0);
  }, [list]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>{playerName}</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
        <button onClick={() => setNbWin(nbWin - 1)}>&lt;</button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <img
            style={{ width: "200px", height: "200px" }}
            key={`${playerName}-${list[nbWin]}`}
            src={images[list[nbWin]]}
          />
          <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>{list[nbWin]}</div>
        </div>
        <button onClick={() => setNbWin(nbWin + 1)}>&gt;</button>
      </div>
    </div>
  );
};
