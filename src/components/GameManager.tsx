import { useState } from "react";
import images from "../assets/images";
import { GameSettings } from "./GameSettings";

// Bad performance but fills our needs
const generateRandomTeam = (teamSize: number, pool: string[]) => {
  const res = [];
  while (teamSize) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    res.push(pool[randomIndex]);
    pool = pool.filter((_, i) => randomIndex !== i);
    teamSize--;
  }
  return res;
};

const GameManager = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [teamPlayer1, setTeamPlayer1] = useState<string[]>([]);
  const [teamPlayer2, setTeamPlayer2] = useState<string[]>([]);

  const startGame = (teamSize: number, isMirror?: boolean) => {
    const teamP1 = generateRandomTeam(teamSize, Object.keys(images));
    const teamP2 = isMirror ? generateRandomTeam(teamSize, teamP1) : generateRandomTeam(teamSize, Object.keys(images));
    setTeamPlayer1(teamP1);
    setTeamPlayer2(teamP2);
  };

  return (
    <>
      <GameSettings setPlayer1={setPlayer1} setPlayer2={setPlayer2} startGame={startGame} />
      <h1>{player1}</h1>
      {teamPlayer1.map((character) => (
        <img style={{ width: "50px", height: "50px" }} key={`p1-${character}`} src={images[character]} />
      ))}
      <h1>{player2}</h1>
      {teamPlayer2.map((character) => (
        <img style={{ width: "50px", height: "50px" }} key={`p2-${character}`} src={images[character]} />
      ))}
    </>
  );
};

export default GameManager;
