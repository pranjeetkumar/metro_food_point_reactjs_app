import React, { useState } from 'react';


const LoginInput = ({placeHolder, icon, inputState, inputStateFunc, type, isSignUp}) => {



  const [isFocus, setisFocus] = useState(false);

  return (
    <div className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${isFocus ? "shadow-md shadow-red-500" : "shadow-none"}`}>
      {icon}
      <input type={type} placeholder={placeHolder} className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none' 
      value={inputState}
      onChange={(e) => inputStateFunc(e.target.value)}
      onFocus={() => setisFocus(true)}
      onBlur={() => setisFocus(false)}
      />
    </div>
  )
};

export default LoginInput