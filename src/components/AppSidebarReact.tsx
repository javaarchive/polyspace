
import { House, MessageSquareText } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarProvider, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

interface Props {
    children?: React.ReactNode;
}

export default function AppSidebarReact(props: Props) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h1 className="text-2xl font-bold text-sidebar-foreground/70">Polyspace</h1>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarItem name="Home" path="/">
                                    <House />
                                </SidebarItem>
                                <SidebarItem name="Chat" path="/chat">
                                    <MessageSquareText />
                                </SidebarItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            {props.children}
        </SidebarProvider>
    );
}