import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h4 m-0">Finance Tracker</h1>
            <nav className="d-flex gap-2">
                <Link className="btn btn-sm btn-outline-secondary" to="/">Home</Link>
                <Link className="btn btn-sm btn-outline-secondary" to="/list">Transactions</Link>
                <Link className="btn btn-sm btn-primary" to="/new">Add New</Link>
            </nav>
        </header>
    )
}