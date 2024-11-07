import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './SearchBlock.css'
import { getFilteredMachines } from '../../api/dataService.js'

const SearchBlock = () => {
	const ref = useRef()
	const [vehicleNumber, setVehicleNumber] = useState('')
	const [filteredData, setFilteredData] = useState()
	const [resultMessage, setResultMessage] = useState(
		'Укажите номер запрашиваемой техники...'
	)

	const searchHandle = async e => {
		e.preventDefault()
		await getFilteredMachines(vehicleNumber, setFilteredData)
		if (!filteredData) {
			setResultMessage('Данные об указанной технике отсутствуют')
		}
		ref.current.value = ''
		setVehicleNumber('')
	}

	return (
		<div className='search-panel'>
			<h1 className='search-panel-title'>
				Проверьте комплектацию и технические характеристики техники Силант
			</h1>
			<form className='search-form' name='searchForm'>
				<label className='input-label' htmlFor='loginField'>
					Заводской номер погрузчика
				</label>
				<input
					ref={ref}
					name='searchField'
					className='search-field'
					type='text'
					placeholder='Введите заводской номер...'
					onChange={e => {
						setVehicleNumber(e.target.value)
					}}
				></input>
				<button onClick={searchHandle} className='search-btn' type='submit'>
					Поиск
				</button>
			</form>
			<h2 className='result-title'>Результат поиска:</h2>
			<h2 className='result-content'>
				Информация о комплектации и технических характеристиках Вашей модели
			</h2>
			<table className='search-result-table'>
				<thead>
					<tr>
						<th>Зав. № машины</th>
						<th>Модель техники</th>
						<th>Модель двигателя</th>
						<th>Зав. № двигателя</th>
						<th>Модель трансмиссии</th>
						<th>Зав. № трансмиссии</th>
						<th>Модель ведущего моста</th>
						<th>Зав. № ведущего моста</th>
						<th>Модель управляемого моста</th>
						<th>Зав. № управляемого моста</th>
					</tr>
				</thead>
				<tbody>
					{filteredData ? (
						<tr>
							<td>{filteredData.machine_id}</td>
							<td>
								<Link to={`details/vehicles/${filteredData.vehicle_model}`}>
									{filteredData.vehicle_model_info.name}
								</Link>
							</td>
							<td>
								<Link to={`details/engines/${filteredData.engine_model}`}>
									{filteredData.engine_model_info.name}
								</Link>
							</td>
							<td>{filteredData.engine_id}</td>
							<td>
								<Link
									to={`details/transmissions/${filteredData.transmission_model}`}
								>
									{filteredData.transmission_model_info.name}
								</Link>
							</td>
							<td>{filteredData.transmission_id}</td>
							<td>
								<Link
									to={`details/driving-axles/${filteredData.driving_axle_model}`}
								>
									{filteredData.driving_axle_model_info.name}
								</Link>
							</td>
							<td>{filteredData.driving_axle_id}</td>
							<td>
								<Link
									to={`details/steering-axles/${filteredData.steering_axle_model}`}
								>
									{filteredData.steering_axle_model_info.name}
								</Link>
							</td>
							<td>{filteredData.steering_axle_id}</td>
						</tr>
					) : (
						<tr className='no-result'>
							<td colSpan={10}>{resultMessage}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default SearchBlock