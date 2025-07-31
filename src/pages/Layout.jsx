import { Outlet } from "react-router-dom/dist"
import { Navbar } from "../components/Navbar"

export const Layout = () => {
    return (
        <>
            <Navbar />
                <Outlet />
        </>
    )
}