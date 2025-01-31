import { Home, Medal, Search,Trophy, User } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  /* {
    title: "Search",
    url: "#",
    icon: Search,
  }, */
]
const itemsTournament = [
  {
    title: "Torneos disponibles",
    url: "/",
    icon: Trophy,
  },
  {
    title: "Ranking de jugadores",
    url: "/ranking",
    icon: User,
  },/* 
  {
    title: "Resultados de torneos",
    url: "/results",
    icon: Medal,
  } */
]

export function AppSidebar() {
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
                            <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </Link>
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
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </Link>
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

