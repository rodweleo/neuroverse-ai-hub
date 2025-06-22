import { Outlet } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export default function MainChatPage() {
    return (
        <div className="flex items-start w-full h-screen">
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Chats</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <section className="w-full">
                <Outlet />
            </section>
        </div>
    )
}