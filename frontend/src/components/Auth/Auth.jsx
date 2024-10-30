import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Auth.css'
import serviceContext from '../context/Context.js'

const Auth = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { isAuth, setIsAuth } = useContext(serviceContext)
	const [currentLocation, setCurrentLocation] = useState(location.pathname)

	useEffect(() => {
		setCurrentLocation(location.pathname)
	}, [location, currentLocation, isAuth])

	const loginHandle = () => {
		navigate('auth')
	}

	const logoutHandle = () => {
		localStorage.clear()
		setIsAuth(false)
		navigate('/')
	}

	return (
		<div>
			{isAuth ? (
				<div className='header-user-info'>
					<button
						onClick={logoutHandle}
						className='auth-btn'
						hidden={currentLocation == '/auth-error' ? true : false}
					>
						Выйти
					</button>
				</div>
			) : (
				<div className='user-info'>
					<button
						onClick={loginHandle}
						className={'auth-btn'}
						hidden={
							currentLocation == '/auth' || currentLocation == '/auth-error'
								? true
								: false
						}
					>
						Войти
					</button>
				</div>
			)}
		</div>
	)
}

export default Auth