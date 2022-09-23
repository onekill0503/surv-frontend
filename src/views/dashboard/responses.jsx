import config from '../../config.json'
import "../../assets/styles/dashboard.css";
import axios from 'axios'
// Import element
import DashboardLayout from "../../layout/dashboard";
import { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

// import icon 

const Responses = (props) =>{ 
    // set up alert function
    const alert = useAlert()
    // call function for redirect if needed
    const redirect = useNavigate()

    const [responses , setResponses] = useState('')
    // get auth data
    const token = localStorage.getItem('token') || ''
    const user_id = props.session ? props.session.user_id : ''

    useEffect(() => {
        if(user_id){
            axios.post(`${config.apiUrl}/response` , {"user_id": user_id} , {
                headers: {
                    Authorization: `Bearer ${token}`,
                }}).then(res => {
                if(res.status === 200){
                    setResponses(res.data.data)
                }else redirect('/auth/signin')
            }).catch(error => {
                redirect('/auth/signin')
            })
        }
    } , [token , user_id])

    // commented cuz server changing
    
    // const getTableHeaders = (input) => {
    //     if(input && input.length > 0){
    //       return input.map((inpt , i) => {
    //         return <td key={i}>{inpt.name}</td>
    //       })
    //     }
    // }
    const getResponseValue = (response) => {
        console.log(response)
        if(response){
            return (<tr>
                <td>{response.name}</td>
                <td>{response.age}</td>
                <td>{response.hobby}</td>
                <td>{response.job}</td>
            </tr>
            )
        }
    }

    const getListResponses = (responses) => {
        if(responses && responses.length > 0){
            return responses.map((res , i) => {
                return (
                    <div key={i}>
                        <hr className='my-5' />
                        <span className="block my-5 text-xl">{res ? res.formData.title : ''}</span>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Age</td>
                                    <td>Hobby</td>
                                    <td>Job</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getResponseValue(res.formResponse)}
                            </tbody>
                        </table>
                    </div>
                )
            })
        }else return (<div><center>No Response</center></div>)
    }

    return (
        <DashboardLayout>
            <div className="dashboard-title">Your Responses</div>
            {getListResponses(responses)}
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

export default connect(stateToProps , dispatchToProps)(Responses)