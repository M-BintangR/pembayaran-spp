import Navbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'
import { AuthLayoutProvider, useAuthLayout } from '@/contexts/AuthLayoutContext'
import { useRef } from 'react'

const AuthLayout = ({ children, active, user }) => {

    const sidebarRef = useRef();

    const {
        setOpen,
        setSubmenuOpen,
        setTargetActive,
        filterMenu,
        open,
        onOpenMenu,
        submenuOpen,
        targetActive,
    } = useAuthLayout();


    return (
        <AuthLayoutProvider active={active} user={user}>
            <Navbar onOpenMenu={onOpenMenu} sidebarRef={sidebarRef} user={user} />
            <Sidebar
                setTargetActive={setTargetActive}
                setSubmenuOpen={setSubmenuOpen}
                targetActive={targetActive}
                submenuOpen={submenuOpen}
                filterMenu={filterMenu}
                setOpen={setOpen}
                ref={sidebarRef}
                active={active}
                open={open}
                user={user}
            >
                {children}
            </Sidebar>
        </AuthLayoutProvider>
    )
}

export default AuthLayout
