import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`https://quickbite-3.onrender.com/api/createuser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        })
        const json = await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid credentials")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div>
    <div className='p-5' style={{'backgroundImage':"url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.jpg')", backgroundSize:'cover', height:'100vh'}}>
    <div className="container" style={{fontWeight:'700'}}>
      <h1 className='mb-3'>SignUp Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name='name'
            value={credentials.name}
            onChange={onChange}
            style={{width:'50%'}}
          />
        </div>
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
        <div className="mb-3 ">
          <label className="form-label" htmlFor="exampleCheck1">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name='geolocation'
            value={credentials.geolocation}
            onChange={onChange}
            style={{width:'50%'}}
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
    </div>
    </div>
  );
}

export default SignUp;
