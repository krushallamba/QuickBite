import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";

function Login() {

  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
  
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`https://quickbite-3.onrender.com/api/loginuser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json = await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid credentials")
        }
        if(json.success){
          localStorage.setItem('userEmail',credentials.email)
          localStorage.setItem('authToken',json.authToken)
            navigate("/")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className='p-5' style={{'backgroundImage':"url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.jpg')", backgroundSize:'cover', height:'100vh'}}>
      {/* <img src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.jpg'></img> */}
      <div className='container' style={{fontWeight:'700'}}>
        <h1 className='mb-3'>Enter Login Details</h1> 
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={credentials.email}
            onChange={onChange}
            style={{width:'50%'}}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='password'
            value={credentials.password}
            onChange={onChange}
            style={{width:'50%'}}
          />
        </div>
        <button type="submit" className="m-3 btn btn-success" >
          Login
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">New user</Link>
      </form>
      </div>
    </div>
    </>
  )
}

export default Login
