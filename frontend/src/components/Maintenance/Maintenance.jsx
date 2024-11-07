import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Maintenance.css'
import {
	getAllMachines,
	getClientsMachines,
	getServiceCompaniesMachines,
	getAllMaintenance,
	getClientsMaintenance,
	getServiceCompaniesMaintenance,
	getMaintenanceTypes,
	getAllServiceCompanies,
} from '../../api/dataService.js'
import serviceContext from '../../context/Context.js'
import { initialMaintenanceSortWay } from '../../utils/constants.js'

const Maintenance = ({ group }) => {
	const navigate = useNavigate()
	const carRef = useRef(null)
	const serviceCompanyRef = useRef(null)
	const maintenanceTypesRef = useRef(null)
	const [currentData, setCurrentData] = useState([])
	const [allData, setAllData] = useState([])
	const [allMachines, setAllMachines] = useState([])
	const [allMaintenanceTypes, setAllMaintenanceTypes] = useState([])
	const [allServiceCompanies, setAllServiceCompanies] = useState([])
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [userId, setuserId] = useState(localStorage.getItem('id'))
	const [sortWay, setSortWay] = useState(initialMaintenanceSortWay)
	const { pageId, setPageId } = useContext(serviceContext)

	useEffect(() => {
		if (group === '3') {
			getAllMaintenance(setAllData, setCurrentData)
		} else if (group === '1') {
			getClientsMaintenance(
				userName,
				password,
				userId,
				setAllData,
				setCurrentData
			)
		} else if (group === '2') {
			getServiceCompaniesMaintenance(
				userName,
				password,
				setAllData,
				setCurrentData
			)
		}
		if (group === '3') {
			getAllMachines(setAllMachines)
		} else if (group === '1') {
			getClientsMachines(userName, password, userId, setAllMachines)
		} else if (group === '2') {
			getServiceCompaniesMachines(userName, password, setAllMachines)
		}
		getMaintenanceTypes(setAllMaintenanceTypes)
		getAllServiceCompanies(setAllServiceCompanies)
		setPageId(2)
	}, [])

	const handleAddMaintenance = () => {
		navigate('add-maintenance')
	}

	const handleMachineFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.car_id == e.target.value
			})
			setCurrentData(result)
		}
		maintenanceTypesRef.current.selected = true
		if (group !== '2') {
			serviceCompanyRef.current.selected = true
		}
	}

	const handleMaintenanceTypeFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.maintenance_type_info.name == e.target.value
			})
			setCurrentData(result)
		}
		carRef.current.selected = true
		if (group !== '2') {
			serviceCompanyRef.current.selected = true
		}
	}

	const handleServiceCompanyFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.service_company_info.name == e.target.value
			})
			setCurrentData(result)
		}
		carRef.current.selected = true
		maintenanceTypesRef.current.selected = true
	}

	const handleDetailedSort = e => {
		const field = e.target.value
		const result = [...currentData]
		if (sortWay[field] === '▽' || sortWay[field] === '-') {
			setSortWay({ ...initialMaintenanceSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialMaintenanceSortWay, [field]: '▽' })
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
			setSortWay({ ...initialMaintenanceSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialMaintenanceSortWay, [field]: '▽' })
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
		<div className='maintenance-info-container'>
			<table className='maintenance-result-table'>
				<thead>
					<tr>
						<th>Зав. № машины</th>
						<th>Вид ТО</th>
						<th>Дата проведения ТО</th>
						<th>Наработка, м/час</th>
						<th>№ заказ-наряда</th>
						<th>дата заказ-наряда</th>
						<th>Организация, проводившая ТО</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<button onClick={handleSimpleSort} value='machine_id_details'>
								{sortWay['machine_id_details']}
							</button>
						</td>
						<td>
							<button
								onClick={handleDetailedSort}
								value='maintenance_type_info'
							>
								{sortWay['maintenance_type_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='maintenance_date'>
								{sortWay['maintenance_date']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='running_time'>
								{sortWay['running_time']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='order_id'>
								{sortWay['order_id']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='order_date'>
								{sortWay['order_date']}
							</button>
						</td>
						<td>
							<button onClick={handleDetailedSort} value='service_company_info'>
								{sortWay['service_company_info']}
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<select
								className='maintenance-data-filter'
								onChange={handleMachineFilter}
							>
								<option ref={carRef} value={0}>
									Все
								</option>
								{allMachines.map(element => {
									return (
										<option key={element.id} value={element.id}>
											{element.machine_id}
										</option>
									)
								})}
							</select>
						</td>
						<td>
							<select
								className='maintenance-data-filter'
								onChange={handleMaintenanceTypeFilter}
							>
								<option ref={maintenanceTypesRef} value={0}>
									Все
								</option>
								{allMaintenanceTypes.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td colSpan={4} className='empty-cell'></td>
						{group !== '2' ? (
							<td>
								<select
									className='maintenance-data-filter'
									onChange={handleServiceCompanyFilter}
								>
									<option ref={serviceCompanyRef} value={0}>
										Все
									</option>
									{allServiceCompanies.map(element => {
										return (
											<option key={element.id} value={element.name}>
												{element.name}
											</option>
										)
									})}
								</select>
							</td>
						) : (
							<td className='empty-cell'></td>
						)}
					</tr>
					{currentData.map(element => {
						return (
							<tr key={element.id}>
								<td>{element.machine_id_details}</td>
								<td>
									<Link
										to={`details/maintenance-types/${element.maintenance_type}`}
									>
										{element.maintenance_type_info.name}
									</Link>
								</td>
								<td>{element.maintenance_date}</td>
								<td>{element.running_time}</td>
								<td>{element.order_id}</td>
								<td>{element.order_date}</td>
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
						<th>Зав. № машины</th>
						<th>Вид ТО</th>
						<th>Дата проведения ТО</th>
						<th>Наработка, м/час</th>
						<th>№ заказ-наряда</th>
						<th>дата заказ-наряда</th>
						<th>Организация, проводившая ТО</th>
					</tr>
				</tfoot>
			</table>
			<button onClick={handleAddMaintenance} className='add-maintenance-btn'>
				Добавить данные о ТО
			</button>
		</div>
	)
}

export default Maintenance