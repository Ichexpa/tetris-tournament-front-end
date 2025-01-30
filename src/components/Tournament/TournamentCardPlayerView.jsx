import {CalendarDays, Check,ReceiptText,Trophy, User, UserCheck } from "lucide-react"
import ModalInfoTorneo from "./ModalInfoTorneo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react"
import ModalConfirmSign from "./ModalConfirmSign"
import { useToast } from "../../hooks/use-toast"

function TournamentCardPlayerView({id_tournament,name,capacity,start_date,end_date,status,total_points,organizer_id,best_of,inscribed }) {
  const [confirm,setConfirm] = useState(false)
  const [disableButton,setDisableButton]  = useState(false)
  const id_user = parseInt(localStorage.getItem("id_user"))
  const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/players-tournament/sign`)
  const {toast} = useToast()

  useEffect(()=>{
    if(confirm){
        doFetch({
            method : "POST",
            headers : {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({
              player_id :  id_user,
              tournament_id : id_tournament
            })
        })
     }
  },[confirm])
  useEffect(()=>{
    if(data){
      setDisableButton(true) 
      setTimeout(() => {
        toast({
        title: "Registrado con éxito al torneo.",
        description: `${name} ${total_points} puntos`,
        })
      },1)
    }
    
  },[data,toast])
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <div className="text-xsm flex items-center">
          <Badge className={"bg-neutral-500"}>Mejor de {best_of}</Badge>
          <div className="ml-auto">
            {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-lime-600" /> */}
              <p className="text-md font-medium leading-none text-lime-800">
                    {status}
              </p>
          </div>
        </div>
        <div className="flex items-center p-2">
            <Trophy className="text-lg mr-3"/>
            <CardTitle className="text-lg truncate">{name}</CardTitle>
            <span className="text-lime-600 ml-auto font-bold truncate">{total_points} puntos</span>            
        </div>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className=" flex items-center space-x-1 rounded-md border p-4">
          <User />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Participantes
            </p>
            <p className="text-sm text-muted-foreground">
               <span className="text-lime-600 font-bold">15</span>/
               <span className="text-orange-700 font-bold">{capacity}</span> inscriptos
            </p>
          </div>         
        </div>
        <div className=" flex items-center space-x-1 p-3">
          <CalendarDays />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Fecha
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(start_date),"dd/MM/yyyy")} al {format(new Date(end_date),"dd/MM/yyyy")} 
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                <User /> Ver Participantes
                </Button>
            </DialogTrigger>
        <ModalInfoTorneo nombreTorneo={name} cantidadParticipantes={15}/>
        </Dialog>
        {!inscribed ? 
        <Dialog> 
          {!disableButton ?
            <DialogTrigger>            
                <Button className="bg-lime-600 hover:bg-lime-500 hover:outline-none">
                  <Check /> Inscribirse
                </Button>
              <ModalConfirmSign nombre_torneo={name} fecha_inicio={format(new Date(start_date),"dd/MM/yyyy")}  fecha_fin={format(new Date(end_date),"dd/MM/yyyy")}  setConfirm={setConfirm} />
            </DialogTrigger>:            
                <Button className="bg-gray-500" disabled>
                  <UserCheck /> Inscrito
                </Button> 
            }
        </Dialog> :
        <Dialog> 
            <DialogTrigger>            
                <Button className="bg-gray-400 hover:bg-gray-500 hover:outline-none">
                  <ReceiptText/> Detalles
                </Button>              
            </DialogTrigger>  
        </Dialog>        
        }
        
        {role == "organizer" &&
        <Dialog> 
          <DialogTrigger asChild>
            <Button className="bg-dark-600 hover:bg-dark-500 hover:outline-none">
              <Check /> Editar
            </Button>
          </DialogTrigger>
        </Dialog>
        }
      </CardFooter>
    </Card>
  )
}

export default TournamentCardPlayerView