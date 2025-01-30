import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import { Cpu, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom";
import profile_img from "../../assets/perfil_ex.jpg"

const Profile = () =>{
    const { id_player } = useParams();
    console.log(id_player)
    const [{data,isLoading,isError},doFetchHistory]= useFetch(`${import.meta.env.VITE_API_URL}/tournament/player_history/${id_player}`)
    const [{data: dataPlayer,isLoading:isLoadingPlayer,isError:isErrorPlayer},doFetchPlayer]= useFetch(`${import.meta.env.VITE_API_URL}/users/players/by_id/${id_player}`)
    useEffect(()=>{
        doFetchHistory({
            method: "GET"
        })
        doFetchPlayer({
            method: "GET"
        })
    },[])
    return (
        <>
        <div className="relative h-[200px] w-100 bg-gradient-to-r from-gray-100 to-gray-900">
            <div className="h-full w-full"></div>
            <div className="absolute left-1/2 -translate-x-1/2 overflow-hidden bottom-0 translate-y-1/2  h-[180px] w-[180px] rounded-full bg-white">
                <img src={profile_img} alt="Perfil" className=" h-full w-full object-cover" />
            </div>
        </div>
        <div className="flex bg-zinc-100 justify-around flex-row mt-[100px] relative w-100">
            <div className="rounded-lg p-6 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Información del Usuario</h1>
                {dataPlayer  &&
                <div className="flex flex-col gap-2 text-lg">                    
                    <div><span className="font-medium">Nombre:</span> {dataPlayer.first_name}</div>
                    <div><span className="font-medium">Apellido:</span> {dataPlayer.last_name}</div>
                    <hr className="my-2" />
                    <div><span className="font-medium">Email:</span> {dataPlayer.email}</div>
                    <div><span className="font-medium">Puntos:</span> <span className="text-lime-500 font-bold">{dataPlayer.score} puntos</span></div>
                </div>
                }
            </div>
            <div>
                <h1 className="text-2xl font-bold mt-6 mb-2">Historial</h1>
                {data &&
                   <Table>
                    <TableCaption>Historial de torneos jugados</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Torneo</TableHead>
                        <TableHead>Capacidad</TableHead>
                        <TableHead>Formato</TableHead>
                        <TableHead>Round Maximo</TableHead>
                        <TableHead>Fecha de inicio</TableHead>
                        <TableHead>Fecha de Finalizacion</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Ver Torneo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((tournament) => (
                        <TableRow key={tournament.tournament_id}>
                            <TableCell >{tournament.tournament_name}</TableCell>
                            <TableCell>{tournament.capacity}</TableCell>
                            <TableCell>{tournament.best_of}</TableCell>
                            <TableCell>{tournament.max_round}</TableCell>
                            <TableCell>{new Date(tournament.start_date).toLocaleDateString("es-ES")}</TableCell>
                            <TableCell>{new Date(tournament.end_date).toLocaleDateString("es-ES")}</TableCell>
                            <TableCell>{tournament.status}</TableCell>
                            <TableCell>
                                <Link to={`/tournament/bracket/${tournament.tournament_id}`}>
                                <Trophy/>
                                </Link>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>}
            </div>
        </div>     
    </>
    )
}
export default Profile