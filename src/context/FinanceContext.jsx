
import { createContext, useContext } from 'react'
import useTransactions from '../hooks/useTransactions'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    resetStorage
  } = useTransactions()

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction, getTransactionById, resetStorage }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) throw new Error('useFinance must be used inside FinanceProvider')
  return context
}