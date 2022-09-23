import '../assets/styles/app.css'
import { connect } from 'react-redux'
import Header from '../components/header'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import illustration from '../assets/img/banner_illustration.gif'
import { Link } from 'react-router-dom'
import TextLoop from "react-text-loop";


const LandingPage = (props) => {
    return (
        <div className='home-wrapper'>
            <div className='big-circle'></div>
            <div className='container h-screen mx-auto'>
                <Header />
                <div className='flex mt-32'>
                    <div className='banner-text-wrapper basis-1/2'>
                        <div className='banner-title'>Make you reach the costumer want</div>
                        <div className='banner-description mt-5'>
                            Surv App help you to reach the costumer by collecting response using form you made with us. we help you to get accurate market for your products, so you'll get more profit with it.
                        </div>
                        <Link to={'/auth/signup'}>
                            <button className='get-started-btn mt-20 mr-5'>Get Started <ArrowRightIcon className='inline-block w-4 h-4 mb-1 ml-2' /></button>
                        </Link>
                        <Link to={'/auth/signin'}>
                            <button className='sign-in-btn mt-20'>Sign In <ArrowRightIcon className='inline-block w-4 h-4 mb-1 ml-2' /></button>
                        </Link>
                    </div>
                    <div className='illustration-wrapper basis-1/2'>
                        <img src={illustration} className='mx-auto' alt='survey animation' />
                    </div>
                </div>
            </div>
        </div>
    )
}

const stateToProps = state => {
    return state
}

export default connect(stateToProps)(LandingPage);

