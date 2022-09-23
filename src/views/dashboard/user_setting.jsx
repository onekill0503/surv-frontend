import config from '../../config.json'
import "../../assets/styles/dashboard.css";
import axios from 'axios'
// Import element
import DashboardLayout from "../../layout/dashboard";
import InputComponent from '../../components/input'
import { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

// import icon 
import {EnvelopeIcon , UserIcon} from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/solid';

const UserSettings = (props) =>{ 
    // set up alert function
    const alert = useAlert()
    // call function for redirect if needed
    const redirect = useNavigate()

    const [firstname , setfirstname] = useState('')
    const [lastname , setlastname] = useState('')
    const [email , setemail] = useState('')
    const [old_password , setoldpassword] = useState('')
    const [new_password , setnewpassword] = useState('')
    // get auth data
    const token = localStorage.getItem('token') || ''

    useEffect(() => {
        axios.post(`${config.apiUrl}/account/retrive` , {"token": token}).then(res => {
            if(res.status === 200){
                props.handleSession(res.data.data)
                setfirstname(res.data.data.firstname)
                setlastname(res.data.data.lastname)
                setemail(res.data.data.email)
            }else redirect('/auth/signin')
        }).catch(error => {
            redirect('/auth/signin')
        })
    } , [token])

    // function to handle change profile event
    const updateProfile = () => {
        // get userid data from redux
        const {user_id} = props.session
        axios.post(`${config.apiUrl}/account/update` , {
            user_id: user_id,
            firstname: firstname,
            lastname: lastname,
            email: email
        } , {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            if(res.status === 200){
                alert.show(res.data.message , {type:'success'})
                props.newSession(res.data.token)
            }else{
                alert.show(res.data.message , {type:'error'})
            }
        }).catch(error => {
            alert.show(error.response.data.message , {type:'error'})
        })
    }
    // function to handle change password event
    const updatePassword = () => {
        // get userid data from redux
        const {user_id} = props.session
        axios.post(`${config.apiUrl}/account/changepassword` , {
            user_id: user_id,
            old_password: old_password,
            new_password: new_password
        } , {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            if(res.status === 200){
                alert.show(res.data.message , {type:'success'})
                setnewpassword('')
                setoldpassword('')
            }else{
                alert.show(res.data.message , {type:'error'})
            }
        }).catch(error => {
            alert.show(error.response.data.message , {type:'error'})
        })
    }

    return (
        <DashboardLayout>
            <div className="dashboard-title">User Settings</div>
            <div className='flex flex-wrap'>
                <div className='user-data-wrapper p-20 flex-1 basis-1/2 sm:basis-1'>
                    <div className='input w-full'>
                        <InputComponent type="text" name="First Name" defaultValue={firstname} placeholder="Your Firstname ..." onChange={setfirstname} icon={UserIcon} />
                        <InputComponent type="text" name="Last Name" defaultValue={lastname} placeholder="Your Lastname ..." onChange={setlastname} icon={UserIcon} />
                        <InputComponent type="text" name="Email" defaultValue={email} placeholder="Your Email ..." onChange={setemail} icon={EnvelopeIcon} />
                        <button className='px-5 py-2 bg-violet-600 text-white rounded my-5' onClick={e => updateProfile()}>Update Profile</button>
                    </div>
                </div>
                <div className='password-settings p-20 flex-1 basis-1/2 sm:basis-1'>
                    <div className='input'>
                        <InputComponent type="password" defaultValue={old_password} name="Old Password" placeholder="Your Old Password" onChange={setoldpassword} icon={EyeIcon} />
                        <InputComponent type="password" defaultValue={new_password} name="New Password" placeholder="Your New Password" onChange={setnewpassword} icon={EyeIcon} />
                        <button className='px-5 py-2 bg-violet-600 text-white rounded my-5' onClick={e => updatePassword()}>Update Password</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

const stateToProps = state => {
    return state
}
const dispatchToProps = dispatch => {
    return {
        handleSession: (user) => dispatch({type: 'SAVE_SESSION' , data: user}),
        newSession: (token) => {
            localStorage.removeItem('token')
            localStorage.setItem('token' , token)
        }
    }
}

export default connect(stateToProps , dispatchToProps)(UserSettings)