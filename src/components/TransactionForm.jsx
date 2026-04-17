import useForm from '../hooks/useForm'

const initialValues = {
    title:    '',
    type:     'expense',
    amount:   '',
    category: '',
    date:     new Date().toISOString().slice(0, 10),
    note:     '',
}

// validation function to validate all fields
function validate(values) {
    const errors = {}

    if (!values.title.trim()) errors.title = 'Title is required'

    if (!values.amount) {
        errors.amount = 'Amount is required'
    } else if (isNaN(values.amount) || Number(values.amount) <= 0) {
        errors.amount = 'Amount must be a positive number greater than 0'
    }

    if (!values.category) errors.category = 'Category is required'

    if (!values.date) errors.date = 'Date is required'

    return errors
}

export default function TransactionForm({ onSubmit, onCancel, defaultValues }) {

    const { values, errors, touched, handleChange, handleBlur, validateAll, reset } = useForm(defaultValues || initialValues, validate)

    function handleSubmit(e) {
        e.preventDefault()
        const errs = validateAll()
        if (Object.values(errs).every(v => !v)) {
            onSubmit({ ...values, amount: parseFloat(values.amount) })
            reset()
        }
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit} noValidate>

             {/* Type */}
            <div className="col-md-6">
                <label className="form-label">Type</label>
                <select className="form-select" name="type" value={values.type} onChange={handleChange} onBlur={handleBlur}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

           {/* Title */}
            <div className="col-md-6">
                <label className="form-label">Title</label>
                <input type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`} />
                {touched.title && errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>



           {/* Amount */}
            <div className="col-md-6">
                <label className="form-label">Amount (CAD)</label>
                <input type="text" name="amount" value={values.amount} onChange={handleChange} onBlur={handleBlur} min="0" step="0.01" className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`} />
                <div className="form-text">Format: 12.34</div>
                {touched.amount && errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>


              {/* Category */}
            <div className="col-md-6">
                <label className="form-label">Category</label>
                <select name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}>
                    <option value="">Choose...</option>
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="salary">Salary</option>
                    <option value="transport">Transport</option>
                    <option value="health">Health</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                </select>
                {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>


             {/* Date */}
            <div className="col-md-6">
                <label className="form-label">Date</label>
                <input type="date" name="date" value={values.date} onChange={handleChange} onBlur={handleBlur} className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`} />
                {touched.date && errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>


              {/* Note */}
            <div className="col-12">
                <label className="form-label">Note (optional)</label>
                <textarea name="note" value={values.note} onChange={handleChange} rows="2" className="form-control" />
            </div>

            <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary">{defaultValues ? 'Update' : 'Save'}</button>
                {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
            </div>

        </form>
    )
}