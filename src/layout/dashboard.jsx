import config from '../config.json'
import {connect} from 'react-redux'
import {DocumentIcon} from '@heroicons/react/24/solid'
import {HomeIcon , ArrowRightOnRectangleIcon , Cog6ToothIcon, ChatBubbleLeftRightIcon} from '@heroicons/react/24/outline'
import axios from 'axios'
import { useEffect } from 'react'
// import asset image
import avatar from '../assets/img/avatar.png'
import { Link , useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
    // call function for redirect if needed
    const redirect = useNavigate();
    // get login token
    const token = localStorage.getItem('token') || ''

    useEffect(() => {
        axios.post(`${config.apiUrl}/account/retrive` , {"token": token}).then(res => {
            if(res.status === 200){
                props.handleSession(res.data.data)
            }else redirect('/auth/signin')
        }).catch(error => {
            redirect('/auth/signin')
        })
    } , [token])
    return (
    <div className='flex'>
        <div className='side-menu-wrapper flex flex-col relative'>
            <div className='dashboard-logo-wrapper'>
                <DocumentIcon className="text-violet-600 w-5 h-5 inline-block mb-2" />
                <span className='inline-block ml-1'>surv</span>
            </div>
            <div className='dashboard-menu'>
                <span className='dashboard-menu-title block text-violet-600 my-5'>Menu</span>
                <Link to={'/dashboard'}>
                    <div className='menu-wrapper'>
                        <HomeIcon className='inline-block w-6 h-6 mb-1 mr-5' />
                        <span>Dashboard</span>
                    </div>
                </Link>
                <Link to={'/dashboard/responses'}>
                    <div className='menu-wrapper'>
                        <ChatBubbleLeftRightIcon className='inline-block w-6 h-6 mb-1 mr-5' />
                        <span>Responses</span>
                    </div>
                </Link>
                <Link to={'/dashboard/settings'}>
                    <div className='menu-wrapper'>
                        <Cog6ToothIcon className='inline-block w-6 h-6 mb-1 mr-5' />
                        <span>Settings</span>
                    </div>
                </Link>
            </div>
            <div className='dashboard-profile-wrapper flex justify-between items-center'>
                <div className='avatar'>
                    <img src={avatar} alt={"User Profile"} className="w-7 h-7" />
                </div>
                <div className='name'>
                    {props.session ? props.session.firstname : ''}
                </div>
                <div className='user-action'>
                    <ArrowRightOnRectangleIcon className='w-5 h-5 cursor-pointer' onClick={e => props.logOut()} />
                </div>
            </div>
        </div>
        <div className='content flex-1'>
            { props.children }
        </div>
    </div>
    )
}

const stateToProps = state => {
    return state
}
const dispatchToProps = dispatch => {
    return {
        handleSession: (user) => dispatch({type: 'SAVE_SESSION' , data: user}),
        logOut: () => {
            localStorage.removeItem('token')
            dispatch({type: 'REMOVE_SESSION'})
        }
    }
}

export default connect(stateToProps , dispatchToProps)(Dashboard)