import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Contacts from './Contacts.jsx'
import Logo1 from '../static/images/Logotype RGB.png'
import Logo2 from '../static/images/Logotype accent RGB-1.png'
import Auth from './Auth.jsx'

const Header = () => {
	return (
		<header className='header'>
			<div className='header-container'>
				<Link to={'/'}>
					<div className='logo-container'>
						<img className='logo-sign' src={Logo1} alt='logotype sign' />
						<div className='separator'></div>
						<img className='logo-image' src={Logo2} alt='logotype image' />
					</div>
				</Link>
				<div className='desktop-header-container'>
					<Contacts />
				</div>
				<Auth />
			</div>

			<h1 className='header-title '>
				Электронная сервисная книжка "Мой Силант"
			</h1>
		</header>
	)
}

export default Header