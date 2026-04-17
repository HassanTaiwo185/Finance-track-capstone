import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext'
import TransactionCard from '../components/TransactionCard'

export default function ListView() {
    const { transactions, deleteTransaction } = useFinance()
    const navigate  = useNavigate()
    const location  = useLocation()

    // show success alert if navigated here after a save or update
    const [showSuccess, setShowSuccess] = useState(location.state?.success || false)

    const [query, setQuery]       = useState('')
    const [category, setCategory] = useState('all')
    const [type, setType]         = useState('all')
    const [sortBy, setSortBy]     = useState('date-desc')

    // check if any filter is active
    const filtersActive = query !== '' || category !== 'all' || type !== 'all'

    // reset all filters to default
    function clearFilters() {
        setQuery('')
        setCategory('all')
        setType('all')
        setSortBy('date-desc')
    }

    // hide success message after 10 seconds
    useEffect(() => {
        if (!showSuccess) return
        const timer = setTimeout(() => setShowSuccess(false), 10000)
        return () => clearTimeout(timer)
    }, [showSuccess])

    // filter transactions based on search, category, and type
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch   = t.title.toLowerCase().includes(query.toLowerCase())
        const matchesCategory = category === 'all' || t.category === category
        const matchesType     = type === 'all' || t.type === type
        return matchesSearch && matchesCategory && matchesType
    })

    // sort transactions based on selected criteria
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortBy === 'date-desc')   return new Date(b.date) - new Date(a.date)
        if (sortBy === 'date-asc')    return new Date(a.date) - new Date(b.date)
        if (sortBy === 'amount-desc') return b.amount - a.amount
        if (sortBy === 'amount-asc')  return a.amount - b.amount
        return 0
    })

    return (
        <div>
            {/* success feedback */}
            {showSuccess && (
                <div className="alert alert-success" role="status">Transaction saved successfully</div>
            )}

            {/* search and filters */}
            <div className="d-flex gap-2 align-items-center mb-3">
                <input type="text" placeholder="Search..." className="form-control form-control-sm" value={query} onChange={e => setQuery(e.target.value)} />

                <select className="form-select form-select-sm" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="salary">Salary</option>
                    <option value="transport">Transport</option>
                    <option value="health">Health</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                </select>

                <select className="form-select form-select-sm" value={type} onChange={e => setType(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select className="form-select form-select-sm" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="date-desc">Newest</option>
                    <option value="date-asc">Oldest</option>
                    <option value="amount-desc">Amount High-Low</option>
                    <option value="amount-asc">Amount Low-High</option>
                </select>
            </div>

            {/* empty states */}
            {transactions.length === 0 && (
                <div className="alert alert-secondary">No transactions yet</div>
            )}

            {transactions.length > 0 && sortedTransactions.length === 0 && (
                <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                    <span>No results found</span>
                    {filtersActive && (
                        <button className="btn btn-sm btn-outline-secondary" onClick={clearFilters}>
                            Clear filters
                        </button>
                    )}
                </div>
            )}

            {/* list */}
            <div className="row row-cols-1 row-cols-md-2 g-3">
                {sortedTransactions.map(t => (
                    <div className="col" key={t.id}>
                        <TransactionCard
                            transaction={t}
                            onView={() => navigate(`/item/${t.id}`)}
                            onEdit={() => navigate(`/edit/${t.id}`)}
                            onDelete={() => deleteTransaction(t.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}