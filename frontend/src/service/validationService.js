const maintenanceValidation = (data, group) => {
	const today = new Date()
	if (group !== '3') {
		return (
			data.car_id.length > 0 &&
			data.maintenance_type.length > 0 &&
			data.running_time.length > 0 &&
			data.order_id.length > 0 &&
			Date.parse(data.maintenance_date) > Date.parse(data.order_date) &&
			Date.parse(data.maintenance_date) < Date.parse(today)
		)
	} else {
		return (
			data.car_id.length > 0 &&
			data.maintenance_type.length > 0 &&
			data.running_time.length > 0 &&
			data.order_id.length > 0 &&
			data.service_company.length > 0 &&
			Date.parse(data.maintenance_date) > Date.parse(data.order_date) &&
			Date.parse(data.maintenance_date) < Date.parse(today)
		)
	}
}

const complaintValidation = (data, group) => {
	const today = new Date()
	if (group !== '3') {
		return (
			data.car_id.length > 0 &&
			data.breakage_description.length > 0 &&
			data.running_time.length > 0 &&
			data.breakage_type.length > 0 &&
			data.repairing_way.length > 0 &&
			Date.parse(data.breakage_date) < Date.parse(data.repair_date) &&
			Date.parse(data.repair_date) < Date.parse(today)
		)
	} else {
		return (
			data.car_id.length > 0 &&
			data.breakage_description.length > 0 &&
			data.running_time.length > 0 &&
			data.breakage_type.length > 0 &&
			data.repairing_way.length > 0 &&
			data.service_company.length > 0 &&
			Date.parse(data.breakage_date) < Date.parse(data.repair_date) &&
			Date.parse(data.repair_date) < Date.parse(today)
		)
	}
}

const carValidation = data => {
	const today = new Date()
	return (
		data.car_id.length > 0 &&
		data.engine_id.length > 0 &&
		data.transmission_id.length > 0 &&
		data.driving_axle_id.length > 0 &&
		data.steering_axle_id.length > 0 &&
		data.delivery_contract.length > 0 &&
		data.receiver.length > 0 &&
		data.delivery_address.length > 0 &&
		data.vehicle_configuration.length > 0 &&
		data.vehicle_model.length > 0 &&
		data.engine_model.length > 0 &&
		data.transmission_model.length > 0 &&
		data.driving_axle_model.length > 0 &&
		data.steering_axle_model.length > 0 &&
		data.client.length > 0 &&
		data.service_company.length > 0 &&
		Date.parse(data.discharge_date) < Date.parse(today)
	)
}

const catalogValidation = (type, data) => {
	return data.name.length > 0 && data.description.length > 0
}

export {
	maintenanceValidation,
	complaintValidation,
	carValidation,
	catalogValidation,
}