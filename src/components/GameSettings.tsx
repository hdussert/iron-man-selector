import { styled } from "@stitches/react";
import { useRef } from "react";
import { Radio } from "./Radio";

type GameSettingsProps = {
  setPlayer1: React.Dispatch<React.SetStateAction<string>>;
  setPlayer2: React.Dispatch<React.SetStateAction<string>>;
  startGame: (teamSize: number, isMirro?: boolean) => void;
};

export const GameSettings = ({ setPlayer1, setPlayer2, startGame }: GameSettingsProps) => {
  const teamSize = useRef(19);
  const isMirror = useRef(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startGame(teamSize.current, isMirror.current);
      }}
    >
      <SettingsWrapper>
        <Title>Game Settings</Title>
        <SectionsWrapper>
          <Section>
            <Subsection>
              <Label>Player 1</Label>
              <input onChange={(e) => setPlayer1(e.target.value)} type="text" />
            </Subsection>
            <Subsection>
              <Label>Player 2</Label>
              <input onChange={(e) => setPlayer2(e.target.value)} type="text" />
            </Subsection>
          </Section>
          <Section>
            <Subsection>
              <Label>Team size</Label>
              <select defaultValue={18} onChange={(e) => (teamSize.current = Number(e.target.value) + 1)}>
                {new Array(19).fill(".").map((_, i) => {
                  const indexForMuggles = i + 1;
                  return (
                    <option key={i} value={i}>
                      {indexForMuggles}
                    </option>
                  );
                })}
              </select>
            </Subsection>
            <Subsection>
              <Label>Pool selection</Label>
              <Radio
                label="Random"
                id="random-radio"
                groupName="pool-selection"
                onChange={() => {
                  isMirror.current = false;
                }}
              />
              <Radio
                label="Mirror"
                id="mirror-radio"
                groupName="pool-selection"
                onChange={() => {
                  isMirror.current = true;
                }}
              />
            </Subsection>
          </Section>
        </SectionsWrapper>
        <StartButton>Start</StartButton>
      </SettingsWrapper>
    </form>
  );
};

const SettingsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
const SectionsWrapper = styled("div", {});

const Section = styled("div", {
  display: "flex",
  gap: "20px",
  padding: "10px 10px",
  flex: 1,
});
const Subsection = styled("div", {
  flex: 1,
});

const StartButton = styled("button", {
  marginTop: "20px",
  padding: "8px 40px",
});

const Label = styled("h3", {
  marginBottom: "4px",
});
const Title = styled("h1", {
  marginTop: "-48px",
  marginBottom: "24px",
});
