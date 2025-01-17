import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserRegister({
  className,
  ...props
}) {
  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 mt-2 text-center">
        <h1 className="text-2xl font-bold">Registro de usuario</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Registrate para ingresar al sitio
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input id="username" type="text" placeholder="Nombre de usuario" required />
        </div>        
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input id="email" type="email" placeholder="ejemplo@.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input id="password" type="password" placeholder="Contraseña" required />
        </div>
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
      </div>
    </form>)
  );
}