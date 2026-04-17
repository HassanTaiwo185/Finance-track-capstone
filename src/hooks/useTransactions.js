import { useEffect, useState } from 'react'

const STORAGE_KEY = 'finance_transactions'

export default function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loaded, setLoaded] = useState(false)

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setTransactions(JSON.parse(raw))
      }
    } catch (err) {
      console.error('Failed to load transactions', err)
    }
    setLoaded(true)
  }, [])

  // persist ONLY after initial load is done
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch (err) {
      console.error('Failed to save transactions', err)
    }
  }, [transactions, loaded])

  // Add transaction
  function addTransaction(formValues) {
    const newTransaction = {
      id:       crypto.randomUUID(),
      title:    formValues.title,
      type:     formValues.type,
      amount:   parseFloat(formValues.amount),
      tax:      parseFloat(formValues.tax) || 0,
      category: formValues.category,
      date:     formValues.date,
      note:     formValues.note || '',
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  // Update transaction
  function updateTransaction(id, formValues) {
    setTransactions(prev =>
      prev.map(t => t.id === id ? {
        ...t,
        title:    formValues.title,
        type:     formValues.type,
        amount:   parseFloat(formValues.amount),
        tax:      parseFloat(formValues.tax) || 0,
        category: formValues.category,
        date:     formValues.date,
        note:     formValues.note || '',
      } : t)
    )
  }

  // Delete transaction
  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  // Get transaction by ID
  function getTransactionById(id) {
    return transactions.find(t => t.id === id) || null
  }

  // Reset storage
  function resetStorage() {
    setTransactions([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    resetStorage,
  }
}