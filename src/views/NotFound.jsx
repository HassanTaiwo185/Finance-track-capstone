import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <div className="alert alert-danger">404 - Page not found</div>
            <Link className="btn btn-sm btn-outline-secondary" to="/">← Back to Home</Link>
        </div>
    )
}