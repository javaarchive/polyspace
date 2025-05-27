import { useContext, useMemo } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import PagePathContext from "./pagectx";

interface Props {
    name: string;
    path: string;
    children?: React.ReactNode;
}

export const SidebarItem = ({name, path, children}: Props) => {

    const currentPagePath = useContext(PagePathContext);
    const isActive = useMemo(() => {
        if (!currentPagePath) return false;
        if(path == "/"){
            return currentPagePath === null || currentPagePath === "/";
        }
        return currentPagePath.startsWith(path);
    }, [currentPagePath, path]);

    return (
        <SidebarMenuItem key={path}>
            <SidebarMenuButton isActive={isActive} asChild>
                <a href={path}>
                    {children}
                    <span>{name}</span>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default SidebarItem;