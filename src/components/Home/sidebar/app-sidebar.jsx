import { Calendar, Home, Inbox, Medal, Search, Settings, Trophy, User } from "lucide-react"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
]
const itemsTournament = [
  {
    title: "Torneos disponibles",
    url: "#",
    icon: Trophy,
  },
  {
    title: "Ranking de jugadores",
    url: "#",
    icon: User,
  },
  {
    title: "Torneos finalizados",
    url: "#",
    icon: Medal,
  }
]

export function AppSidebar() {
    
  //let user = {name:"Mauricio",email:"mauro@gmail.com",avatar:"ejemplo@gmail.com"}
  return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Home</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                <SidebarGroupLabel>Tetris</SidebarGroupLabel>
                    <SidebarMenu>
                    {itemsTournament.map((item) => (
                        <SidebarMenuItem key={"hola"}>
                        <SidebarMenuButton asChild>
                            <a href={"das"}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
  )
}

