import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import mainStore from './redux'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// views import

import LandingPage from './views/app.jsx'

// Auth Views
import SignInPage from './views/signIn'
import SignUpPage from './views/signUp'

// Survey View
import SurveyPage from './views/survey'

// Dashboard Views
import DashboardHome from './views/dashboard/home'
import SurveyDashboard from './views/dashboard/survey'
import SurveyCreate from './views/dashboard/create_survey'
import SurveyUpdate from './views/dashboard/update_survey'
import UserSettings from './views/dashboard/user_setting'
import UserResponses from './views/dashboard/responses'

// Alert Configuration
const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <Provider store={mainStore}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='*' element={(<h1>Not Found :)</h1>)} />
            {/* Auth Route */}
            <Route path='/auth'>
              <Route path='/auth/signin' element={<SignInPage />} />
              <Route path='/auth/signup' element={<SignUpPage />} />
            </Route>
            {/* Survey Route */}
            <Route path='/survey/:slug' element={<SurveyPage />} />
            {/* Dashboard Route */}
            <Route path='/dashboard'>
              <Route index element={<DashboardHome />} />
              <Route path='/dashboard/survey/:slug' element={<SurveyDashboard />} />
              <Route path='/dashboard/survey/update/:slug' element={<SurveyUpdate />} />
              <Route path='/dashboard/survey/update' element={(<h1>Not Found :)</h1>)} />
              <Route path='/dashboard/survey/create' element={<SurveyCreate />} />
              <Route path='/dashboard/settings' element={<UserSettings />} />
              <Route path='/dashboard/responses' element={<UserResponses />} />
            </Route>
          </Routes>
        </AlertProvider>
      </Provider>  
      {/* </AlertProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
