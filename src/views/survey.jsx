import config from "../config.json";
import "../assets/styles/survey.css";
import { connect } from "react-redux";
// import {Link} from 'react-router-dom'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlert } from 'react-alert'
// Import Icons
import { ArrowRightIcon } from "@heroicons/react/24/solid";
// Image import
import surveyIllustration from "../assets/img/survey.gif";
// Component Import
import Header from "../components/header";
import axios from "axios";

const startSurvey = () => {
  const info = document.querySelector("div.survey-info");
  info.style.display = "none";
  const input = document.querySelector("div.survey-input");
  input.style.display = "block";
};

const Survey = (props) => {
  // set up alert function
  const alert = useAlert()
  // get slug
  const slug = useParams().slug;
  // get login token
  const token = localStorage.getItem('token') || ''
  const session = props.session ? props.session : undefined
  
  // call function for redirect if needed
  const redirect = useNavigate();
  useEffect(() => {
    if(token){
      axios.post(`${config.apiUrl}/account/retrive` , {"token": token}).then(res => {
        if(res.status === 200){
            props.handleSession(res.data.data)
        }else redirect('/auth/signin')
      }).catch(error => {
          redirect('/auth/signin')
      })
      if (slug) {
        axios
          .get(`${config.apiUrl}/form/${slug}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setSurvey(res.data.data.formData);
              console.log('running')
            }else{
              alert.show(res.data.message , {type:'error',onClose: () => {redirect('/auth/signin')}})
            }
          }).catch(error => {
            console.log(error)
              alert.show(error.response.data.message , {type:'error',onClose: () => {redirect('/auth/signin')}})
          })
      }else{
        alert.show(`Missing Slug Parameter` , {type:'error',onClose: () => {redirect('/auth/signin')}})
      }
    }else{
      alert.show(`You Need to Sign In First !` , {type:'error',onClose: () => {redirect('/auth/signin')}})
    }
  }, [slug , token]);

  const [survey, setSurvey] = useState({});
  const [response, setResponse] = useState({});
  const [name , setName] = useState('')
  const [age , setAge] = useState(0)
  const [hobby , setHobby] = useState([])
  const [job , setJob] = useState('')
  const [jobSelection , setJobSelection] = useState('')

  const changeCheckbox = (e) => {
    let newHobby = hobby
    const value = e.target.value
    const index = newHobby.indexOf(value)
    if( index < 0){
      newHobby.push(value)
    }else {
      newHobby.splice(index , 1)
    }
    setHobby(newHobby);
  };
  const changeJob = (value) => {
    setJob(value);
    setJobSelection(value);
  }

  // commented cuz server changing

  // const fetchValue = (v) => {
  //   if (v.value && v.value.length > 0) {
  //     return v.value.map((vl , i) => {
  //       return (
  //         <div key={i}>
  //           <input type={v.type} name={v.name.trim()} id={`${v.name.trim()}_${vl}`} defaultValue={vl} onChange={e => changeAnswer(v.name.trim() , e)} />{" "}
  //           <label htmlFor={`${v.name.trim()}_${vl}`}>{vl}</label>
  //         </div>
  //       );
  //     });
  //   }
  // };

  // const getQuestionsList = (survey) => {
  //   if (survey.input && survey.input.length > 0) {
  //     return survey.input.map((inpt, i) => {
  //       switch (inpt.type) {
  //         case "text":
  //           return (
  //             <div key={i} className="survey-input-box">
  //               <div className="survey-input-title">{inpt.question}</div>
  //               <input
  //                 type={"text"}
  //                 placeholder="Answer ..."
  //                 onChange={(e) => changeAnswer(inpt.name.trim() , e)}
  //               />
  //             </div>
  //           );
  //         case "number":
  //           return (
  //             <div key={i} className="survey-input-box">
  //               <div className="survey-input-title">{inpt.question}</div>
  //               <input
  //                 type={"number"}
  //                 placeholder="Answer ..."
  //                 onChange={(e) => changeAnswer(inpt.name.trim() , e)}
  //               />
  //             </div>
  //           );
  //         case "checkbox":
  //           return (
  //             <div key={i} className="survey-input-box">
  //               <div className="survey-input-title">{inpt.question}</div>
  //               {fetchValue(inpt)}
  //             </div>
  //           );
  //       case "radio":
  //           return (
  //               <div key={i} className="survey-input-box">
  //                 <div className="survey-input-title">{inpt.question}</div>
  //                 {fetchValue(inpt)}
  //               </div>
  //             );
  //         default:
  //           return <h1>Undefined Input</h1>;
  //       }
  //     });
  //   } else {
  //     return <h1>No Questions for this survey</h1>;
  //   }
  // };

  const submitSurvey = async () => {
    // change the array value to string
    axios.put(`${config.apiUrl}/response` , {
      user_id: session.user_id,
      form_slug: survey.slug,
      name: name,
      age: Number(age),
      hobby: hobby.join(','),
      job: job
    } , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      if(res.status === 200){
        alert.show(`Successfully save your response !` , {type: 'success' , onClose: () => {redirect('/dashboard/responses')}})
      }else{
        alert.show(res.data.message , {type: 'error' , onClose: () => {redirect('/dashboard')}})
      }
    }).catch(error => {
      alert.show(error.response.data.message , {type: 'error' , onClose: () => {redirect('/dashboard')}})
    })
  };

  return (
    <div>
      <div className="flex container survey-container mx-auto">
        <Header />
        <div className="flex-1 surver-wrapper m-auto">
          <div className="survey-info">
            <div className="survey-info-title">
              {survey ? survey.title : ""}
            </div>
            <div className="survey-info-description">
              {survey ? survey.description : ""}
            </div>
            <button
              onClick={(e) => startSurvey()}
              className="start bg-violet-600 text-white"
            >
              Start Survey &nbsp;
              <ArrowRightIcon className="w-5 h-5 inline-block" />
            </button>
          </div>
          <div className="survey-input">
            <div className="survey-input-box">
                <div className="survey-input-title">What is your name ?</div>
                <input
                  type={"text"}
                  placeholder="Answer ..."
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="survey-input-box">
                <div className="survey-input-title">How Old are You ?</div>
                <input
                  type={"number"}
                  placeholder="Answer ..."
                  onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className="survey-input-box">
                <div className="survey-input-title">What is Your Hobby ?</div>
                <div>
                  <input type={"checkbox"} name={`hobby-game`} id={`game`} defaultValue={'game'} onChange={e => changeCheckbox(e)} />{" "}
                  <label htmlFor={`game`}>Game</label>
                </div>
                <div>
                  <input type={"checkbox"} name={`hobby-basket`} id={`basket`} defaultValue={'basket'} onChange={e => changeCheckbox(e)} />{" "}
                  <label htmlFor={`basket`}>Basket</label>
                </div>
                <div>
                  <input type={"checkbox"} name={`hobby-traveling`} id={`traveling`} defaultValue={'traveling'} onChange={e => changeCheckbox(e)} />{" "}
                  <label htmlFor={`traveling`}>Traveling</label>
                </div>
            </div>
            <div className="survey-input-box">
                <div className="survey-input-title">What is Your Job ?</div>
                <div>
                  <input type={"radio"} name={`job-programmer`} id={`programmer`} defaultValue={'programmer'} checked={jobSelection === 'programmer'} onChange={e => changeJob(e.target.value)} />{" "}
                  <label htmlFor={`programmer`}>Programmer</label>
                </div>
                <div>
                  <input type={"radio"} name={`job-freelancer`} id={`freelancer`} defaultValue={'freelancer'} checked={jobSelection === 'freelancer'} onChange={e => changeJob(e.target.value)} />{" "}
                  <label htmlFor={`freelancer`}>Freelancer</label>
                </div>
                <div>
                  <input type={"radio"} name={`job-barista`} id={`barista`} defaultValue={'barista'} checked={jobSelection === 'barista'} onChange={e => changeJob(e.target.value)} />{" "}
                  <label htmlFor={`barista`}>Barista</label>
                </div>
                <div>
                  <input type={"radio"} name={`job-driver`} id={`driver`} defaultValue={'driver'} checked={jobSelection === 'driver'} onChange={e => changeJob(e.target.value)} />{" "}
                  <label htmlFor={`driver`}>Driver</label>
                </div>
            </div>

            {/* {getQuestionsList(survey)} */}
            <button
              onClick={(e) => submitSurvey()}
              className="start bg-violet-600 text-white"
            >
              Submit &nbsp;
              <ArrowRightIcon className="w-5 h-5 inline-block" />
            </button>
          </div>
        </div>
        <div className="flex-1 relative m-auto">
          <img src={surveyIllustration} alt="survey illustration" />
        </div>
      </div>
    </div>
  );
};

const stateToProps = (state) => {
  return state
};
const dispatchToProps = dispatch => {
  return {
      handleSession: (user) => dispatch({type: 'SAVE_SESSION' , data: user}),
      newSession: (token) => {
          localStorage.removeItem('token')
          localStorage.setItem('token' , token)
      }
  }
}

export default connect(stateToProps , dispatchToProps)(Survey);
