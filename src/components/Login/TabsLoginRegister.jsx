import {LoginForm} from  "./login-form.jsx"
import { UserRegister } from "./register-form.jsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const TabsLoginRegister=()=>{
  return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="Inciar Sesion">Iniciar Sesion</TabsTrigger>
                <TabsTrigger value="Registrarse">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="Inciar Sesion">
                <LoginForm/>
            </TabsContent>
            <TabsContent value="Registrarse">
                <UserRegister/>
            </TabsContent>
        </Tabs>
        )
}
export default TabsLoginRegister
