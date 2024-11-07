import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SuccessPage.css'

const SuccessPage = () => {
	const navigate = useNavigate()
	const handleReturn = () => {
		navigate('/')
	}

	return (
		<div className='post-success-container'>
			<h1 className='post-success-title'>
				Успешное добавление данных в систему
			</h1>
			<button
				onClick={handleReturn}
				className='post-success-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default SuccessPage