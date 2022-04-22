import React from 'react'
import config from '../../config/config'
import "../../styles/login.css"
import LoginComponent from '../COMMON/LoginComponent'

function Login() {
    return (
        <div className='back'>
            <LoginComponent type = {config.ADMIN} />
        </div>
    )
}

export default Login