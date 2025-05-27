
import { House, MessageSquareText, Rss, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarProvider, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import PagePathContext from "./pagectx";

interface Props {
    children?: React.ReactNode;
    path?: string;
}

export default function AppSidebarReact(props: Props) {
    // console.log("props",props);
    return (
        <PagePathContext.Provider value={props.path || null}>
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
                                    <SidebarItem name="Ingest" path="/ingest">
                                        <Rss />
                                    </SidebarItem>
                                    <SidebarItem name="Chat" path="/chat">
                                        <MessageSquareText />
                                    </SidebarItem>
                                    <SidebarItem name="Settings" path="/settings">
                                        <Settings />
                                    </SidebarItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter />
                </Sidebar>
                {props.children}
            </SidebarProvider>
        </PagePathContext.Provider>
    );
}