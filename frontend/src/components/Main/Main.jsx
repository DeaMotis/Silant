import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Main.css'
import {
	getAllCars,
	getClientsCars,
	getServiceCompaniesCars,
	getVehicleList,
	getEngineList,
	getTransmissionList,
	getDrivingAxleList,
	getSteeringAxleList,
} from '../api/dataService'
import serviceContext from '../context/Context.js'
import { initialCarsSortWay } from '../utils/constants.js'

const MainBlock = ({ group }) => {
	const navigate = useNavigate()
	const vehicleRef = useRef(null)
	const engineRef = useRef(null)
	const transmissionRef = useRef(null)
	const drivingAxleRef = useRef(null)
	const steeringAxleRef = useRef(null)
	const [currentData, setCurrentData] = useState([])
	const [allData, setAllData] = useState([])
	const [allVehicles, setAllVehicles] = useState([])
	const [allEngines, setAllEngines] = useState([])
	const [allDrivingAxles, setAllDrivingAxles] = useState([])
	const [allSteeringAxles, setAllSteeringAxles] = useState([])
	const [allTransmissions, setAllTransmissions] = useState([])
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [userId, setuserId] = useState(localStorage.getItem('id'))
	const [sortWay, setSortWay] = useState(initialCarsSortWay)
	const { pageId, setPageId } = useContext(serviceContext)

	useEffect(() => {
		if (group === '3') {
			getAllCars(setAllData, setCurrentData)
		} else if (group === '1') {
			getClientsCars(userName, password, userId, setAllData, setCurrentData)
		} else if (group === '2') {
			getServiceCompaniesCars(userName, password, setAllData, setCurrentData)
		}
		getVehicleList(setAllVehicles)
		getEngineList(setAllEngines)
		getTransmissionList(setAllTransmissions)
		getDrivingAxleList(setAllDrivingAxles)
		getSteeringAxleList(setAllSteeringAxles)
		setPageId(1)
	}, [])

	const handleAddCar = () => {
		navigate('/add-car')
	}

	const handleVehicleFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.vehicle_model_info.name == e.target.value
			})
			setCurrentData(result)
			engineRef.current.selected = true
			transmissionRef.current.selected = true
			drivingAxleRef.current.selected = true
			steeringAxleRef.current.selected = true
			setSortWay(initialCarsSortWay)
		}
	}

	const handleEngineFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.engine_model_info.name == e.target.value
			})
			setCurrentData(result)
			vehicleRef.current.selected = true
			transmissionRef.current.selected = true
			drivingAxleRef.current.selected = true
			steeringAxleRef.current.selected = true
			setSortWay(initialCarsSortWay)
		}
	}

	const handleTransmissionFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.transmission_model_info.name == e.target.value
			})
			setCurrentData(result)
			vehicleRef.current.selected = true
			engineRef.current.selected = true
			drivingAxleRef.current.selected = true
			steeringAxleRef.current.selected = true
			setSortWay(initialCarsSortWay)
		}
	}

	const handleDrivingAxleFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.driving_axle_model_info.name == e.target.value
			})
			setCurrentData(result)
			vehicleRef.current.selected = true
			engineRef.current.selected = true
			transmissionRef.current.selected = true
			steeringAxleRef.current.selected = true
			setSortWay(initialCarsSortWay)
		}
	}

	const handleSteeringAxleFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.steering_axle_model_info.name == e.target.value
			})
			setCurrentData(result)
			vehicleRef.current.selected = true
			engineRef.current.selected = true
			transmissionRef.current.selected = true
			drivingAxleRef.current.selected = true
			setSortWay(initialCarsSortWay)
		}
	}

	const handleDetailedSort = e => {
		const field = e.target.value
		const result = [...currentData]
		if (sortWay[field] === '▽' || sortWay[field] === '-') {
			setSortWay({ ...initialCarsSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialCarsSortWay, [field]: '▽' })
		}
		result.sort((a, b) => {
			if (a[field]['name'] < b[field]['name']) {
				return sortWay[field] == '△' ? 1 : -1
			}
			if (a[field]['name'] > b[field]['name']) {
				return sortWay[field] == '△' ? -1 : 1
			}
			return 0
		})
		setCurrentData(result)
	}

	const handleSimpleSort = e => {
		const field = e.target.value
		const result = [...currentData]
		if (sortWay[field] === '▽' || sortWay[field] === '-') {
			setSortWay({ ...initialCarsSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialCarsSortWay, [field]: '▽' })
		}
		result.sort((a, b) => {
			if (a[field] < b[field]) {
				return sortWay[field] == '△' ? 1 : -1
			}
			if (a[field] > b[field]) {
				return sortWay[field] == '△' ? -1 : 1
			}
			return 0
		})
		setCurrentData(result)
	}

	return (
		<div className='main-info-container'>
			<table className='main-result-table'>
				<thead>
					<tr>
						<th>Модель техники</th>
						<th>Зав. № машины</th>
						<th>Модель двигателя</th>
						<th>Зав. № двигателя</th>
						<th>Модель трансмиссии</th>
						<th>Зав. № трансмиссии</th>
						<th>Модель ведущего моста</th>
						<th>Зав. № ведущего моста</th>
						<th>Модель управляемого моста</th>
						<th>Зав. № управляемого моста</th>
						<th>Дата отгрузки с завода</th>
						<th>Покупатель</th>
						<th>Грузополучатель</th>
						<th>Адрес поставки</th>
						<th>Комплектация</th>
						<th>Сервисная компания</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<button onClick={handleDetailedSort} value='vehicle_model_info'>
								{sortWay['vehicle_model_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='car_id'>
								{sortWay['car_id']}
							</button>
						</td>
						<td>
							<button onClick={handleDetailedSort} value='engine_model_info'>
								{sortWay['engine_model_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='engine_id'>
								{sortWay['engine_id']}
							</button>
						</td>
						<td>
							<button
								onClick={handleDetailedSort}
								value='transmission_model_info'
							>
								{sortWay['transmission_model_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='transmission_id'>
								{sortWay['transmission_id']}
							</button>
						</td>
						<td>
							<button
								onClick={handleDetailedSort}
								value='driving_axle_model_info'
							>
								{sortWay['driving_axle_model_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='driving_axle_id'>
								{sortWay['driving_axle_id']}
							</button>
						</td>
						<td>
							<button
								onClick={handleDetailedSort}
								value='steering_axle_model_info'
							>
								{sortWay['steering_axle_model_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='steering_axle_id'>
								{sortWay['steering_axle_id']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='discharge_date'>
								{sortWay['discharge_date']}
							</button>
						</td>
						<td className='empty-cell'></td>
						<td>
							<button onClick={handleSimpleSort} value='receiver'>
								{sortWay['receiver']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='delivery_address'>
								{sortWay['delivery_address']}
							</button>
						</td>
						<td className='empty-cell'></td>
						<td>
							<button onClick={handleDetailedSort} value='service_company_info'>
								{sortWay['service_company_info']}
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<select
								className='main-data-filter'
								onChange={handleVehicleFilter}
							>
								<option ref={vehicleRef} value={0}>
									Все
								</option>
								{allVehicles.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td className='empty-cell'></td>
						<td>
							<select
								className='main-data-filter'
								onChange={handleEngineFilter}
							>
								<option ref={engineRef} value={0}>
									Все
								</option>
								{allEngines.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td className='empty-cell'></td>
						<td>
							<select
								className='main-data-filter'
								onChange={handleTransmissionFilter}
							>
								<option ref={transmissionRef} value={0}>
									Все
								</option>
								{allTransmissions.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td className='empty-cell'></td>
						<td>
							<select
								className='main-data-filter'
								onChange={handleDrivingAxleFilter}
							>
								<option ref={drivingAxleRef} value={0}>
									Все
								</option>
								{allDrivingAxles.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td className='empty-cell'></td>
						<td>
							<select
								className='main-data-filter'
								onChange={handleSteeringAxleFilter}
							>
								<option ref={steeringAxleRef} value={0}>
									Все
								</option>
								{allSteeringAxles.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td colSpan={12} className='empty-cell'></td>
					</tr>
					{currentData.map(element => {
						return (
							<tr key={element.id}>
								<td>
									<Link to={`details/vehicles/${element.vehicle_model}`}>
										{element.vehicle_model_info.name}
									</Link>
								</td>
								<td>{element.car_id}</td>
								<td>
									<Link to={`details/engines/${element.engine_model}`}>
										{element.engine_model_info.name}
									</Link>
								</td>
								<td>{element.engine_id}</td>
								<td>
									<Link
										to={`details/transmissions/${element.transmission_model}`}
									>
										{element.transmission_model_info.name}
									</Link>
								</td>
								<td>{element.transmission_id}</td>
								<td>
									<Link
										to={`details/driving-axles/${element.driving_axle_model}`}
									>
										{element.driving_axle_model_info.name}
									</Link>
								</td>
								<td>{element.driving_axle_id}</td>
								<td>
									<Link
										to={`details/steering-axles/${element.steering_axle_model}`}
									>
										{element.steering_axle_model_info.name}
									</Link>
								</td>
								<td>{element.steering_axle_id}</td>
								<td>{element.discharge_date}</td>
								<td>{element.client_info.username}</td>
								<td>{element.receiver}</td>
								<td>{element.delivery_address}</td>
								<td>{element.vehicle_configuration}</td>
								<td>
									<Link
										to={`details/service-companies/${element.service_company}`}
									>
										{element.service_company_info.name}
									</Link>
								</td>
							</tr>
						)
					})}
				</tbody>
				<tfoot>
					<tr>
						<th style={{ width: '250px' }}>Модель техники</th>
						<th>Зав. № машины</th>
						<th>Модель двигателя</th>
						<th>Зав. № двигателя</th>
						<th>Модель трансмиссии</th>
						<th>Зав. № трансмиссии</th>
						<th>Модель ведущего моста</th>
						<th>Зав. № ведущего моста</th>
						<th>Модель управляемого моста</th>
						<th>Зав. № управляемого моста</th>
						<th>Дата отгрузки с завода</th>
						<th>Покупатель</th>
						<th>Грузополучатель</th>
						<th>Адрес поставки</th>
						<th>Комплектация</th>
						<th>Сервисная компания</th>
					</tr>
				</tfoot>
			</table>
			{group === '3' && (
				<button onClick={handleAddCar} className='add-car-btn'>
					Добавить данные о погрузчиках
				</button>
			)}
		</div>
	)
}

export default MainBlock