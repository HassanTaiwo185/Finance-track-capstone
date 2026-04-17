import { Link } from 'react-router-dom'

export default function Home() {
    return (
      <div>
            <h2 className="h4 mb-1">Welcome back</h2>
            <p className="text-muted mb-3">Manage your income and expenses</p>
            <div className="d-flex gap-2">
                <Link className="btn btn-sm btn-outline-secondary" to="/list">Transactions</Link>
                <Link className="btn btn-sm btn-primary" to="/new">+ Add Transaction</Link>
            </div>
        </div>
    )
}