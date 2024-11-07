import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddMaintenancePage.css'
import {
	getClientsMachines,
	getMaintenanceTypes,
	getAllServiceCompanies,
	postNewMaintenance,
	getServiceCompanyId,
	getServiceCompaniesMachines,
	getAllMachines,
} from '../../api/dataService.js'
import { maintenanceValidation } from '../../service/validationService.js'

const AddMaintenancePage = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [password, setPassword] = useState(localStorage.getItem('password'))
	const [userId, setuserId] = useState(localStorage.getItem('id'))
	const [group, setGroup] = useState(localStorage.getItem('group'))
	const [currentUserCars, setCurrentUserCars] = useState([])
	const [maintenanceTypes, setMaintenanceTypes] = useState([])
	const [maintenanceCompanies, setMaintenanceCompanies] = useState([])
	const [currentServiceCompanyId, setCurrentServiceCompanyId] = useState(
		localStorage.getItem('serviceCompanyId')
	)
	const [postData, setPostData] = useState({
		machine_id: '',
		maintenance_type: '',
		maintenance_date: '',
		running_time: '',
		order_id: '',
		order_date: '',
		service_company: '',
	})

	useEffect(() => {
		getMaintenanceTypes(setMaintenanceTypes)
		getAllServiceCompanies(setMaintenanceCompanies)
		getServiceCompanyId(userId)
		if (group === '1') {
			getClientsMachines(userName, password, userId, setCurrentUserMachines)
		} else if (group === '2') {
			getServiceCompaniesMachines(userName, password, setCurrentUserMachines)
		} else {
			getAllCars(setCurrentUserMachines)
		}
		setCurrentServiceCompanyId(localStorage.getItem('serviceCompanyId'))
	}, [])

	const handleInputChange = e => {
		const { name, value } = e.target
		setPostData({
			...postData,
			[name]: value,
		})
	}

	const handleReturn = () => {
		navigate('/')
	}

	const handleMaintenancePost = async e => {
		e.preventDefault()
		postNewMaintenance(
			userName,
			password,
			group,
			currentServiceCompanyId,
			postData,
			navigate
		)
	}

	return (
		<div className='maintenance-adding-block'>
			<h1 className='maintenance-adding-title'>
				Добавление данных о техническом осмотре погрузчиков
			</h1>
			<form className='maintenance-form' action=''>
				<label htmlFor='machine_id'>Заводской № машины</label>
				<select name='machine_id' onChange={handleInputChange} required>
					<option value=''>- Выберите ваш погрузчик -</option>
					{currentUserMachines.map(element => {
						return (
							<option key={element.id} value={element.id}>
								{element.machine_id}
							</option>
						)
					})}
				</select>
				<label htmlFor='maintenance_type'>Вид ТО</label>
				<select name='maintenance_type' onChange={handleInputChange} required>
					<option value=''>- Выберите вид ТО -</option>
					{maintenanceTypes.map(element => {
						return (
							<option key={element.id} value={element.id}>
								{element.name}
							</option>
						)
					})}
				</select>
				<label htmlFor='maintenance_date'>Дата проведения ТО</label>
				<input
					name='maintenance_date'
					type='date'
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='order_date'>Дата заказ-наряда</label>
				<input
					name='order_date'
					type='date'
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='running_time'>Наработка, м/час</label>
				<input
					name='running_time'
					type='number'
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='order_id'>№ заказ-наряда</label>
				<input
					name='order_id'
					type='text'
					onChange={handleInputChange}
					required
				/>
				{group === '3' && (
					<>
						<label htmlFor='service_company'>Организация, проводившая ТО</label>
						<select
							name='service_company'
							onChange={handleInputChange}
							required
						>
							<option value=''>-Выберите сервисную компанию-</option>
							{maintenanceCompanies.map(element => {
								return (
									<option key={element.id} value={element.id}>
										{element.name}
									</option>
								)
							})}
						</select>
					</>
				)}
				<button
					onClick={handleMaintenancePost}
					className='submit-maintenance-btn'
					type='submit'
					disabled={!maintenanceValidation(postData, group)}
				>
					Добавить данные
				</button>
			</form>
			<button
				onClick={handleReturn}
				className='add-maintenence-return-btn'
				type='button'
			>
				Вернуться
			</button>
		</div>
	)
}

export default AddMaintenancePage