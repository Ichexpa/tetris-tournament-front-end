import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/Home/sidebar/app-sidebar"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
const Layout = ()=>{
    return(    
        <SidebarProvider>
        <AppSidebar />
        <main className="w-3/4 mx-auto border-1 border-black p-5">
            <Outlet/>
            <Toaster />
        </main>
        </SidebarProvider>
    )
}

export default Layout