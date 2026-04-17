import { Link, useParams } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext'

export default function DetailView() {
    const { id } = useParams()
    const { transactions } = useFinance()

    // find the transaction by id
    const transaction = transactions.find(t => t.id === id)

    // check if transaction exists
    if (!transaction) {
        return (
            <>
                <div className="alert alert-danger">Transaction not found</div>
                <Link className="btn btn-sm btn-outline-secondary" to="/list">Back to transactions</Link>
            </>
        )
    }

    return (
        <div>
            <div className="mb-3">
                <Link className="btn btn-sm btn-outline-secondary" to="/list">Back to transactions</Link>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{transaction.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{transaction.category}</h6>
                    <p><strong>Type:</strong> {transaction.type}</p>
                    <p><strong>Amount:</strong> <span className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>{transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}</span></p>
                    <p><strong>Tax:</strong> ${(transaction.tax || 0).toFixed(2)}</p>
                    <p><strong>Date:</strong> {transaction.date}</p>
                    <p>{transaction.note || 'No notes'}</p>
                </div>
                <div className="card-footer">
                    <Link className="btn btn-sm btn-primary" to={`/edit/${transaction.id}`}>Edit</Link>
                </div>
            </div>
        </div>
    )
}