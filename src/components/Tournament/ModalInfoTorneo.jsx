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
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

const ModalInfoTorneo = ({nombreTorneo,capacidad,tournament_id}) =>{
    const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/tournament/player_inscribed/${tournament_id}`)
    useEffect(()=>{
      doFetch({
            method:"GET"
        })
    },[])
    return(
   <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center" >Torneo {nombreTorneo}</DialogTitle>
          <DialogDescription>
            <div>
              Inscriptos: {data && data.length}
            </div>
            <div>
              Capacidad del torneo : {capacidad}
            </div>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-100 rounded-md border">
            <Table>
                <TableCaption>{data && data.length === 0 ? "No hay jugadores registrados" : "Jugadores inscriptos al torneo."}</TableCaption>
                <TableHeader className="bg-teal-800">
                    <TableRow >
                      <TableHead className="text-white">Jugador</TableHead>
                      <TableHead className="text-white">Puntuacion</TableHead>
                      <TableHead className="text-white text-center ">Email</TableHead>
                      <TableHead className="text-white">Ver perfil</TableHead>
                    </TableRow>
                </TableHeader> 
                {data &&           
                    <TableBody>                      
                        {data.map((players)=>(
                            <TableRow key={players.id}>
                                <TableCell className="font-medium">{players.first_name} {players.last_name}</TableCell>
                                <TableCell className="text-emerald-500">{players.score}</TableCell>
                                <TableCell className="text-bold">{players.email}</TableCell>
                                <TableCell className="text-right cursor-pointer"><User/></TableCell>
                            </TableRow>
                        ))}                        
                    </TableBody> 
                }           
            </Table>
        </ScrollArea>
        <DialogFooter>
          
        </DialogFooter>
    </DialogContent>  
    )
}

export default ModalInfoTorneo