import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUniversalData, changeCatalog } from '../../api/dataService.js'
import './ChangeCatalog.css'

const ChangeCatalog = () => {
	const navigate = useNavigate()
	const { type, id } = useParams()
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [instanceData, setInstanceData] = useState({})
	const [instanceTitle, setInstanceTitle] = useState()
	const [postData, setPostData] = useState()

	useEffect(() => {
		getUniversalData(type, id, setInstanceData, setInstanceTitle)
	}, [])

	const handleInputChange = e => {
		const { name, value } = e.target
		setPostData({
			...postData,
			[name]: value,
		})
		setInstanceData({
			...postData,
			[name]: value,
		})
	}

	const handleCatalogPost = e => {
		e.preventDefault()
		changeCatalog(userName, password, type, id, postData, navigate)
	}

	const handleReturn = () => {
		navigate('..')
	}

	return (
		<div className='change-catalog'>
			<h1 className='change-catalog-title'>
				Изменение данных в справочнике: {instanceTitle}
			</h1>
			{type === 'service-companies' ? (
				<form className='change-catalog-form'>
					<label htmlFor='name'>Название</label>
					<input
						name='name'
						type='text'
						value={instanceData.name}
						onChange={handleInputChange}
						required
					/>
					<label htmlFor='description'>Описание</label>
					<textarea
						className='catalog-description'
						name='description'
						type='text'
						value={instanceData.description}
						onChange={handleInputChange}
						required
					/>
					<label htmlFor='login_nickname'>Никнэйм для авторизации</label>
					<input
						name='login_nickname'
						value={instanceData.login_nickname}
						type='text'
						onChange={handleInputChange}
						required
					/>
					<button
						onClick={handleCatalogPost}
						className='submit-catalog-btn'
						type='submit'
					>
						Создать запись
					</button>
				</form>
			) : (
				<form className='change-catalog-form'>
					<label htmlFor='name'>Название</label>
					<input
						name='name'
						type='text'
						value={instanceData.name}
						onChange={handleInputChange}
						required
					/>
					<label htmlFor='description'>Описание</label>
					<textarea
						className='catalog-description'
						name='description'
						type='text'
						value={instanceData.description}
						onChange={handleInputChange}
						required
					/>
					<button
						onClick={handleCatalogPost}
						className='submit-catalog-btn'
						type='submit'
					>
						Создать запись
					</button>
				</form>
			)}
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

export default ChangeCatalog