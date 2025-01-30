import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const ModalSetPuntage = ({ dataMatch, dataTournament, setDataTournament }) => {
  const limiteScore = 3;
  const [scoreP1, setScoreP1] = useState("");
  const [scoreP2, setScoreP2] = useState("");

  const handleScoreChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= limiteScore)) {
      setter(value);
    }
  };
  const changeResults = () => {
    const indexMatch = dataTournament.findIndex(match => match.id === dataMatch.match.id);
    if (indexMatch ===-1) return;
    let updatedMatch ={ ...dataMatch.match };
    let winner = null;
    updatedMatch.participants[0].resultText=scoreP1;
    updatedMatch.participants[1].resultText= scoreP2;

    if (parseInt(scoreP1)>=limiteScore) {
      updatedMatch.participants[0].isWinner= true;
      winner = updatedMatch.participants[0];
    }
    if (parseInt(scoreP2)>=limiteScore) {
      updatedMatch.participants[1].isWinner=true;
      winner = updatedMatch.participants[1];
    }
    const updatedTournament = [...dataTournament];
    updatedTournament[indexMatch]=updatedMatch;
    setDataTournament(updatedTournament);
    if(winner){
      linkNextMatch(winner);
    }
    setScoreP1("")
    setScoreP2("")
  };
  const linkNextMatch=(winner)=>{
    setDataTournament(prevTournament=>{
      const updatedTournament=[...prevTournament];
      const indexNextMatch=updatedTournament.findIndex(match => match.id === dataMatch.match.nextMatchId);
      if (indexNextMatch ===-1) return prevTournament;
      const participantIndex=updatedTournament[indexNextMatch].participants.findIndex(participant => participant.id === null);
      if (participantIndex !==-1) {
        updatedTournament[indexNextMatch].participants[participantIndex].id = winner.id;
        updatedTournament[indexNextMatch].participants[participantIndex].name = winner.name;
      }
      return updatedTournament;
    });
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-md text-black-200">Match Ronda 1</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Ingresa el nuevo puntaje a continuación
        </DialogDescription>
      </DialogHeader>

      {dataMatch && (
        <div className="flex items-center gap-4 w-100 mx-auto mt-3">
          <div className="flex items-center">
            <div>{dataMatch.match.participants[0].name}</div>
            <Input
              value={scoreP1}
              onChange={handleScoreChange(setScoreP1)}
              className="ml-2 text-md text-center text-base size-10 p-2 border rounded-md"
            />
          </div>
          <hr className="w-1 border border-black" />
          <div className="flex items-center">
            <Input
              value={scoreP2}
              onChange={handleScoreChange(setScoreP2)}
              className="mr-2 text-md text-center text-base size-10 p-2 border rounded-md"
            />
            <div>{dataMatch.match.participants[1].name}</div>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button onClick={changeResults} className="bg-lime-600 text-white" variant="outline">
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalSetPuntage;
