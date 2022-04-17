import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { FaUserGraduate } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const router = useRouter();
  const [loginerror, setLoginerror] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useSWR("../api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
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
      // set cookie, 
      cookie.set("token",data.token,{ expires: 3600});
      router.push("./welcome");
      toast.success(data.message);
    } else {
      setLoginerror(true)
      toast.error(data.message);
      
    }
  }

  return (
    <>  
     {loginerror &&(<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>)}
        
      
      
    <div className="body">
      {!loggedIn && (
        <>
  
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
                {/* {router.push('/')} */}
              </form>
              <h6 className="" align="center">
                <Link className="a" href="/">
                  Forgot Password?
                </Link>
              </h6>
            </div>
         
        </>
      )}
      {loggedIn && (
        <>    
        <div className="container">
          
          <h1>Welcome {data.name}!</h1>
<div>
<Link href='/' passHref><button className="btn" onClick={()=>toast.info("Welcome to Home Page")}>
            Homepage
          </button>
          </Link>

</div>
<div>
  
          <button
            className="btn"
            onClick={() => {
              cookie.remove("token");
              toast.info("Succesfully Logout");
              router.push("/");
            }}
            >
            Logout
          </button>
                </div>
            </div>
        </>
      )}
 </div>
      <style jsx>
        {`

.body{
justify-content: center;
align-items: center;
display: flex;
min-height: 100vh;
min-width:100vw;
background: #f2f2f2;
padding-top:20vh;
// margin-top:20vh;
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




`}
      </style>
    </>
  );
};
export default Login;
