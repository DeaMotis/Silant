import React, { useState, useRef } from 'react'
import './MainInfo.css'
import Main from '../Main/Main.jsx'
import Maintenance from '../Maintenance/Maintenance.jsx'
import Claim from '../Claim/Claim.jsx'

const MainInfo = () => {
	const [currentDataType, setCurrentDataType] = useState(1)
	const [currentGroup, setCurrentGroup] = useState(
		localStorage.getItem('group')
	)
	const mainRef = useRef()
	const maintenanceRef = useRef()
	const complaintRef = useRef()

	const handleMainInfo = () => {
		mainRef.current.className = 'nav-btn active'
		maintenanceRef.current.className = 'nav-btn passive'
		complaintRef.current.className = 'nav-btn passive'
		setCurrentDataType(1)
	}

	const handleMaintenanceInfo = () => {
		mainRef.current.className = 'nav-btn passive'
		maintenanceRef.current.className = 'nav-btn active'
		complaintRef.current.className = 'nav-btn passive'
		setCurrentDataType(2)
	}

	const handleComplaintInfo = () => {
		mainRef.current.className = 'nav-btn passive'
		maintenanceRef.current.className = 'nav-btn passive'
		complaintRef.current.className = 'nav-btn active'
		setCurrentDataType(3)
	}

	return (
		<div className='main-info'>
			<div className='navigation-bar'>
				<button
					ref={mainRef}
					onClick={handleMainInfo}
					className='nav-btn active'
				>
					Общая информация
				</button>
				<button
					ref={maintenanceRef}
					onClick={handleMaintenanceInfo}
					className='nav-btn passive'
				>
					ТО
				</button>
				<button
					ref={complaintRef}
					onClick={handleComplaintInfo}
					className='nav-btn passive'
				>
					Рекламации
				</button>
			</div>
			{currentDataType === 1 && <Main group={currentGroup} />}
			{currentDataType === 2 && <Maintenance group={currentGroup} />}
			{currentDataType === 3 && <Claim group={currentGroup} />}
		</div>
	)
}

export default MainInfo