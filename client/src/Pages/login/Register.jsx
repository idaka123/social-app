import axios from "axios"
import classNames from "classnames/bind"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import Button from "../../Components/Button/Button"
import InputBar from "../../Components/InputBar/InputBar"
import { registerSuccess } from "../../redux/authSlice"
import { register } from "../../redux/requestApi"
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const RegisterPage = (props) => {
    const {log, setLog, setLoad}= props
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        setLoad(true)
        const  newUser = {
            name: name,
            username: username,
            password: password
        }
        await axios.post('/authem/register', newUser)
        .then(() => {dispatch(registerSuccess())})
        .then(() => {
            setLog(!log)
            setLoad(false)
        }) 
        .catch(() => {setLoad(false)})

    }

    return ( 
        <div>
            <form className={cx("Register_modal")} onSubmit={handleSubmitRegister}>
                <header className={cx("Register_modal-header")}>
                    <h3 className={cx("Register_modal-title")}>Register</h3>
                </header>
                <div className={cx("Register_modal-body")}>
                    <InputBar
                        placeholder='Name' 
                        width='100%'
                        onChange={(e)=>setName(e.target.value)}/>
                    <InputBar 
                        placeholder='Username' 
                        width='100%'
                        onChange={(e)=>setUsername(e.target.value)}/>
                    <InputBar 
                        placeholder='Password'
                        width='100%' 
                        onChange={(e)=>setPassword(e.target.value)}
                        type='password'
                        />
                </div>

                <div className={cx("Register_modal-icon-box")}>
                    <Button width={'100%'} btnType={'primary'}>Register</Button>
                </div>

                <div className={cx("register-zone")}>
                  Have already an account?
                  <div className={cx("sign_up-btn")} 
                  onClick={()=> {setLog(!log)}}>Login here</div>
                </div>

            </form>
              
        </div>
    );
}
 
export default RegisterPage;