import React, { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import serviceContext from './context/createContext'
import './App.css'
import './static/styles/variables.css'
import MainPage from './pages/MainPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AuthPage from './pages/AuthPage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import AuthErrorPage from './pages/AuthErrorPage.jsx'
import AddMaintenancePage from './pages/AddMaintenancePage.jsx'
import AddComplaintPage from './pages/AddComplaintPage.jsx'
import AddCarPage from './pages/AddCarPage.jsx'
import CatalogsPage from './pages/CatalogsPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ChangeCatalogPage from './pages/ChangeCatalogPage.jsx'
import AddCatalogPage from './pages/AddCatalogPage.jsx'
import PostSuccessPage from './pages/PostSuccessPage.jsx'
import PostFailPage from './pages/PostFailPage.jsx'

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
						<Route path='auth-error' element={<AuthErrorPage />} />
						<Route path='details/:type/:id' element={<DetailPage />} />
						<Route path='add-maintenance' element={<AddMaintenancePage />} />
						<Route path='add-complaint' element={<AddComplaintPage />} />
						<Route path='add-car' element={<AddCarPage />} />
						<Route path='catalogs/' element={<Outlet />}>
							<Route index element={<CatalogsPage />} />
							<Route path=':type' element={<Outlet />}>
								<Route index element={<CatalogPage />} />
								<Route path=':id' element={<ChangeCatalogPage />} />
								<Route path='new' element={<AddCatalogPage />} />
							</Route>
						</Route>
						<Route path='success' element={<PostSuccessPage />} />
						<Route path='fail' element={<PostFailPage />} />
					</Routes>
					<Footer />
				</div>
			</serviceContext.Provider>
		</React.Fragment>
	)
}

export default App