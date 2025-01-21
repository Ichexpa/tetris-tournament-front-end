import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFetch from "../../hooks/useFetch"
import { useEffect,useRef} from "react"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"
export function LoginForm({ className,...props}) {
  const username = useRef()
  const password = useRef()  
  const loginCredentials = useAuth("actions") 
  const [{data: dataLogin ,isLoading: isLoadingLogin, isError : isErrorLogin},doFetchLogin] = useFetch(`${import.meta.env.VITE_API_URL}/auth/login`)
  const redirect = useNavigate()
  const login = (e) =>{
    e.preventDefault();
    const dataUser = new FormData()
    dataUser.append('email',username.current.value)
    dataUser.append('password',password.current.value)
    doFetchLogin({
      method: 'POST',
      body:  dataUser
    })
  }

  useEffect(()=>{
    if(dataLogin){
      if(dataLogin.token){
        loginCredentials.login(dataLogin.token,dataLogin.role)
        redirect("/")
      }
    }
  },[dataLogin])

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center mt-2 gap-2 text-center">
        <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tus credenciales para ingresar al sitio
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input ref={username} id="username" type="text" placeholder="Nombre de usuario" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input ref={password} id="password" type="password" placeholder="Contraseña" required />
        </div>
        <Button onClick={login} className="w-full">
          Ingresar
        </Button>
      </div>
    </form>)
  );
}
