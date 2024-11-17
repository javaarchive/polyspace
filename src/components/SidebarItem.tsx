import { propsToFilename } from "astro/assets/utils";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

interface Props {
    name: string;
    path: string;
    children?: React.ReactNode;
}

export const SidebarItem = ({name, path, children}: Props) => {
    return (
        <SidebarMenuItem key={path}>
            <SidebarMenuButton asChild>
                <a href={path}>
                    {children}
                    <span>{name}</span>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default SidebarItem;