import React, { useState } from "react";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import fetch from 'isomorphic-unfetch';
import useSWR from "swr";
import { FaUserGraduate } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     //call api
//     const loginApi = await fetch("../api/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     }).catch((error) => {
//       console.error("Error:",{ error});
//     });

//     let data = await loginApi.json();
//     if (data.success && data.token) {
//       //set cookie, { expires: 3600
//       Cookies.set("token", data.token);
//       console.log("YOKEN ID"+data.token);
//       // {notify}
//       toast.success(data.message);
//       // setLoginError("successful");
//       // setTimeout(() => {
//       // }, 2000);
//       Router.push("./");
//     } else {
//       toast.error(data.message);
//     }
//   }

//   const { data } = useSWR("../api/me", async function (args) {
//     const res = await fetch(args);
//     return res.json();
//   });
// //   const { dataa } =await fetch("http://localhost:3000/api/me");
// // let data = await dataa.json();
//   // console.log(data);
//   if (!data) return <h1>Loading...</h1>;
//   let loggedIn = false;
//   if (data.email) {
//     loggedIn = true;
//   }

// import {
//   absoluteUrl,
//   getAppCookies,
//   verifyToken,
//   setLogout,
// } from "../../middleware/utils";
import me from '../api/me'
 const  Login = (props) =>{
   const router=useRouter()
  const { baseApiUrl, profile } = props;
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // setError("");
  // setMessage("");

  // fields check
  // if (!roll || !password )
  //   return setError("All fields are required");
  const {data} = useSWR('../api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  console.log(data)
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }

  

  async function handleSubmit(e) {
    e.preventDefault();
    //call api
    const loginApi = await fetch("../api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials:'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((error) => {
      console.error("Error:", error);
    });
   
  let data = await loginApi.json();
  if (data.success && data.token) {
    //set cookie, { expires: 3600
    Cookies.set("token", data.token );  
    console.log(data.token);
    // setLoginError("successful");
    // router.push('./');
  }
   else {
    // setLoginError(data.message);
  }
  }

 
  return (
    <>
      { !loggedIn && (
      <>
        <div className="body">
          <ToastContainer />
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="form-icon">
                <FaUserGraduate />
              </div>
              <h3 className="title">Login</h3>
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" value="Submit" className="btn">
                login
              </button>
            </form>
            <h6 className="" align="center">
              <Link className="a" href="/">
                Forgot Password?
              </Link>
            </h6>
          </div>
{/* {router.push('./')} */}
          <style jsx>
            {`

.body{
justify-content: center;
align-items: center;
display: flex;
min-height: 100vh;
width:100vw;
background: #f2f2f2;
margin-top:20vh;
font-family: 'Russo One', sans-serif;
}
.container{

background: #ecf0f3;

padding: 40px 30px 30px 30px ;
// padding-top:20px;
border-radius: 20px;
box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
width: 350px;
}
.form-icon{

// border-radius: 150px;
// background: #13e8ec;
// box-shadow:  49px 49px 38px #085d5e,
          -49px -49px 38px #1effff;
color: #ac40ab;
font-size: 55px;
text-align: center;
line-height: 100px;
width: 100px;
height:100px;
margin: 0 auto 15px;
border-radius: 50px;
box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px #fff;
}
.title{
color: #ac40ab;
font-size: 25px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 1px;
text-align: center;
margin: 0;
padding: 0;
margin-bottom: 20px;

}
.container .form-control{
color: #333;
background: #ecf0f3;
font-size: 15px;
height: 50px;
padding: 20px;
letter-spacing: 1px;
border: none;
border-radius: 50px;
box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px #fff;
display: inline-block;
transition: all 0.3s ease 0s;
width: 100%;
margin: 0 0 25px;
outline: none;

}

::placeholder{
color: #808080;
font-size: 16px;


}
.btn{
color: #ac40ab;
background-color: #ecf0f3;
font-size: 20px;
font-weight: bold;
text-transform: uppercase;
width: 100%;
padding: 12px 15px 11px;
border-radius: 20px;
box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px #fff;
border: none;
transition: all 0.5s ease 0s;
margin: 25px 0 20px;
cursor: pointer;


}
.btn:hover{
color: orange;
} 

`}
          </style>
        </div>
       </>
        )}  
      {/* {loggedIn &&(
        <>
        logouttttttttt
        {/* </> */}
      {/* )}  */} 
       {/* { router.push("./")} */}
    </>
  );
};
export default Login;
