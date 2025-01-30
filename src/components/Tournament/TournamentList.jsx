import TournamentCard from "./TournamentCard"
import ModalAddTorneo from "./ModalAddTorneo"
import { Button } from "../ui/button"
import { Cross } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react"
import TournamentCardOrganizerView from "./TournamentsCardOrganizerView"
import TournamentCardPlayerView from "./TournamentCardPlayerView"
const TournamentList = ()=>{
    const [inscribed,setInscribed] = useState(false)
    const role = localStorage.getItem("role")
    const user_id = localStorage.getItem("id_user")
    const [{data,isLoading,isError},doFetch] = useFetch(role === "organizer"?
                                `${import.meta.env.VITE_API_URL}/tournament/`:
                            `${import.meta.env.VITE_API_URL}/tournament?user_id=${user_id}&inscribed=${inscribed}`)
    useEffect(()=>{
        doFetch({
            method:"GET"
        })
    },[inscribed])

    return(
        <>            
            <div className="flex justify-end mb-4">
            {role=="organizer" &&
            <Dialog>
                <DialogTrigger>
                    <Button className="bg-lime-600 hover:bg-lime-400"><Cross/> Agregar Torneo</Button>
                </DialogTrigger>
                <ModalAddTorneo/>
            </Dialog>
            }
            </div>
            {role == "player" &&
            <div className="mb-4 flex content-center font-semibold">
                Mis inscripciones
                <Switch className="ml-2" checked={inscribed} onCheckedChange={()=>setInscribed(!inscribed)}></Switch>
            </div>   
            }
            <div className="flex flex-wrap justify-evenly gap-y-4 ">
                {data && data.map((torneo) => (
                        role === "organizer" ? (
                            <TournamentCardOrganizerView 
                            key={torneo.id}
                            name={torneo.name}
                            capacity={torneo.capacity}
                            organizer_id={torneo.organizer_id}
                            total_points={torneo.total_points}
                            status={torneo.status}
                            id_tournament={torneo.id}
                            start_date={torneo.start_date}
                            end_date={torneo.end_date}
                            best_of={torneo.best_of}
                            inscribed={inscribed}
                            />
                        ) : role === "player" ? (
                            <TournamentCardPlayerView 
                            key={torneo.id}
                            name={torneo.name}
                            capacity={torneo.capacity}
                            organizer_id={torneo.organizer_id}
                            total_points={torneo.total_points}
                            status={torneo.status}
                            id_tournament={torneo.id}
                            start_date={torneo.start_date}
                            end_date={torneo.end_date}
                            best_of={torneo.best_of}
                            inscribed={inscribed}
                            />
                        ) : null
                        ))}
                {isLoading &&
                    <h1>Cargando...</h1>
                }        
            </div>
        </>
    )
}

export default TournamentList