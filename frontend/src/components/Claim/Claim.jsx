import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Claim.css'
import {
	getAllClaims,
	getClientsClaims,
	getServiceCompaniesClaims,
	getBreakagesList,
	getRepairWaysList,
	getAllServiceCompanies,
	getServiceCompaniesMachines,
	getClientsMachines,
	getAllMachines,
} from '../../api/dataService.js'
import serviceContext from '../../context/Context.js'
import { initialClaimsSortWay } from '../../utils/constants.js'

const Claim = ({ group }) => {
	const navigate = useNavigate()
	const breakageRef = useRef(null)
	const repairRef = useRef(null)
	const machineRef = useRef(null)
	const serviceCompanyRef = useRef(null)
	const [currentData, setCurrentData] = useState([])
	const [allData, setAllData] = useState([])
	const [allMachines, setAllMachines] = useState([])
	const [allBreakages, setAllBreakages] = useState([])
	const [allRepairWays, setAllRepairWays] = useState([])
	const [allServiceCompanies, setAllServiceCompanies] = useState([])
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [userId, setuserId] = useState(localStorage.getItem('id'))
	const [sortWay, setSortWay] = useState(initialClaimsSortWay)
	const { pageId, setPageId } = useContext(serviceContext)

	useEffect(() => {
		if (group === '3') {
			getAllClaims(setAllData, setCurrentData)
		} else if (group === '1') {
			getClientsClaims(
				userName,
				password,
				userId,
				setAllData,
				setCurrentData
			)
		} else if (group === '2') {
			getServiceCompaniesClaims(
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
		getBreakagesList(setAllBreakages)
		getRepairWaysList(setAllRepairWays)
		getAllServiceCompanies(setAllServiceCompanies)
		setPageId(3)
	}, [])

	const handleAddClaim = () => {
		navigate('/add-claim')
	}

	const handleMachineFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.machine_id == e.target.value
			})
			setCurrentData(result)
		}
		repairRef.current.selected = true
		breakageRef.current.selected = true
		if (group !== '2') {
			serviceCompanyRef.current.selected = true
		}
	}

	const handleBreakageFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.breakage_type_info.name == e.target.value
			})
			setCurrentData(result)
		}
		repairRef.current.selected = true
		machineRef.current.selected = true
		if (group !== '2') {
			serviceCompanyRef.current.selected = true
		}
	}

	const handleRepairFilter = e => {
		if (e.target.value == 0) {
			setCurrentData(allData)
		} else {
			const result = allData.filter(item => {
				return item.repairing_way_info.name == e.target.value
			})
			setCurrentData(result)
		}
		breakageRef.current.selected = true
		machineRef.current.selected = true
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
		breakageRef.current.selected = true
		repairRef.current.selected = true
		machineRef.current.selected = true
	}

	const handleDetailedSort = e => {
		const field = e.target.value
		const result = [...currentData]
		if (sortWay[field] === '▽' || sortWay[field] === '-') {
			setSortWay({ ...initialClaimsSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialClaimsSortWay, [field]: '▽' })
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
			setSortWay({ ...initialClaimsSortWay, [field]: '△' })
		} else {
			setSortWay({ ...initialClaimsSortWay, [field]: '▽' })
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
		<div className='claim-info-container'>
			<table className='claim-result-table'>
				<thead>
					<tr>
						<th>Зав. № машины</th>
						<th>Дата отказа</th>
						<th>Наработка, м/час</th>
						<th>Узел отказа</th>
						<th>Описание отказа</th>
						<th>Способ восстановления</th>
						<th>Используемые запасные части</th>
						<th>Дата восстановления</th>
						<th>Организация, проводившая ремонт</th>
						<th>Время простоя техники</th>
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
							<button onClick={handleSimpleSort} value='breakage_date'>
								{sortWay['breakage_date']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='running_time'>
								{sortWay['running_time']}
							</button>
						</td>
						<td>
							<button onClick={handleDetailedSort} value='breakage_type_info'>
								{sortWay['breakage_type_info']}
							</button>
						</td>
						<td className='empty-cell'></td>
						<td className='empty-cell'></td>
						<td className='empty-cell'></td>
						<td>
							<button onClick={handleSimpleSort} value='repair_date'>
								{sortWay['repair_date']}
							</button>
						</td>
						<td>
							<button onClick={handleDetailedSort} value='service_company_info'>
								{sortWay['service_company_info']}
							</button>
						</td>
						<td>
							<button onClick={handleSimpleSort} value='down_time'>
								{sortWay['down_time']}
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<select
								className='claim-data-filter'
								onChange={handleMachineFilter}
							>
								<option ref={machineRef} value={0}>
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
						<td colSpan={2} className='empty-cell'></td>
						<td>
							<select
								className='claim-data-filter'
								onChange={handleBreakageFilter}
							>
								<option ref={breakageRef} value={0}>
									Все
								</option>
								{allBreakages.map(element => {
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
								className='claim-data-filter'
								onChange={handleRepairFilter}
							>
								<option ref={repairRef} value={0}>
									Все
								</option>
								{allRepairWays.map(element => {
									return (
										<option key={element.id} value={element.name}>
											{element.name}
										</option>
									)
								})}
							</select>
						</td>
						<td colSpan={2} className='empty-cell'></td>
						{group !== '2' ? (
							<td>
								<select
									className='claim-data-filter'
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
						<td className='empty-cell'></td>
					</tr>
					{currentData.map(element => {
						return (
							<tr key={element.id}>
								<td>{element.machine_id_details}</td>

								<td>{element.breakage_date}</td>
								<td>{element.running_time}</td>
								<td>
									<Link to={`details/breakages/${element.breakage_type}`}>
										{element.breakage_type_info.name}
									</Link>
								</td>
								<td>{element.breakage_description}</td>
								<td>
									<Link to={`details/repair-ways/${element.repairing_way}`}>
										{element.repairing_way_info.name}
									</Link>
								</td>
								<td>{element.spares}</td>
								<td>{element.repair_date}</td>
								<td>
									<Link
										to={`details/service-companies/${element.service_company}`}
									>
										{element.service_company_info.name}
									</Link>
								</td>
								<td>{element.down_time}</td>
							</tr>
						)
					})}
				</tbody>
				<tfoot>
					<tr>
						<th>Зав. № машины</th>
						<th>Дата отказа</th>
						<th>Наработка, м/час</th>
						<th>Узел отказа</th>
						<th>Описание отказа</th>
						<th>Способ восстановления</th>
						<th>Используемые запасные части</th>
						<th>Дата восстановления</th>
						<th>Организация, проводившая ремонт</th>
						<th>Время простоя техники</th>
					</tr>
				</tfoot>
			</table>
			{(group === '2' || group === '3') && (
				<button onClick={handleAddClaim} className='add-claim-btn'>
					Добавить данные о рекламациях
				</button>
			)}
		</div>
	)
}

export default Claim