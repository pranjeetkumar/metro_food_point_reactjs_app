import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets';
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle} from "../assets/icons";
import { motion} from "framer-motion";
import { buttonClick } from '../animations';
import { useNavigate} from "react-router-dom";


import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJwtToken } from '../api';

const Login = () => {


    const [userEmail, setuserEmail] = useState("")
    const [isSignUp, setisSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();


    const navigate = useNavigate()

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then(userCred => {
            firebaseAuth.onAuthStateChanged(cred => {
                if(cred){
                    cred.getIdToken().then(token => {
                        validateUserJwtToken(token).then(data => {
                            console.log(data);
                        })
                        navigate("/", { replace : true });
                    })
                }
            })
        })
    }

const signUpWithEmailPass = async () => {
    if(userEmail === "" || password === "" || confirm_password === "" ){
        //alert message
    }
    else{
        if(password === confirm_password){
            setuserEmail("");
            setConfirm_Password("");
            setPassword("");
            await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                firebaseAuth.onAuthStateChanged(cred => {
                    if(cred){
                        cred.getIdToken().then(token => {
                            validateUserJwtToken(token).then(data => {
                               
                                console.log(data);
                            })
                            navigate("/", { replace : true });
                        })
                    }
                })
            })
        }
        else{
            //alert message
        }
    }
}



const signInWithEmailPass = async () => {
    if(userEmail !== "" && password !== ""){
        await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
            firebaseAuth.onAuthStateChanged(cred => {
                if(cred){
                    cred.getIdToken().then(token => {
                        validateUserJwtToken(token).then(data => {
                           
                            console.log(data);
                        })
                        navigate("/", { replace : true });
                    })
                }
            })
        })
    }
    else{
        // alert message
    }
}

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
            <p className='text-xl text-textColor -mt-6'>{isSignUp ? "Sign Up" : "Sign in"}</p>

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
                    Doesn't have an account : {""} 
                    <motion.button {...buttonClick} className='text-white underline cursor-pointer bg-transparent ' onClick={() => setisSignUp(true)}>Create one</motion.button>
                </p>
                ) : (
                <p>

                    Already have an account : {""} 
                    <motion.button {...buttonClick} className='text-white underline cursor-pointer bg-transparent'onClick={() => setisSignUp(false)}>Sign in Here</motion.button>
                
                </p>
                )}


                {/* button section */}
               {isSignUp ? (
                 <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150' onClick={signUpWithEmailPass}>Sign Up
                 </motion.button>
               ): (
                <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150' onClick={signInWithEmailPass}>Sign in
                </motion.button>
               )}
            </div>
            <div className='flex items-center justify-between gap-16'>
                <div className='w-24 h-[1px] rounded-md bg-white'></div>
                <p className='text-white'>Or</p>
                <div className='w-24 h-[1px] rounded-md bg-white'></div>
            </div>


            <motion.div {...buttonClick} className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'
            onClick={loginWithGoogle}>
                <FcGoogle className='text-3xl'/>
                <p className='capitalize text-base text-headingColor'>Sign in with Google</p>
            </motion.div>
        </div>
    </div>
  )
}

export default Login;