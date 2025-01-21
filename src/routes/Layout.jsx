import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/Home/sidebar/app-sidebar"
import { Outlet } from "react-router-dom"
const Layout = ()=>{
    return(    
        <SidebarProvider>
        <AppSidebar />
        <main className="w-3/4 mx-auto border-1 border-black p-5">
            <Outlet/>
        </main>
        </SidebarProvider>
    )
}

export default Layout