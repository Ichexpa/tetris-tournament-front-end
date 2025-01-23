import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useFetch from "../../hooks/useFetch"
import { useEffect,useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"
import { use } from "react"
export function LoginForm({ className,...props}) {
  const email = useRef()
  const password = useRef()  
  const loginCredentials = useAuth("actions") 
  const [{data: dataLogin ,isLoading: isLoadingLogin, isError : isErrorLogin},doFetchLogin] = useFetch(`${import.meta.env.VITE_API_URL}/auth/login`)
  const redirect = useNavigate()
  const [emailCheck,setEmailCheck] = useState(false)
  const [passwordCheck,setPasswordCheck] = useState(false)
  const [invalidCredentials,setinvalidCredentials] = useState(false)
  function validateFields(){
    let valid_fields = true    
    if(!email.current.value){
      setEmailCheck(true)
      setTimeout(()=>setEmailCheck(false),2000)
      valid_fields  = false
    }
    if((!password.current.value) || (password.current.value.length < 8 || password.current.value.length > 16)){
      setPasswordCheck(true)
      setTimeout(()=>setPasswordCheck(false),2000)
      valid_fields  = false
    }
    return valid_fields
  }

  const login = (e) =>{    
    e.preventDefault();
    if(validateFields()){
      const dataUser = new FormData()
      dataUser.append('email',email.current.value)
      dataUser.append('password',password.current.value)
      doFetchLogin({
        method: 'POST',
        body:  dataUser
      })
    }    
  }
  useEffect(()=>{

  },)

  useEffect(()=>{
    if(dataLogin){
      if(dataLogin.token){
        loginCredentials.login(dataLogin.token,dataLogin.role)
        redirect("/")
      }
    }
    if(isErrorLogin){
      setinvalidCredentials(true)
      setTimeout(()=>setinvalidCredentials(false),2000)
    }
  },[dataLogin,isErrorLogin])

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center mt-2 gap-2 text-center">
        <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tus credenciales para entrar al sitio
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email de usuario</Label>
          <Input ref={email} id="email" type="email" placeholder="Nombre de usuario" required />
          {emailCheck && <p className="text-red-400 text-xs">Este campo no puede estar vacío</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input ref={password} id="password" type="password" placeholder="Contraseña" required />
          {passwordCheck && <p className="text-red-400 text-xs">La contraseña debe tener una logitud entre 8 y 16 caracteres</p>}
        </div>
        <Button onClick={login} className="w-full">
          Ingresar
        </Button>
        {invalidCredentials && <p className="text-red-400 text-sm text-center">La contraseña o el email no son validos</p>}
      </div>
    </form>)
  );
}
