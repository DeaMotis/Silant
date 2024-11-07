import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import './CatalogPage.css'
import { getAllCatalogs } from '../../api/dataService.js'

const CatalogPage = () => {
	const navigate = useNavigate()
	const { type } = useParams()
	const [data, setData] = useState([])
	const [title, setTitle] = useState([])

	useEffect(() => {
		getAllCatalogs(type, setData, setTitle)
	}, [])

	const handleReturn = () => {
		navigate('..')
	}
	const handleChange = e => {
		navigate(`${e.target.value}`)
	}
	const handleAdd = () => {
		navigate('new', { state: title })
	}

	return (
		<div className='catalog'>
			<h1 className='catalog-title'>Справочник "{title}"</h1>
			<table className='catalog-table'>
				<thead>
					<tr>
						<th>Название</th>
						<th>Описание</th>
					</tr>
				</thead>
				<tbody>
					{data.map(element => {
						return (
							<tr key={element.id}>
								<td>{element.name}</td>
								<td>{`${element.description.slice(0, 100)}...`}</td>
								<td className='catalog-modification-btn-container'>
									<button
										value={element.id}
										onClick={handleChange}
										className='catalog-change-btn'
										type='button'
									>
										Изменить
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<button onClick={handleAdd} className='catalog-add-btn' type='button'>
				Добавить данные
			</button>
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

export default CatalogPage