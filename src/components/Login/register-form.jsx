import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef,useState,useEffect } from "react"
import { useToast } from "../../hooks/use-toast"
import useFetch from "../../hooks/useFetch"
export function UserRegister({className,...props}) {
  const {toast} = useToast()
  const username = useRef()
  const lastname = useRef()
  const email = useRef()  
  const password = useRef()
  const password_confirm = useRef()
  const [errors,setErrors] = useState({username:"",lastname:"",email:"",password:"",password_confirm:"",equals_passwords:""})
  const [{data,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/auth/register`)
  function validateFields(){
    const errors = {}
    const password_value = password.current.value
    const password_confirm_value = password_confirm.current.value
    const valid_passwords = { passwordOne : true , passwordTwo: true}
    if(!username.current.value){
      errors.username = "El nombre es obligatiorio"
    }
     if(!lastname.current.value){
      errors.lastname = "El apellido es obligatiorio"
    }
    if (!email.current.value) {
      errors.email = "El email es obligatorio.";
    } else if (!email.current.value.includes("@")) {
      errors.email = "Por favor ingresa un email válido.";
    }
    if(!password_value){
      valid_passwords.passwordOne = false
      errors.password = "Ingresa una contraseña."
    }
    else if (password_value.length > 16 || password_value.length < 8) {
      errors.password = "La contraseña debe tener entre 8 y 16 caracteres.";
      valid_passwords.passwordOne = false
    }
    if(!password_confirm_value){
      valid_passwords.passwordTwo = false
      errors.password_confirm = "Ingresa una contraseña."
    }
    else if (password_confirm_value.length > 16 || password_confirm_value.length < 8) {
      errors.password_confirm = "La contraseña debe tener entre 8 y 16 caracteres.";
      valid_passwords.passwordTwo = false
    }
    if((valid_passwords.passwordOne && valid_passwords.passwordTwo)){
       if(password_value !== password_confirm_value){        
        errors.equals_passwords = "Las contraseñas no coinciden"
       }
    }
    setErrors(errors)
    setTimeout(()=>{
      setErrors({username:"",lastname:"",email:"",password:"",password_confirm:"",equals_passwords:""})
    },2000)

    return Object.keys(errors).length === 0
  }
  function registerUser(e){
    e.preventDefault()
    if(validateFields()){
      const userData = new FormData()
      userData.append('first_name',username.current.value)
      userData.append('last_name',lastname.current.value)
      userData.append('email',email.current.value)
      userData.append('password', password.current.value);

      doFetch({
        method : "POST",
        body : userData
      })
    }
  }
  useEffect(()=>{
    if(data){
      console.log("se registro con exito")
      setTimeout(() => {
        toast({
        title: "Registro éxitoso",
        description: `${username.current.value} inicia sesión con tus nuevas credenciales`,
        })
      },1)
    }
  },[data])
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
          <Label htmlFor="username">Nombre</Label>
          <Input ref={username} id="username" type="text" placeholder="Nombre de usuario" required />
          {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastname">Apellido</Label>
          <Input ref={lastname} id="lastname" type="text" placeholder="Apellido de usuario" required />
          {errors.lastname && <p className="text-red-400 text-xs">{errors.lastname}</p>}
        </div>         
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input ref={email} required id="email" type="email" placeholder="ejemplo@.com" />
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input ref={password} id="password" type="password" placeholder="Contraseña" required />
          {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="passwordConfirm">Confirmar contraseña</Label>
          </div>
          <Input ref={password_confirm} id="passwordConfirm" type="password" placeholder="Confirma la contraseña" required />
          {errors.password_confirm && <p className="text-red-400 text-xs">{errors.password_confirm}</p>}
        </div>
        {errors.equals_passwords && <p className="text-red-400 text-xs">{errors.equals_passwords}</p>}
        <Button onClick={registerUser} className="w-full">
          Registrarse
        </Button>
      </div>
    </form>)
  );
}