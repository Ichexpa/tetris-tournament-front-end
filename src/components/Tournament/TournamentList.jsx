import TournamentCard from "./TournamentCard"
import ModalAddTorneo from "./ModalAddTorneo"
import { Button } from "../ui/button"
import { Cross } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

const TournamentList = ()=>{
    const role = localStorage.getItem("role")
    const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/tournament/`)
    useEffect(()=>{
        doFetch({
            method:"GET"
        })
    },[])

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
            <div className="flex flex-wrap justify-evenly gap-y-4 ">
                {data &&
                    data.map((torneo)=>(
                        <TournamentCard key={torneo.id}
                        name={torneo.name}
                        capacity={torneo.capacity}
                        organizer_id={torneo.organizer_id}
                        total_points={torneo.total_points}
                        status={torneo.status}
                        id = {torneo.id}
                        start_date={torneo.start_date}
                        end_date={torneo.end_date}
                        />
                    )
                    )
                }
                {isLoading &&
                    <h1>Cargando...</h1>
                }        
            </div>
        </>
    )
}

export default TournamentList