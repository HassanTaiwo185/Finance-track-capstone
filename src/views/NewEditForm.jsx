import { useNavigate, useParams } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext'
import TransactionForm from '../components/TransactionForm'

export default function NewEditForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    // get transactions and actions from context
    const { transactions, addTransaction, updateTransaction } = useFinance()

    // if editing, find existing transaction
    const existing = id ? (transactions.find(t => t.id === id) ?? null) : null

    // if editing but id not found, show not found message
    if (id && !existing) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">Transaction not found.</div>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/list')}>Back to transactions</button>
            </div>
        )
    }

    // handle form submission (edit or add)
    function onSubmit(values) {
        if (id) {
            updateTransaction(id, values)
        } else {
            addTransaction(values)
        }
        navigate('/list', { state: { success: true } })
    }

    return (
        <div className="container py-4">
            <h2 className="h5 mb-3">{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
            <TransactionForm defaultValues={id ? existing : null} onSubmit={onSubmit} onCancel={() => navigate('/list')} />
        </div>
    )
}