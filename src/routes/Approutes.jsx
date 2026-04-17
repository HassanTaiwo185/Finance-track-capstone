
import { HashRouter, Routes, Route } from 'react-router-dom'
import { FinanceProvider } from '../context/FinanceContext'
import Layout from '../layout/Layout'
import Home from '../views/Home'
import ListView from '../views/ListView'
import DetailView from '../views/DetailView'
import NewEditForm from '../views/NewEditForm'
import NotFound from '../views/NotFound'

export default function AppRoutes() {
  return (
    <FinanceProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="list" element={<ListView />} />
            <Route path="item/:id" element={<DetailView />} />
            <Route path="new" element={<NewEditForm />} />
            <Route path="edit/:id" element={<NewEditForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </FinanceProvider>
  )
}