import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ModalConfirmStartTournament = ({nombre_torneo,fecha_inicio,fecha_fin,setConfirm,capacidad,best_of}) =>{
    return(
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Torneo {nombre_torneo}</DialogTitle>
          <DialogDescription>
            <div className="flex-col gap-2 text-xsm">
              <div><span className="font-bold text-slate-600 t">Fecha de inicio: </span>{fecha_inicio}</div>
              <div><span className="font-bold text-slate-600 t">Fecha de finalización: </span>{fecha_fin}</div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex-col text-md">
              <div><span className="font-semibold text-slate-700">Capacidad: </span>{capacidad}</div>
              <div><span className="font-semibold text-slate-700">Mejor de : </span>{best_of}</div>
        </div>
        <DialogFooter>
          <Button onClick={()=>setConfirm(true)} variant="outline">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    )
}
export default ModalConfirmStartTournament