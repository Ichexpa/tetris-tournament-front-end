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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]


function TournamentCard({ className, ...props }) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <div className="flex items-center p-2">
            <Trophy className="text-lg mr-3"/>
            <CardTitle className="text-lg">Puzzle Pro</CardTitle>
            <span className="text-lime-600 ml-auto">1500 puntos</span>            
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className=" flex items-center space-x-1 rounded-md border p-4">
          <User />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Participantes
            </p>
            <p className="text-sm text-muted-foreground">
               <span className="text-lime-600 font-bold">15</span>/
               <span className="text-orange-700 font-bold">16</span> inscriptos
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
              25-01-24 al 11-02-24
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
        <ModalInfoTorneo nombreTorneo={"Puzzle"} cantidadParticipantes={15}/>
        </Dialog>
        <Button className="bg-lime-600 hover:bg-lime-500 hover:outline-none">
          <Check /> Inscribirse
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TournamentCard