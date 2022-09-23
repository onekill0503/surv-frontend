import config from '../../config.json'
import "../../assets/styles/dashboard.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// Import element
import DashboardLayout from "../../layout/dashboard";
import InputComponent from "../../components/input";
import TextareaComponent from "../../components/textarea";
// Import icon
import { DocumentIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from '@heroicons/react/24/solid';

const CreateSurvey = (props) => {
  
  // call function for redirect if needed
  const redirect = useNavigate()
  // get auth data
  const token = localStorage.getItem('token') || ''
  const user_id = props.session ? props.session.user_id : ''

  useEffect(() => {
    
  } , [])

  const [surveyName, setSurveyName] = useState();
  const [surveyDescription, setSurveyDescription] = useState();

  // commented cuz server changing

  // // function for return a value were the input type is radio or checkbox
  // const needValue = (q , parentIndex) => {
  //   if (q.type === "radio" || q.type === "checkbox") {
  //     if (q.value && q.value.length > 0) {
  //       return q.value.map((v, i) => {
  //         return (
  //           <div key={i} className="input-value-wrapper flex items-center">
  //             <input dataindex={i} parentindex={parentIndex} name={v} placeholder="" defaultValue={v} onChange={e => changeQuestionValue(e , i , parentIndex)} />
  //             <XMarkIcon
  //               className="inline-block w-5 h-5 mx-2 text-red-400"
  //               onClick={(e) => deleteValue(e , i , parentIndex)}
  //             />
  //           </div>
  //         );
  //       });
  //     } else {
  //       return "";
  //     }
  //   } else return "";
  // };

  // const valueTitle = (type , parentIndex) => {
  //   if (type === "checkbox" || type === "radio") {
  //     return (
  //       <div className={`flex justify-between`}>
  //         <div className="">Value List</div>
  //         <div>
  //           <button className="add-question" onClick={(e) => addValueEvent(e , parentIndex)}>
  //             <PlusIcon className="inline-block w-4 h-4 mr-1" />
  //             Add Value
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   } else return "";
  // };

  // const getListQuestion = (questions) => {
  //   if (questions && questions.length > 0) {
  //     return questions.map((q, i) => {
  //       return (
  //         <div key={i} dataindex={i} className="question-wrapper">
  //           <select
  //             dataindex={i}
  //             name="type"
  //             onChange={(e) => handleTypeChange(e , i)}
  //             defaultValue={q.type}
  //           >
  //             <option value={""}>-- Question Type --</option>
  //             <option value={"text"}>Text</option>
  //             <option value={"number"}>Number</option>
  //             <option value={"checkbox"}>Checkbox</option>
  //             <option value={"radio"}>Radio</option>
  //           </select>
  //           <input type={"text"} placeholder="Name" defaultValue={q.name} onChange={e => changeQuestionName(e , i)} />
  //           <input
  //             type={"text"}
  //             placeholder="Question"
  //             defaultValue={q.question}
  //             onChange={e => changeQuestion(e , i)}
  //           />
  //           {valueTitle(q.type , i)}
  //           {needValue(q , i)}
  //           <button className="px-5 py-2 bg-red-500 text-white rounded my-5" onClick={e => deleteQuestion(e , {i})}><TrashIcon className='w-4 h-4 inline-block mr-1 mb-1' /> Delete</button>
  //         </div>
  //       );
  //     });
  //   } else {
  //     return <center className="mt-10">No Questions</center>;
  //   }
  // };

  // const addQuestion = e => {
  //   let newQuestion = questions;
  //   setQuestion([]);
  //   // set new value
  //   newQuestion.data.push({type: 'text' , name: '' , description: ''})
  //   setTimeout(() => {
  //     setQuestion(newQuestion);
  //   }, 100);
  // }

  // const addValueEvent = (e , dataIndex) => {
  //   // put value to temp var
  //   let newQuestion = questions;
  //   setQuestion([]);
  //   // set new value
  //   newQuestion.data[dataIndex].value.push("");
  //   setTimeout(() => {
  //     setQuestion(newQuestion);
  //   }, 100);
  // };
  // const changeQuestionName = (e , dataIndex) => {
  //   let newQuestion = questions;
  //   // set new value
  //   newQuestion.data[dataIndex].name = e.target.value
  //   setQuestion(newQuestion)
  // }
  // const changeQuestion = (e , dataIndex) => {
  //   let newQuestion = questions;
  //   // set new value
  //   newQuestion.data[dataIndex].question = e.target.value
  //   setQuestion(newQuestion)
  // }
  // // handle were user change the value of question
  // const changeQuestionValue = (e , valueIndex , dataIndex) => {
  //   // put value to temp var
  //   let newQuestion = questions;
  //   // set new value
  //   newQuestion.data[dataIndex].value[valueIndex] = e.target.value
  //   setQuestion(newQuestion);
  // };

  // const deleteValue = (e , valueIndex , dataIndex) => {
  //   // put value to temp var
  //   let newQuestion = questions;
  //   setQuestion([]);
  //   // set new value
  //   newQuestion.data[dataIndex].value.splice(valueIndex, 1);
  //   setTimeout(() => {
  //     setQuestion(newQuestion);
  //   }, 100);
  // };
  // const deleteQuestion = (e , dataIndex) => {
  //   // put value to temp var
  //   let newQuestion = questions;
  //   setQuestion([]);
  //   // set new value
  //   newQuestion.data.splice(dataIndex , 1)
  //   setTimeout(() => {
  //     setQuestion(newQuestion);
  //   }, 100);
  // }
  // // handling when the question type is changed
  // const handleTypeChange = async (e , index) => {
  //   const value = e.target.value;
  //   let newQuestion = questions;
  //   setQuestion([]);
  //   newQuestion.data[index].type = value;
  //   newQuestion.data[index].value = [];
  //   setTimeout(() => {
  //     setQuestion(newQuestion);
  //   }, 100);
  // };

  // Function for saving the updated data
  const createSurvey = () => {
    axios.put(`${config.apiUrl}/form` , { user_id: user_id, title: surveyName , description: surveyDescription} , {headers:{
      'Authorization': `Bearer ${token}`
    }}).then(res => {
      if(res.status === 200){
        redirect('/dashboard')
      }else{
      }
    }).catch(error => {
    })
  }

  return (
    <DashboardLayout>
      <div className="dashboard-title">Create New Survey</div>
      <div className="survey-input-wrapper flex flex-wra">
        <div className="survey-information input basis-1/3 md:basis-1/3 sm:basis-1 mx-5">
          <InputComponent
            name="Survey Title"
            placeholder="Enter your survey title"
            icon={DocumentIcon}
            defaultValue={surveyName || ""}
            onChange={setSurveyName}
          />
          <TextareaComponent
            name="Survey Description"
            placeholder="Enter your survey title"
            defaultValue={surveyDescription || ""}
            onChange={setSurveyDescription}
          />
        </div>
        {/* Commented */}
        {/* <div className="input survey-questions basis-1/3 md:basis-1/3 sm:basis-1 mx-5 p-8">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">Questions List</div>
            <div>
              <button className="add-question" onClick={e => addQuestion(e)}>
                <PlusIcon className="inline-block w-4 h-4 mr-1" />
                Add Question
              </button>
            </div>
          </div>
          <div className="questions-list mt-10">
            {getListQuestion(questions.data)}
          </div>
        </div> */}
      </div>
      <button className="mt-20 px-5 py-3 bg-violet-500 text-white rounded" onClick={e => createSurvey()}>Create Survey Form</button>
    </DashboardLayout>
  );
};

const stateToProps = (state) => {
  return state;
};

export default connect(stateToProps)(CreateSurvey);
