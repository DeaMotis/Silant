import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailPage.css'
import { getDetails } from '../../api/dataService.js'

const DetailPage = () => {
	const navigate = useNavigate()
	const { type, id } = useParams()
	const [details, setDetails] = useState([])

	useEffect(() => {
		const url = `${type}/${id}`
		getDetails(url, setDetails)
	}, [])

	const handleReturn = () => {
		navigate('/')
	}

	return (
		<div className='details'>
			<h1 className='details-title'>Детальное описание:</h1>
			<h2 className='details-part-name'>{details.verbose_name}</h2>
			<div className='details-name'>{details.name}</div>
			<h2 className='details-description-title'>Подробное описание:</h2>
			<div className='details-description'>{details.description}</div>
			<button
				onClick={handleReturn}
				className='details-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default DetailPage