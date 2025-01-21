import {
  ChevronsUpDown,
  LogOut,
  User,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import { useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
export function NavUser() {

  const { isMobile } = useSidebar()
  const loginOptions = useAuth("actions")
  const token = localStorage.getItem("authToken")
  const role = localStorage.getItem("role")
  const [{data,isLoading,isError},doFetch]  = useFetch(`${import.meta.env.VITE_API_URL}/auth/validate`)
  useEffect(()=>{
    doFetch({
      method: "GET",
      headers: {
                Authorization: `Bearer ${token}`,
      },
    })
  },[])
  useEffect(()=>{
    if(data){
      if(data.id){
        loginOptions.login(token,role,data.id)
        console.log("ID del organizador"  + data.id)
      }
    }
  },[data])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {data &&
              <>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/shadcn.jpg"alt={`${data.name}`} />
                  <AvatarFallback className="rounded-lg">{data.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${data.name}`}</span>
                  <span className="truncate text-xs">{data.email}</span>
                </div>
              </>}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            { data &&
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/shadcn.jpg" alt={`${data.name}`} />
                  <AvatarFallback className="rounded-lg">{data.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${data.name}`} </span>
                  <span className="truncate text-xs">{data.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/profile"}>              
              <DropdownMenuItem className = "cursor-pointer">                
                  <User />
                  Mi cuenta                
              </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>loginOptions.logout()} className = "cursor-pointer">
              <LogOut />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
