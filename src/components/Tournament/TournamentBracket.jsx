import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
  createTheme
} from "@g-loot/react-tournament-brackets";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import ModalSetPuntage from "./ModalSetPuntage";

const TournamentBracket = () =>{
  const [open,setOpen] = useState(false) 
  const [dataMatch,setDatamatch] = useState(null)
  const [dataMatchesModify,setDataMatchesModify]  = useState(null)
  const { id_tournament } = useParams();
  const role = localStorage.getItem("role")
  const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/tournament/brackets/${id_tournament}`)
  const [{data:dataTournament,isLoading:isLoadingTournament,isError:isErrorTorunament},doFetchTournament] = useFetch(`${import.meta.env.VITE_API_URL}/tournament/${id_tournament}`) 
   useEffect(()=>{
    doFetch({
        method : "GET"
    })
    doFetchTournament({
      method :"GET"
    })
   },[])
   useEffect(()=>{
    if(data){
      setDataMatchesModify(data)
    }
   },[data])
   function openModalData(data){
      setDatamatch(data)
      setOpen(true)
   }
   return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="rounded-lg p-6 bg-zinc-100 w-full">
        <h1 className="text-2xl font-bold mb-4">Información del Torneo</h1>
        {dataTournament && (
          <div className="flex flex-col gap-2 text-lg">
            <div><span className="font-medium">Torneo:</span> {dataTournament.name}</div>
            <div><span className="font-medium">Mejor de:</span> {dataTournament.best_of}</div>
            <div><span className="font-medium">Fecha de inicio:</span>{new Date(dataTournament.start_date).toLocaleDateString("es-ES")}</div>
            <div><span className="font-medium">Fecha de finalización:</span>{new Date(dataTournament.end_date).toLocaleDateString("es-ES")}</div>
            <div><span className="font-medium">Puntos :</span> <span className="text-lime-500 font-bold">{dataTournament.total_points} puntos</span></div>
          </div>
        )}
      </div>
  
  {isLoading && <h1>Cargando...</h1>}
  
  {dataMatchesModify && (
    <>
      <SingleEliminationBracket
        theme={GlootTheme}
        matches={dataMatchesModify}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
          <SVGViewer
            width={10000}
            height={5000}
            background="rgb(11, 13, 19)"
            SVGBackground="rgb(11, 13, 19)"
            {...props}
          >
            {children}
          </SVGViewer>
        )}
        {...(role === "organizer" && { onMatchClick: (match) => openModalData(match) })}
        {...(role === "organizer" && { onPartyClick: (match) => console.log(match) })}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <ModalSetPuntage dataMatch={dataMatch} best_of={dataTournament && dataTournament.best_of} tournament_id={id_tournament} setDataTournament={setDataMatchesModify} dataTournament={dataMatchesModify} />
      </Dialog>
    </>
  )}
</div>
   
)
} 
  

const GlootTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#F4F2FE", dark: "#707582" },
  matchBackground: { wonColor: "#2D2D59", lostColor: "#1B1D2D" },
  score: {
    background: {
      wonColor: `#10131C`,
      lostColor: "#10131C"
    },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" }
  },
  border: {
    color: "#292B43",
    highlightedColor: "RGBA(152,82,242,0.4)"
  },
  roundHeader: { backgroundColor: "#3B3F73", fontColor: "#F4F2FE" },
  connectorColor: "#3B3F73",
  connectorColorHighlight: "RGBA(152,82,242,0.4)",
  svgBackground: "#0F121C"
});



export default TournamentBracket