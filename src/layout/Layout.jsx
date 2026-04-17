import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
    return (
        <div className="container py-3">
            <Navbar />
            <Outlet />
        </div>
    )
}