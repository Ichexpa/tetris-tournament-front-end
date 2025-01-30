import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ModalConfirmStartTournament = ({nombre_torneo,fecha_inicio,fecha_fin,setConfirm}) =>{
    return(
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{nombre_torneo}</DialogTitle>
          <DialogDescription>
            Fecha de inicio {fecha_inicio} - Finalización {fecha_fin}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={()=>setConfirm(true)} variant="outline">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    )
}
export default ModalConfirmStartTournament