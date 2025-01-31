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
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"

const ModalSetPuntage = ({ dataMatch,best_of, dataTournament, setDataTournament , tournament_id }) => {

  const limiteScore = best_of ==3 ? 2 : 3;
  const [scoreP1, setScoreP1] = useState("");
  const [scoreP2, setScoreP2] = useState("");
  const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/match/update_score`)
  const [checkWinner,setCheckWinner] = useState(false)
  const handleScoreChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= limiteScore)) {
      setter(value);
    }
  };
  const changeResults = () => {
    console.log(dataMatch.match)
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
    update_matchs_results()
    setScoreP1("")
    setScoreP2("")
  };
  function update_matchs_results(){
    const dataUpdateMatch = {
      id: dataMatch.match.id,
      score_p1 : parseInt(scoreP1),
      score_p2 : parseInt(scoreP2),
      player1_id : dataMatch.match.participants[0].id,
      player2_id : dataMatch.match.participants[1].id,
      tournament_id : parseInt(tournament_id), 
      next_match_id : dataMatch.match.nextMatchId
    }
    doFetch({
            method : "PATCH",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(dataUpdateMatch)
        })    
  }
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
  useEffect(()=>{
    if(data){
      console.log("Actualizado con exito")
    }
  },[data])
  useEffect(()=>{
    if(dataMatch){      
      setScoreP1(dataMatch.match.participants[0].resultText)
      setScoreP2(dataMatch.match.participants[1].resultText)
      const result = dataMatch.match.participants.find((participante)=>participante.isWinner)
      if(result){
        setCheckWinner(true)
      }
      else{
        setCheckWinner(false)
      }
    }
  },[dataMatch])
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-md text-black-200">{dataMatch && `Match Ronda ${dataMatch.match.tournamentRoundText}`}</DialogTitle>
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
        {
        checkWinner ? (
          <h1 className="w-full text-green-800 text-center">Ya hay un ganador</h1>
        ) : (
          <Button onClick={changeResults} className="bg-lime-600 text-white" variant="secondary">
            Confirmar
          </Button>
        )
      }
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalSetPuntage;
