import React from 'react'
import './AuthError.css'
import { useNavigate } from 'react-router-dom'

const AuthError = () => {
	const navigate = useNavigate()

	const handleReturn = () => {
		navigate('/auth')
	}

	return (
		<div className='auth-error'>
			<h1 className='auth-error-title'>Ошибка авторизации.</h1>
			<div className='auth-error-content'>
				Вы ввели неправильно пароль или логин. Пожалуйста повторите ввод.
			</div>
			<button className='auth-error-btn' onClick={handleReturn}>
				Вернуться
			</button>
		</div>
	)
}

export default AuthError