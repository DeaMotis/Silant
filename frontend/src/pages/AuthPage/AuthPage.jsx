import React, { useContext, useState } from 'react'
import './AuthPage.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/dataService.js'
import serviceContext from '../../context/Context.js'

const AuthPage = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState()
	const [password, setPassword] = useState()
	const { isAuth, setIsAuth } = useContext(serviceContext)

	const loginHandle = e => {
		e.preventDefault()
		login(userName, password, setIsAuth, navigate)
	}

	return (
		<div className='authorization'>
			<h1 className='auth-title'>Страница авторизации</h1>
			<form className='auth-form' name='authForm'>
				<label className='input-label' htmlFor='loginField'>
					Логин клиента / сервисной компании / менеджера
				</label>
				<input
					name='loginField'
					className='input-field'
					type='text'
					placeholder='Введите логин...'
					onChange={e => {
						setUserName(e.target.value)
					}}
				></input>
				<label className='input-label' htmlFor='passwordField'>
					Ваш пароль
				</label>
				<input
					name='passwordField'
					className='input-field'
					type='password'
					placeholder='Введите пароль...'
					onChange={e => {
						setPassword(e.target.value)
					}}
				></input>
				<button onClick={loginHandle} className='login-btn' type='submit'>
					Войти
				</button>
			</form>
		</div>
	)
}

export default AuthPage