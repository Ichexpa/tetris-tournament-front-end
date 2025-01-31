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
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import { User } from "lucide-react"
import { Link } from "react-router-dom"

const Ranking = ()=>{
    const [{data,isLoading,isError},doFetchHistory]= useFetch(`${import.meta.env.VITE_API_URL}/tournament/player_ranking`)
    
    useEffect(()=>{
        doFetchHistory({
            method : "GET"
        })
    },[])
    
    return (
        <div className="rounded-lg p-6 bg-zinc-100 w-full">
            <h1 className="text-2xl font-bold mb-4">Ranking de Jugadores</h1>
            {data &&
                <Table>
                    <TableCaption>Ranking global</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Perfil</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((user,index) => (
                        <TableRow key={user.id}>
                            <TableCell >{index+1}</TableCell>
                            <TableCell >{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.score}</TableCell>
                            <TableCell>
                                <Link to={`/profile/${user.id}`}>
                                    <User/>
                                </Link>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </div>

    )
}
export default Ranking