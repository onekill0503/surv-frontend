import config from '../config.json'
import '../assets/styles/auth.css'
import {connect} from 'react-redux'
import {Link , useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
// import icon
import { EnvelopeIcon , EyeSlashIcon , ArrowRightIcon , ArrowUpRightIcon} from '@heroicons/react/24/solid'
// Component Import
import Header from '../components/header'
import InputComponent from '../components/input'
import { useState , useEffect } from 'react'
import axios from 'axios'

const SignIn = (props) => {
    // set up alert function
    const alert = useAlert()
    // call function for redirect if needed
    const redirect = useNavigate();
    // get login token
    const token = localStorage.getItem('token') || ''

    useEffect(() => {
        axios.post(`${config.apiUrl}/account/retrive` , {"token": token}).then(res => {
            if(res.status === 200){
                props.dispatch({type: 'SAVE_SESSION' , data: res.data.data})
                redirect('/dashboard')
            }
        }).catch(error => {
            console.log(error.response.data.message)
        })
    } , [token])

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    
    const SignInEvent = () => {
        axios.post(`${config.apiUrl}/account/login` , {
            email: email , password: password
        }).then(res => {
            if(res.status === 200){
                localStorage.setItem('token' , res.data.token)
                alert.show(res.data.message , {type:'success' , onClose: () => {redirect('/dashboard')}})
            }else{
                alert.show(res.data.message , {type: 'error'})
            }
        }).catch(error => {
            console.log(error)
            alert.show(error.response.data.message , {type: 'error'})
        })
    }

    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <div className="login-box mx-auto mt-20">
                    <div className='auth-title-wrapper'>
                        <div className='auth-title'>Sign In</div>
                        <div className='auth-subtitle' >Hi, Welcome Back 👋</div>
                    </div>
                    <div className='input-wrapper'>
                        <InputComponent name="Email" type="text" placeholder="E.g. example@example.com" icon={EnvelopeIcon} onChange={setEmail} />
                        <InputComponent name="Password" type="password" placeholder="Enter your password" icon={EyeSlashIcon} onChange={setPassword} />
                    </div>
                    <br />
                    <button className='auth-btn bg-violet-800 text-white' onClick={e => SignInEvent()}>
                        Sign In
                        <ArrowRightIcon className='inline-block w-4 h-4 ml-2' />
                    </button>
                    <div className='mt-20 text-center'>
                        <span className="text-md">Not registered yet ? <Link to={'/auth/signup'} className="text-purple-800">Create an account <ArrowUpRightIcon className='inline-block w-4 h-4' /></Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const stateToProps = (state) => {
    return state
}

export default connect(stateToProps)(SignIn);