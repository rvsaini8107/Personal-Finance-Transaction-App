import React, { useEffect } from 'react'
import Header from '../components/Header'
import SignupSigninComponent from '../components/SignupSignin'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Signup = () => {
  
  // const [user, loading] = useAuthState(auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   } else {
  //     if(!localStorage.getItem("user")){
  //       localStorage.setItem("user",true);
  //     }
  //     navigate("/dashboard");
  //   }
  //   console.log(user, "<<<<<user1");
  // }, [user, loading]);
  return (
    <div>
    {/* {loading ? <p style={{ textAlign: "center", marginTop: "20rem" }}>Loading...</p>
    : */}
      <>
        <Header/>
      <div className="wrapper">
        <SignupSigninComponent/>
      </div>
      </>
      
    {/* } */}
    </div>
  )
}

export default Signup
