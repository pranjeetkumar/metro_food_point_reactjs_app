import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets';
import { LoginInput } from "../components";
import { FaEnvelope, FaLock} from "../assets/icons";
import { motion} from "framer-motion";
import { buttonClick } from '../animations';

const Login = () => {


    const [userEmail, setuserEmail] = useState("")
    const [isSignUp, setisSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");



  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        {/* background image */}
        <img src={LoginBg} className='w-full h-full object-cover absolute top-0 left-0 ' alt="" />

        { /* content box */}
        <div className='flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-sm p-4 px-4 py-12 gap-6'>

            {/* Top Logo Section */}

            <div className='flex items-center justify-start gap-4 w-full'>
                <img src={Logo}className ='w-14' alt=''/>
                <p className='text-headingColor font-semibold text-xl'>Welcome to</p>
            </div>

            {/* Welcome text */}

            <p className='text-3xl font-semibold text-headingColor'>Metro Food Point</p>
            <p className='text-xl text-textColor -mt-6'>Sign in</p>

            {/* input section */}
            <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
                <LoginInput placeHolder={"Email"} icon={< FaEnvelope className='text-xl text-textColor'/>} inputState={userEmail} inputStateFunc={setuserEmail} type="email" isSignUp={isSignUp}/>

                <LoginInput placeHolder={"Password"} icon={< FaLock className='text-xl text-textColor'/>} inputState={password} inputStateFunc={setPassword} type="password" isSignUp={isSignUp}/>

                {isSignUp && (
                    <LoginInput placeHolder={"Confirm Password"} icon={< FaEnvelope className='text-xl text-textColor'/>} inputState={confirm_password} inputStateFunc={setConfirm_Password} type="password" isSignUp={isSignUp}
                    />
                )}


                {!isSignUp ? (
                <p>
                    Doesn't have an account : <motion.button {...buttonClick}>Create one</motion.button>
                </p>
                ) : (
                <p></p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Login;