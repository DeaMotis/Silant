import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
	const navigate = useNavigate()
	const handleReturn = () => {
		navigate('/')
	}

	return (
		<div className='post-fail-container'>
			<h1 className='post-fail-title'>Ошибка добавления данных в систему</h1>
			<button
				onClick={handleReturn}
				className='post-fail-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default ErrorPage