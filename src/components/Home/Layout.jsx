import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar/app-sidebar"

const Layout = ({children})=>{
    return(    
        <SidebarProvider>
        <AppSidebar />
        <main className="w-3/4 mx-auto border-1 border-black">
            {children}
        </main>
        </SidebarProvider>
    )
}

export default Layout