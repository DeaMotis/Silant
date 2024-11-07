import React, { useEffect, useContext } from 'react'
import './MainPage.css'
import InfoBlock from '../../components/InfoBlock/InfoBlock.jsx'
import SearchBlock from '../../components/SearchBlock/SearchBlock.jsx'
import resultContext from '../../context/Context'
import { useLocation } from 'react-router-dom'

function MainPage() {
	const { isAuth, setIsAuth } = useContext(resultContext)

	useEffect(() => {
		setIsAuth(localStorage.getItem('user'))
	}, [isAuth])

	return (
		<main className='main-page'>
			{isAuth ? <InfoBlock /> : <SearchBlock />}
		</main>
	)
}

export default MainPage