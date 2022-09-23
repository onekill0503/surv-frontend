import config from "../../config.json";
import "../../assets/styles/dashboard.css";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'
// Import element
import DashboardLayout from "../../layout/dashboard";
// Import Icons
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
const Survey = (props) => {
  // set up alert function
  const alert = useAlert()
  // get slug
  const slug = useParams().slug;
  // call function for redirect if needed
  const redirect = useNavigate();
  // get auth data
  const token = localStorage.getItem('token') || ''
  const user_id = props.session ? props.session.user_id : ''

  useEffect(() => {
    if(user_id){
      axios.get(`${config.apiUrl}/form/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if(res.data.data){
            if(user_id === res.data.data.formData.user_id){
              setSurvey(res.data.data);
            }else{
              alert.show(`This is Not your form` , {type:'error' , onClose: () => {redirect('/dashboard')}})
            }
          }else {
            alert.show(`No records !` , {type:'error' , onClose: () => {redirect('/dashboard')}})
          }
        } else {
          alert.show(res.data.message , {type:'error' , onClose: () => {redirect('/dashboard')}})
        }
      })
      .catch((error) => {
        alert.show(error.response.data.message , {type:'error' , onClose: () => {redirect('/dashboard')}})
      });
    }
  }, [user_id]);

  const [survey, setSurvey] = useState({});

  const deleteSurvey = (slug) => {
      axios.delete(`${config.apiUrl}/form/${slug}` , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res=>{
        if(res.status === 200){
          alert.show(res.data.message , {type:'success' , onClose: () => {redirect('/dashboard')}})
        }else{
          alert.show(res.data.message , {type:'error' , onClose: () => {redirect('/dashboard')}})
        }
    }).catch(error => {
      alert.show(error.response.data.message , {type:'error' , onClose: () => {redirect('/dashboard')}})
    })
  };

  // commented cuz server changing

  // const getTableHeaders = (input) => {
  //   if(input && input.length > 0){
  //     return input.map((inpt , i) => {
  //       return <td key={i}>{inpt.name}</td>
  //     })
  //   }
  // }

  // const getResponseValue = (data) => {
  //   if(survey.responses && survey.responses.length > 0){
  //     return survey.input.map((inpt , i) => {
  //       return (<td key={inpt.name.trim() + i}>{data.response[inpt.name.trim()]}</td>)
  //     })
  //   }else return ''
  // }

  const getListResponses = (responses) => {
    console.log(responses);
    if (responses.formResponse && responses.formResponse.length > 0) {
      return responses.formResponse.map((res , i) => {
        return (
          <tr key={i} id={`response${i}`}>
            <td>{i+1}</td>
            <td>{res.name}</td>
            <td>{res.age}</td>
            <td>{res.hobby}</td>
            <td>{res.job}</td>
            <td>
              <TrashIcon onClick={e => deleteResponse(responses.formData.user_id,res.user_id , responses.formData.slug , i)} className="w-4 h-4 inline-block text-red-600" />
            </td>
          </tr>
        );
      });
    } else return (<tr><td>No Response</td></tr>);
  };

  const deleteResponse = (owner_id , user_id , slug , i) => {
    console.log(user_id , slug);
    const currentRow = document.querySelector(`#response${i}`)
    const tbody = document.querySelector('tbody')
    axios.delete(`${config.apiUrl}/response` , {
      data: {
        owner_id: owner_id,
        user_id : user_id,
        slug: slug
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      if(res.status === 200){
        currentRow.remove()
        if(tbody.children.length < 1){
          tbody.append('No Response')
        }
      }
    })
  }

  return (
    <DashboardLayout>
      <div className="survey-title-name">
        <span className="block">{survey.formData ? survey.formData.title : ''}</span>
        <ChatBubbleLeftRightIcon className="w-4 h-4 inline-block mr-1" />
        {survey.formResponse ? survey.formResponse.length : 0}
      </div>
      <div className="survey-description mt-5">
        {survey.formData ? survey.formData.description : ''}
      </div>
      <div className="survey-action-button mt-10">
        <Link to={`/dashboard/survey/update/${survey.formData ? survey.formData.slug : ''}`}>
          <button className="text-white px-5 py-2 mr-3 bg-violet-600 rounded">
            Update Details
          </button>
        </Link>
        <button
          onClick={(e) => deleteSurvey(survey.formData ? survey.formData.slug : '')}
          className="text-white px-5 py-2 mr-3 bg-red-600 rounded"
        >
          Delete Survey
        </button>
      </div>
      <hr className="my-10" />
      <div className="data-table">
        <div className="title flex justify-between">
          <div>Responses Result</div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Age</td>
              <td>Hobby</td>
              <td>Job</td>
              <td className="table-item-action"></td>
            </tr>
          </thead>
          <tbody>
            {getListResponses(survey)}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

const stateToProps = (state) => {
  return state;
};

export default connect(stateToProps)(Survey);
