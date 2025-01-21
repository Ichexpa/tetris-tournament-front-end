import TournamentCard from "./TournamentCard"
import ModalAddTorneo from "./ModalAddTorneo"
import { Button } from "../ui/button"
import { Cross } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const TournamentList = ()=>{
    return(
        <>
            
            <div className="flex justify-end mb-4">
            <Dialog>
                <DialogTrigger>
                    <Button className="bg-lime-600 hover:bg-lime-400"><Cross/> Agregar Torneo</Button>
                </DialogTrigger>
                <ModalAddTorneo/>
            </Dialog>
            </div>   
            <div className="flex flex-wrap justify-evenly gap-y-4 ">
                <TournamentCard/>
                <TournamentCard/>
                <TournamentCard/>     
                <TournamentCard/>        
                <TournamentCard/>      
                <TournamentCard/>          
            </div>
        </>
    )
}

export default TournamentList