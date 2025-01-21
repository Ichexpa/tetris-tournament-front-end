import {CalendarDays, Check,Trophy, User } from "lucide-react"
import ModalInfoTorneo from "./ModalInfoTorneo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"

function TournamentCard({id,name,capacity,start_date,end_date,status,total_points,organizer_id }) {
  
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
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
        <Button className="bg-lime-600 hover:bg-lime-500 hover:outline-none">
          <Check /> Inscribirse
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TournamentCard