import React from 'react'
import './Contacts.css'
import PhoneIcon from '../../static/images/phone-alt-svgrepo-com.svg'
import TelegramIcon from '../../static/images/telegram-svgrepo-com.svg'

const Contacts = () => {
	return (
		<div className='contacts'>
			<img className='icon' src={PhoneIcon} alt='Telephone' />
			<a href='tel: +78007005265'>+7 (800) 700-52-65</a>
			<img className='icon' src={TelegramIcon} alt='Telegram' />
			<a href='https://t.me/chzsa21/' target='_blank'>
				<div>https://t.me/chzsa21/</div>
			</a>
		</div>
	)
}

export default Contacts