import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { useState,useRef, useEffect } from "react"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import useFetch from "../../hooks/useFetch"
import { useToast } from "../../hooks/use-toast"

const ModalAddTorneo =()=>{
    const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/tournament/create`)
    const {toast} = useToast()
    const name = useRef()
    const [capacityPlayer,setCapacity] = useState()
    const [formatTournament,setFormatTournament] = useState()
    const totalPoints = useRef()
    const [date,setDate]  =  useState({
    from: new Date(),
    to: addDays(new Date(), 1),}
    )  
    function createTournament(){
        const newTournamentData= {
            name : name.current.value,
            capacity : capacityPlayer,
            total_points : totalPoints.current.value,
            start_date : format(date.from,"yyyy-MM-dd"),
            end_date  : format(date.to,"yyyy-MM-dd"),
            organizer_id : localStorage.getItem("id_user"),
            best_of : formatTournament
        }
        console.log(newTournamentData)
        doFetch({
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(newTournamentData)
        })
    }
    useEffect(()=>{
        if(data){
            setTimeout(() => {
            toast({
                title: "Torneo agregado con éxito",
                description: `${name.current.value} agregado `,
                })
            },1)
            }
    },[data])
    return(
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear un nuevo Torneo</DialogTitle>
            </DialogHeader>
                <div className="grid grid-cols-4 gap-4 py-4">
                <div className="col-span-2 flex flex-col">
                    <Label id="name" className="flex-1 text-left text-xs text-slate-500">
                    Nombre      
                    </Label>            
                    <Input ref={name} id="name" name="name" placeholer="Nombre del torneo" className="col-span-2 mt-2"/>
                </div>   
                <div className="col-span-2 flex flex-col">    
                    <Label id="capacity" className="flex-1 text-left text-xs text-slate-500">
                    Formato      
                    </Label>    
                    <Select onValueChange={(value)=>setFormatTournament(value)}>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Formato del toreno" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                            <SelectLabel>Formato</SelectLabel>
                            <SelectItem value="3">Mejor de 3</SelectItem>
                            <SelectItem value="5">Mejor de 5</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>             
                <div className="col-span-2 flex flex-col">
                <Label id="capacity" className="flex-1 text-left text-xs text-slate-500">
                   Capacidad      
                </Label>
                <Select onValueChange={(value)=>setCapacity(value)}>
                    <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Capacidad del torneo" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                        <SelectLabel>Cantidad de jugadores</SelectLabel>
                        <SelectItem value="8">8 Jugadores</SelectItem>
                        <SelectItem value="16">16 Jugadores</SelectItem>
                        <SelectItem value="32">32 Jugadores</SelectItem>
                        <SelectItem value="64">64 Jugadores</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/*  */}
                </div>
                <div className="col-span-2 flex flex-col">
                    <Label id="points" className="flex-1 text-left text-xs text-slate-500">
                    Puntos Totales      
                    </Label>
                    <Input ref={totalPoints} id="points" name="points" min='0' type="number" className="mt-2"/>
                </div>
                <div className="col-span-4 flex flex-col">
                    <Label id="init_date" className="flex-1 text-left text-xs text-slate-500">
                    Fecha de Inicio      
                    </Label>
                    <Popover >
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "mt-2 col-span-4 font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "dd/MM/yyyy")} -{" "}
                                {format(date.to, "dd/MM/yyyy")}
                                </>
                            ) : (
                                format(date.from, "dd/MM/yyyy")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                    </Popover>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={createTournament}>Guardar Torneo</Button>
            </DialogFooter>
        </DialogContent>
    )
}
export default ModalAddTorneo