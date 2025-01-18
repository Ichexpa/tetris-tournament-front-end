import { Button } from "@/components/ui/button"
import {User} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const ModalInfoTorneo = ({nombreTorneo,cantidadParticipantes}) =>{
    const players = [
    { username: "SpeedyTetris", puntuation: 1500, ranking: 1 },
    { username: "BlockMaster", puntuation: 1450, ranking: 2 },
    { username: "FallingWizard", puntuation: 1400, ranking: 3 },
    { username: "TetraKing", puntuation: 1350, ranking: 4 },
    { username: "Stackinator", puntuation: 1300, ranking: 5 },
    { username: "PixelDrop", puntuation: 1250, ranking: 6 },
    { username: "SwiftStacker", puntuation: 1200, ranking: 7 },
    { username: "CubeCrafter", puntuation: 1150, ranking: 8 },
    { username: "GridGuru", puntuation: 1100, ranking: 9 },
    { username: "ShapeShifter", puntuation: 1050, ranking: 10 },
    { username: "LineClearer", puntuation: 1000, ranking: 11 },
    { username: "BlockStorm", puntuation: 950, ranking: 12 },
    { username: "TetroTitan", puntuation: 900, ranking: 13 },
    { username: "StackLord", puntuation: 850, ranking: 14 },
    { username: "PuzzleMaster", puntuation: 800, ranking: 15 },
    ];

    return(
   <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Torneo {nombreTorneo} Pro</DialogTitle>{/* 
          <DialogDescription>
            Make changes to your profile here.{nombreTorneo} Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <ScrollArea className="h-72 w-100 rounded-md border">
            <Table>
                <TableCaption>Jugadores inscriptos al torneo.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Jugador</TableHead>
                    <TableHead>Puntuacion</TableHead>
                    <TableHead>Ranking</TableHead>
                    <TableHead className="text-right">Ver perfil</TableHead>
                    </TableRow>
                </TableHeader>            
                    <TableBody>
                        {players.map((players)=>(
                            <TableRow key={players.username}>
                                <TableCell className="font-medium">{players.username}</TableCell>
                                <TableCell className="text-emerald-500">{players.puntuation}</TableCell>
                                <TableCell>{players.ranking}</TableCell>
                                <TableCell className="text-right cursor-pointer"><User/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>            
            </Table>
        </ScrollArea>
        <DialogFooter>
          
        </DialogFooter>
    </DialogContent>  
    )
}

export default ModalInfoTorneo