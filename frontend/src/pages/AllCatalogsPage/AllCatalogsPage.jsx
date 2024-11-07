import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AllCatalogsPage.css'

const AllCatalogsPage = () => {
	const navigate = useNavigate()

	const handleReturn = () => {
		navigate('/')
	}

	return (
		<div className='catalogs'>
			<h1 className='catalogs-title'>
				Доступные для редактирования справочники
			</h1>
			<nav className='catalogs-list'>
				<Link to={'vehicles'}>Модели техники</Link>
				<Link to={'engines'}>Модели двигателя</Link>
				<Link to={'transmissions'}>Модели трансмиссии</Link>
				<Link to={'driving-axles'}>Модели ведущего моста</Link>
				<Link to={'steering-axles'}>Модели управляемого моста</Link>
				<Link to={'maintenance-types'}>Виды ТО</Link>
				<Link to={'breakages'}>Узлы отказа</Link>
				<Link to={'repair-ways'}>Способы восстановления</Link>
				<Link to={'service-companies'}>Сервисные компании</Link>
			</nav>
			<button
				onClick={handleReturn}
				className='catalogs-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default AllCatalogsPage