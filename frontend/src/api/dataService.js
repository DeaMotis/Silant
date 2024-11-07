import axios from 'axios'

import {
	BASE_URL,
	LOGIN_URL,
	ALL_MACHINES_URL,
	DEFINITE_MACHINE_URL,
	CLIENTS_MACHINES_URL,
	SERVICE_COMPANIES_MACHINES_URL,
	ALL_MAINTENANCE_URL,
	CLIENTS_MAINTENANCE_URL,
	SERVICE_COMPANIES_MAINTENANCE_URL,
	ALL_CLAIMS_URL,
	CLIENTS_CLAIMS_URL,
	SERVICE_COMPANIES_CLAIMS_URL,
	MAINTENANCE_TYPES_URL,
	ALL_SERVICE_COMPANIES_URL,
	BREAKAGES_URL,
	REPAIR_WAY_URL,
	VEHICLES_URL,
	ENGINES_URL,
	TRANSMISSIONS_URL,
	DRIVING_AXLES_URL,
	STEERING_AXLES_URL,
	ALL_CLIENTS_URL,
} from '../utils/constants'

const login = async (user, password, setter, redirection) => {
	return await axios({
		baseURL: BASE_URL,
		url: LOGIN_URL,
		method: 'post',
		auth: {
			username: user,
			password: password,
		},
		data: {
			user: user,
		},
	})
		.then(response => {
			console.log('Logged in successfully')
			localStorage.setItem('user', response.data.username)
			localStorage.setItem('password', password)
			localStorage.setItem('group', response.data.groups[0])
			localStorage.setItem('id', response.data.id)
			setter(true)
			redirection('/')
		})
		.catch(error => {
			console.log('Ошибка авторизации...', error)
			redirection('/auth-error')
		})
}

const getServiceCompanyId = async userId => {
	return await axios({
		baseURL: BASE_URL,
		url: `service-companies/${userId}/service-company-id`,
		method: 'get',
	})
		.then(response => {
			localStorage.setItem('serviceCompanyId', response.data)
		})
		.catch(error => console.log('Ошибка получения данных о погрузчиках', error))
}

const getFilteredMachines = async (id, setter) => {
	return await axios({
		baseURL: BASE_URL,
		url: `machine/${id}/${DEFINITE_MACHINE_URL}`,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => console.log('Ошибка получения данных о погрузчиках', error))
}

const getAllClients = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_CLIENTS_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getAllMachines = async (setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_MACHINES_URL,
		method: 'get',
	}).then(response => {
		setter1(response.data)
		if (setter2) {
			setter2(response.data)
		}
	})
}

const getClientsMachines = async (user, password, id, setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: CLIENTS_MACHINES_URL,
		method: 'get',
		params: {
			id: id,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о погрузчиках', error))
}

const getServiceCompaniesMachines = async (user, password, setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: SERVICE_COMPANIES_MACHINES_URL,
		method: 'get',
		params: {
			name: user,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о погрузчиках', error))
}

const getAllMaintenance = async (setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_MAINTENANCE_URL,
		method: 'get',
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о ТО', error))
}

const getClientsMaintenance = async (user, password, id, setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: CLIENTS_MAINTENANCE_URL,
		method: 'get',
		params: {
			id: id,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о ТО', error))
}

const getServiceCompaniesMaintenance = async (
	user,
	password,
	setter1,
	setter2
) => {
	return await axios({
		baseURL: BASE_URL,
		url: SERVICE_COMPANIES_MAINTENANCE_URL,
		method: 'get',
		params: {
			name: user,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о ТО', error))
}

const getAllClaims = async (setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_CLAIMS_URL,
		method: 'get',
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о рекламациях', error))
}

const getClientsClaims = async (user, password, id, setter1, setter2) => {
	return await axios({
		baseURL: BASE_URL,
		url: CLIENTS_CLAIMS_URL,
		method: 'get',
		params: {
			id: id,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о рекламациях', error))
}

const getServiceCompaniesClaims = async (
	user,
	password,
	setter1,
	setter2
) => {
	return await axios({
		baseURL: BASE_URL,
		url: SERVICE_COMPANIES_CLAIMS_URL,
		method: 'get',
		params: {
			name: user,
		},
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			setter1(response.data)
			if (setter2) {
				setter2(response.data)
			}
		})
		.catch(error => console.log('Ошибка получения данных о погрузчиках', error))
}

const getMaintenanceTypes = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: MAINTENANCE_TYPES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getAllServiceCompanies = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_SERVICE_COMPANIES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getBreakagesList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: BREAKAGES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getRepairWaysList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: REPAIR_WAY_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getVehicleList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: VEHICLES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getEngineList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: ENGINES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getTransmissionList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: TRANSMISSIONS_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getDrivingAxleList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: DRIVING_AXLES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getSteeringAxleList = async setter => {
	return await axios({
		baseURL: BASE_URL,
		url: STEERING_AXLES_URL,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getDetails = async (url, setter) => {
	return await axios({
		baseURL: BASE_URL,
		url: url,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
		})
		.catch(error => console.log('Ошибка получения подробных данных...', error))
}

const getAllCatalogs = async (url, setter, titleSetter) => {
	return await axios({
		baseURL: BASE_URL,
		url: url,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
			titleSetter(response.data[0].verbose_name)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const getUniversalData = async (urlPart1, urlPart2, setter, titleSetter) => {
	return await axios({
		baseURL: BASE_URL,
		url: `${urlPart1}/${urlPart2}/`,
		method: 'get',
	})
		.then(response => {
			setter(response.data)
			titleSetter(response.data.name)
		})
		.catch(error => {
			console.log('Ошибка получения данных...', error)
		})
}

const postNewMaintenance = async (
	user,
	password,
	group,
	serviceCompanyId,
	data,
	redirection
) => {
	if (group === '1') {
		data.service_company = 4
	} else if (group === '2') {
		data.service_company = serviceCompanyId
	}

	return await axios({
		baseURL: BASE_URL,
		url: ALL_MAINTENANCE_URL,
		method: 'post',
		data: data,
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			redirection('/success')
			return response.data
		})
		.catch(error => {
			console.log('Ошибка отправки данных...', error)
			redirection('/fail')
		})
}

const postNewClaim = async (
	user,
	password,
	group,
	serviceCompanyId,
	data,
	redirection
) => {
	if (group === '2') {
		data.service_company = serviceCompanyId
	}

	return await axios({
		baseURL: BASE_URL,
		url: ALL_CLAIMS_URL,
		method: 'post',
		data: data,
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			redirection('/success')
			return response.data
		})
		.catch(error => {
			console.log('Ошибка отправки данных...', error)
			redirection('/fail')
		})
}

const postNewMachine = async (user, password, data, redirection) => {
	return await axios({
		baseURL: BASE_URL,
		url: ALL_MACHINES_URL,
		method: 'post',
		data: data,
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			redirection('/success')
			return response.data
		})
		.catch(error => {
			console.log('Ошибка отправки данных...', error)
			redirection('/fail')
		})
}

const postNewCatalog = async (user, password, url, data, redirection) => {
	return await axios({
		baseURL: BASE_URL,
		url: `${url}/`,
		method: 'post',
		data: data,
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			redirection('/success')
			return response.data
		})
		.catch(error => {
			console.log('Ошибка отправки данных...', error)
			redirection('/fail')
		})
}

const changeCatalog = async (
	user,
	password,
	urlPart1,
	urlPart2,
	data,
	redirection
) => {
	return await axios({
		baseURL: BASE_URL,
		url: `${urlPart1}/${urlPart2}/`,
		method: 'patch',
		data: data,
		auth: {
			username: user,
			password: password,
		},
	})
		.then(response => {
			redirection('/success')
			return response.data
		})
		.catch(error => {
			console.log('Ошибка отправки данных...', error)
			redirection('/fail')
		})
}

export {
	getFilteredMachines,
	getAllMachines,
	getAllServiceCompanies,
	getAllMaintenance,
	getAllClaims,
	getDetails,
	getClientsMachines,
	getServiceCompaniesMachines,
	getClientsMaintenance,
	getServiceCompaniesMaintenance,
	getClientsClaims,
	getServiceCompaniesClaims,
	getMaintenanceTypes,
	getServiceCompanyId,
	getBreakagesList,
	getRepairWaysList,
	getVehicleList,
	getEngineList,
	getTransmissionList,
	getDrivingAxleList,
	getSteeringAxleList,
	getAllClients,
	getAllCatalogs,
	getUniversalData,
	postNewMaintenance,
	postNewClaim,
	postNewMachine,
	postNewCatalog,
	changeCatalog,
	login,
}