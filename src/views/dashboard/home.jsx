import config from "../../config.json";
import "../../assets/styles/dashboard.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import element
import DashboardLayout from "../../layout/dashboard";
// import icon
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const DashboardHome = (props) => {
  // call function for redirect if needed
  const redirect = useNavigate();
  // get auth data
  const token = localStorage.getItem('token') || ''
  const user_id = props.session ? props.session.user_id : ''
  useEffect(() => {
    axios
        .post(
          `${config.apiUrl}/form`,
          { user_id: user_id },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if(res.status === 200){
              setSurvey(res.data.data)
              let response = 0
              res.data.data.map(s => {
                  response += s.formResponse.length
              })
              setResponses(response)
          }else{
              setSurvey([])
              setResponses(0)
          }
        }).catch(error => {
            console.log(error.message)
              // console.log(error)
              // setSurvey([])
              // setResponses(0)
        });
  } , [user_id]);

  const [responses, setResponses] = useState(0);
  const [survey, setSurvey] = useState([]);

  const deleteSurvey = (e , slug) => {
    axios.delete(`${config.apiUrl}/form/${slug}` , {
        headers: {
          Authorization:
          `Bearer ${token}`,
        }
    }).then(res=>{
        if(res.status === 200){
            e.target.parentNode.parentNode.parentNode.remove()
        }
    })
  }

  const getListSurvey = (survey) => {
    if (survey && survey.length > 0) {
      return survey.map((s , i) => {
        return (
          <div key={i} className="survey-item-box basis-1/3 box-border">
            <Link to={`/dashboard/survey/${s.formData.slug}`}>
                <div className="survey-info-wrapper">
                    <div className="title">{s.formData.title}</div>
                    <div className="description">
                        {s.formData.description}
                    </div>
                </div>
            </Link>
            <div className="survey-action flex justify-between">
              <div>
                <ChatBubbleLeftRightIcon className="w-5 h-5 inline-block mr-2" />
                {s.formResponse.length}
              </div>
              <div>
                <Link to={`/dashboard/survey/update/${s.formData.slug}`}>
                    <PencilSquareIcon className="inline-block mx-2 w-5 h-5 cursor-pointer" />
                </Link>
                <TrashIcon onClick={e => deleteSurvey(e,s.formData.slug)} className="inline-block mx-2 w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        );
      });
    } else return <center className="mt-10">No Survey</center>;
  };

  const searchForm = (e) => {
    e.preventDefault()
    const keyword = document.querySelector('#keyword').value
    axios.post(`${config.apiUrl}/forms/search` , { user_id: user_id , keyword: keyword } , {
        headers: {
          Authorization:
          `Bearer ${token}`,
          },
    }).then(res => {
        if(res.status === 200){
            setSurvey(res.data.data)
        }else{
            setSurvey([])
        }
    }).catch(error => {
        console.log(error);
        setSurvey([])
    })
  }

  return (
    <DashboardLayout>
      {console.log(survey)}
      <div className="dashboard-title">Dashboard</div>
      <div className="statistic-wrapper flex">
        <div className="statistic-box">
          <div className="statistic-title flex justify-between items-center">
            <div className="icon-box">
              <ChatBubbleLeftRightIcon className="w-7 h-7" />
            </div>
            <div className="title-text">Responses</div>
          </div>
          <div className="value">{responses}</div>
        </div>
      </div>

      <div className="data-table">
        <div className="title flex justify-between">
          <div>Last 10 Surveys</div>
          <form onSubmit={e => searchForm(e)} className="search-box-wrapper flex items-center">
            <input type="text" placeholder="Search" id="keyword" className="flex-1" />
            <button type="submit"><MagnifyingGlassIcon className="inline-block w-4 h-4" /></button>
          </form>
        </div>
        <Link to={"/dashboard/survey/create"}>
          <button className="add-survey-btn">
            <PlusIcon className="inline-block w-5 h-5 mr-1" />
            Create Survey
          </button>
        </Link>
        <div className="survey-data-wrapper flex flex-row flex-wrap">
          {getListSurvey(survey)}
        </div>
      </div>
    </DashboardLayout>
  );
};

const stateToProps = (state) => {
  return state;
};

export default connect(stateToProps)(DashboardHome);
