const BASE_URL = 'http://127.0.0.1:8000/api'
const SWAGGER_URL = 'http://127.0.0.1:8000/swagger/'
const LOGIN_URL = 'user-login/'
const ALL_MACHINES_URL = 'machine/'
const ALL_MAINTENANCE_URL = 'maintenance/'
const ALL_CLAIMS_URL = 'claims/'
const DEFINITE_MACHINE_URL = 'definite-machine/'
const CLIENTS_MACHINES_URL = 'machines/clients-machines/'
const SERVICE_COMPANIES_MACHINES_URL = 'machines/service-companies-machines/'
const CLIENTS_MAINTENANCE_URL = 'maintenance/clients-maintenance/'
const SERVICE_COMPANIES_MAINTENANCE_URL =
	'maintenance/service-companies-maintenance/'
const CLIENTS_CLAIMS_URL = 'claims/clients-claims/'
const SERVICE_COMPANIES_CLAIMS_URL =
	'claims/service-companies-claims/'
const MAINTENANCE_TYPES_URL = 'maintenance-types/'
const ALL_SERVICE_COMPANIES_URL = 'service-companies/'
const ADD_MAINTENANCE_URL = 'maintenance/add-maintenance/'
const BREAKAGES_URL = 'breakages/'
const REPAIR_WAY_URL = 'repair-ways/'
const VEHICLES_URL = 'vehicles/'
const ENGINES_URL = 'engines/'
const TRANSMISSIONS_URL = 'transmissions'
const DRIVING_AXLES_URL = 'driving-axles'
const STEERING_AXLES_URL = 'steering-axles'
const ALL_CLIENTS_URL = 'users/'
const GROUPS = {
	1: 'Клиент',
	2: 'Сервисная компания',
	3: 'Менеджер',
}

const initialMachinesSortWay = {
	machine_id: '-',
	engine_id: '-',
	transmission_id: '-',
	driving_axle_id: '-',
	steering_axle_id: '-',
	delivery_contract: '-',
	discharge_date: '-',
	receiver: '-',
	delivery_address: '-',
	vehicle_model_info: '-',
	engine_model_info: '-',
	transmission_model_info: '-',
	driving_axle_model_info: '-',
	steering_axle_model_info: '-',
	service_company_info: '-',
}

const initialMaintenanceSortWay = {
	machine_id_details: '-',
	service_company_info: '-',
	maintenance_type_info: '-',
	maintenance_date: '-',
	running_time: '-',
	order_id: '-',
	order_date: '-',
}

const initialClaimsSortWay = {
	machine_id_details: '-',
	service_company_info: '-',
	breakage_type_info: '-',
	repairing_way_info: '-',
	breakage_date: '-',
	running_time: '-',
	repair_date: '-',
	down_time: '-',
}

export {
	BASE_URL,
	SWAGGER_URL,
	LOGIN_URL,
	ALL_MACHINES_URL,
	ALL_MAINTENANCE_URL,
	DEFINITE_MACHINE_URL,
	CLIENTS_MACHINES_URL,
	SERVICE_COMPANIES_MACHINES_URL,
	CLIENTS_MAINTENANCE_URL,
	SERVICE_COMPANIES_MAINTENANCE_URL,
	ALL_CLAIMS_URL,
	SERVICE_COMPANIES_CLAIMS_URL,
	MAINTENANCE_TYPES_URL,
	ALL_SERVICE_COMPANIES_URL,
	ADD_MAINTENANCE_URL,
	BREAKAGES_URL,
	REPAIR_WAY_URL,
	VEHICLES_URL,
	ENGINES_URL,
	CLIENTS_CLAIMS_URL,
	TRANSMISSIONS_URL,
	DRIVING_AXLES_URL,
	STEERING_AXLES_URL,
	ALL_CLIENTS_URL,
	GROUPS,
	initialMachinesSortWay,
	initialMaintenanceSortWay,
	initialClaimsSortWay,
}