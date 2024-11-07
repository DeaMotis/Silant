import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import './AddCatalogPage.css'
import { catalogValidation } from '../../service/validationService.js'
import { postNewCatalog } from '../../api/dataService.js'

const AddCatalogPage = () => {
	const navigate = useNavigate()
	const { type } = useParams()
	const { state } = useLocation()
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [postData, setPostData] = useState({ name: '', description: '' })

	const handleInputChange = e => {
		const { name, value } = e.target
		setPostData({
			...postData,
			[name]: value,
		})
	}

	const handleCatalogPost = e => {
		e.preventDefault()
		postNewCatalog(userName, password, type, postData, navigate)
	}

	const handleReturn = () => {
		navigate('..')
	}

	return (
		<div className='new-catalog'>
			<h1 className='new-catalog-title'>
				Добавление данных в справочник: {state}
			</h1>
			<form className='new-catalog-form' action=''>
				<label htmlFor='name'>Название</label>
				<input name='name' type='text' onChange={handleInputChange} required />
				<label htmlFor='description'>Описание</label>
				<textarea
					className='catalog-description'
					name='description'
					type='text'
					onChange={handleInputChange}
					required
				/>
				{type === 'service-companies' && (
					<div>
						<label htmlFor='login_nickname'>Никнэйм для авторизации</label>
						<input
							name='login_nickname'
							type='text'
							onChange={handleInputChange}
							required
						/>
					</div>
				)}
				<button
					onClick={handleCatalogPost}
					className='submit-catalog-btn'
					type='submit'
					disabled={!catalogValidation(type, postData)}
				>
					Создать запись
				</button>
			</form>
			<button
				onClick={handleReturn}
				className='catalog-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default AddCatalogPage