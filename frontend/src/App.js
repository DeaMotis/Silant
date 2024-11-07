import React, { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import serviceContext from './context/Context'
import './App.css'
import './static/styles/variables.css'
import MainPage from './pages/MainPage/MainPage.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import AuthPage from './pages/AuthPage/AuthPage.jsx'
import DetailPage from './pages/DetailPage/DetailPage.jsx'
import AuthError from './pages/AuthError/AuthError.jsx'
import AddMaintenancePage from './pages/AddMaintenancePage/AddMaintenancePage.jsx'
import AddClaimPage from './pages/AddClaimPage/AddClaimPage.jsx'
import AddMachinePage from './pages/AddMachinePage/AddMachinePage.jsx'
import AllCatalogsPage from './pages/AllCatalogsPage/AllCatalogsPage.jsx'
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx'
import ChangeCatalog from './pages/ChangeCatalog/ChangeCatalog.jsx'
import AddCatalogPage from './pages/AddCatalogPage/AddCatalogPage.jsx'
import SuccessPage from './pages/SuccessPage/SuccessPage.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'

function App() {
	const [isAuth, setIsAuth] = useState(false)
	const [pageId, setPageId] = useState(1)

	return (
		<React.Fragment>
			<serviceContext.Provider value={{ isAuth, setIsAuth, pageId, setPageId }}>
				<div className='root-container'>
					<Header />
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='auth' element={<AuthPage />} />
						<Route path='auth-error' element={<ErrorPage />} />
						<Route path='details/:type/:id' element={<DetailPage />} />
						<Route path='add-maintenance' element={<AddMaintenancePage />} />
						<Route path='add-complaint' element={<AddClaimPage />} />
						<Route path='add-car' element={<AddMachinePage />} />
						<Route path='catalogs/' element={<Outlet />}>
							<Route index element={<AllCatalogsPage />} />
							<Route path=':type' element={<Outlet />}>
								<Route index element={<CatalogPage />} />
								<Route path=':id' element={<ChangeCatalog />} />
								<Route path='new' element={<AddCatalogPage />} />
							</Route>
						</Route>
						<Route path='success' element={<SuccessPage />} />
						<Route path='fail' element={<ErrorPage />} />
					</Routes>
					<Footer />
				</div>
			</serviceContext.Provider>
		</React.Fragment>
	)
}

export default App