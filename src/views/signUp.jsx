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

const SignUp = (props) => {
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

    // setup variable to handle input
    const [firstname , setfirstname] = useState('')
    const [lastname , setlastname] = useState('')
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')

    const registerEvent = () => {
        axios.put(`${config.apiUrl}/account/register` , {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }).then(res => {
            if(res.status === 200){
                alert.show(res.data.message , {type:'success' , onClose: () => {redirect('/auth/signin')}})
            }else{
                alert.show(res.data.message , {type: 'error'})
            }
        }).catch(error => {
            alert.show(error.response.data.message , {type: 'error'})
        })
    }

    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <div className="login-box mx-auto mt-20">
                    <div className='auth-title-wrapper'>
                        <div className='auth-title'>Sign Up</div>
                        <div className='auth-subtitle' >Hi, Let's Start your Journey !</div>
                    </div>
                    <div className='input-wrapper'>
                        <div className="flex justify-between">
                            <InputComponent name="First Name" type="text" placeholder="Steve" onChange={setfirstname} />
                            <InputComponent name="Last Name" type="text" placeholder="Jobs" onChange={setlastname} />
                        </div>
                        <InputComponent name="Email" type="text" placeholder="E.g. example@example.com" icon={EnvelopeIcon} onChange={setemail} />
                        <InputComponent name="Password" type="password" placeholder="Enter your password" icon={EyeSlashIcon} onChange={setpassword} />
                    </div>
                    <br />
                    <button className='auth-btn bg-violet-800 text-white' onClick={e => registerEvent()}>
                        Sign Up
                        <ArrowRightIcon className='inline-block w-4 h-4 ml-2' />
                    </button>
                    <div className='mt-20 text-center'>
                        <span className="text-md">Have an account ? <Link to={'/auth/signin'} className="text-purple-800">Sign in <ArrowUpRightIcon className='inline-block w-4 h-4' /></Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const stateToProps = (state) => {
    return {
        name: state.name
    }
}

export default connect(stateToProps)(SignUp);