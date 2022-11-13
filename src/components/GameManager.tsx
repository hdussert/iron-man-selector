import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import images from "../assets/images";
import { CharacterList } from "./CharacterList";
import { CharacterManager } from "./CharacterManager";
import { CheckBox } from "./CheckBox";
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

  const [showP1List, setShowP1List] = useState(false);
  const [showP2List, setShowP2List] = useState(false);

  const [p1CurrentCharIndex, setP1CurrentCharIndex] = useState(0);
  const [p2CurrentCharIndex, setP2CurrentCharIndex] = useState(0);

  const [winner, setWinner] = useState<string | null>(null);

  const startGame = (teamSize: number, isMirror?: boolean) => {
    const teamP1 = generateRandomTeam(teamSize, Object.keys(images));
    const teamP2 = isMirror ? generateRandomTeam(teamSize, teamP1) : generateRandomTeam(teamSize, Object.keys(images));
    setTeamPlayer1(teamP1);
    setTeamPlayer2(teamP2);
  };

  useEffect(() => {
    setWinner(null);
  }, [teamPlayer1, teamPlayer2]);

  return (
    <PageWrapper>
      <GameSettings setPlayer1={setPlayer1} setPlayer2={setPlayer2} startGame={startGame} />
      {teamPlayer1.length && teamPlayer2.length ? (
        <BottomPageWrapper>
          <LayoutCharacterList>
            <CheckBox
              id={`p1-view-full-list`}
              label={"Show the list"}
              onChange={(e) => setShowP1List(e.target.checked)}
            />
            {showP1List ? (
              <CharacterList list={teamPlayer1} id="p1" currentCharacterIndex={p1CurrentCharIndex} />
            ) : null}
          </LayoutCharacterList>
          <FixedContainer>
            <CharacterManager
              playerName={player1}
              list={teamPlayer1}
              setCharacterIndex={setP1CurrentCharIndex}
              setWinner={setWinner}
            />
            <CharacterManager
              playerName={player2}
              list={teamPlayer2}
              setCharacterIndex={setP2CurrentCharIndex}
              setWinner={setWinner}
            />
          </FixedContainer>
          <LayoutCharacterList css={{ alignItems: "end" }}>
            <CheckBox
              id={`p2-view-full-list`}
              label={"Show the list"}
              onChange={(e) => setShowP2List(e.target.checked)}
            />
            {showP2List ? (
              <CharacterList list={teamPlayer2} id="p2" currentCharacterIndex={p2CurrentCharIndex} />
            ) : null}
          </LayoutCharacterList>
          {winner !== null ? (
            <WinningScreen>
              <WinningMessage>GG {winner}</WinningMessage>
              <img src="https://i.giphy.com/media/sE0nAnZU4xsgYVfkbB/giphy.webp" />
            </WinningScreen>
          ) : null}
        </BottomPageWrapper>
      ) : null}
    </PageWrapper>
  );
};

export default GameManager;

const LayoutCharacterList = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const FixedContainer = styled("div", {
  display: "flex",
  gap: "40px",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translateX(-50%) translateY(-50%)",
});

const PageWrapper = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});
const BottomPageWrapper = styled("div", {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 20px",
});

const WinningScreen = styled("div", {
  top: 80,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.9)",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  zIndex: 1000,
});

const WinningMessage = styled("h1", {
  fontSize: "60px",
  color: "yellow",
});
