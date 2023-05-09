import { menuSidebar } from "@/Components/url/url";
import { createContext, useContext, useEffect, useState } from "react";

const AuthLayoutContext = createContext({});

export const useAuthLayout = () => {
    return useContext(AuthLayoutContext);
}

export const AuthLayoutProvider = ({ children, active, user }) => {

    const [open, setOpen] = useState('');
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [targetActive, setTargetActive] = useState(false);

    useEffect(() => {
        setTargetActive(active);
    }, [active]);

    const onOpenMenu = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const filterMenu = menuSidebar.filter(menu => {
        if (Array.isArray(menu.role)) {
            return menu.role.includes(user?.level)
        }
        return menu.role.includes(user?.level);
    });

    return (
        <AuthLayoutContext.Provider value={
            {
                setOpen,
                setSubmenuOpen,
                setTargetActive,
                filterMenu,
                open,
                onOpenMenu,
                submenuOpen,
                targetActive,
            }
        }>
            {children}
        </AuthLayoutContext.Provider>
    )
}
