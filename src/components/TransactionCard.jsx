export default function TransactionCard({ transaction, onView, onEdit, onDelete }) {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{transaction.title}</h5>
                <span className="badge bg-secondary mb-2">{transaction.category}</span>
                <div className={`fw-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
                <div className="text-muted">{transaction.type}</div>
                <div className="text-muted">{transaction.date}</div>
                {transaction.note && <div className="text-muted">{transaction.note}</div>}
            </div>
            <div className="card-footer d-flex justify-content-end gap-2">
                <button className="btn btn-secondary btn-sm" onClick={() => onView()}>View</button>
                <button className="btn btn-primary btn-sm" onClick={() => onEdit()}>Edit</button>
               <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Delete this transaction?')) onDelete() }}>Delete</button>
            </div>
        </div>
    )
}