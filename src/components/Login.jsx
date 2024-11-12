
import { useState } from "react";
import Style from "../css/signup.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import jwt from "jsonwebtoken"

function Login() {

  let {register,handleSubmit, setError, formState:{errors}} = useForm()
  let navigate = useNavigate()

  let usersData = JSON.parse(localStorage.getItem("usersData"))

  let getFormData = (data)=>{
    console.log(data);
    console.log(usersData);
    let userAvailable = usersData?.find(({email})=>{
      return email==data.email
    })
    if(!userAvailable){
      console.log(userAvailable);
      setError("email", {
        type: "manual",
        message: "Email address not found. Please check your email or sign up.",
      });
    }
    else{
      if(userAvailable.password != data.password){
        console.log(userAvailable.password, data.password);
        return setError("password", {
        type: "manual",
        message: "Incorrect Password.",
      });
      }
      navigate("/events");

      // let createToken = async ()=>{
      //   let token = await jwt.sign({email:data.email, password:data.password}, "secrete", {expiresIn: "30m"})
      //   return token
      // }
      // const handleLogin = async () => {
      //   try {
      //     const token = await createToken(); 
      //     console.log(token);
      //     sessionStorage.setItem("token", token);
      //     navigate("/events");
      //   } catch (error) {
      //     console.error("Create token:", error);
      //   }
      // }
      // handleLogin()
    }
  }

  let emailValidation = {
    required: { value: true, message: "Email is required" },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email address",
    }
  };

  let passwordValidation = {
    required: { value: true, message: "Password is required" }
  };

  let dummyLogin = ()=>{
    navigate("/events")
  }

  return (
    <>
    <div className={Style.mainSignup} style={{background:"pink"}}>
    <h1 style={{color:"black"}}>SignUp or Login to See the Events</h1>
    <div className={Style.form_div}>
      <div className={Style.heading_div}>
      <NavLink to="/event_booking_app"
        className={({ isActive }) => (isActive ? `${Style.activeLink}` : "")}
        ><h1>Sign Up</h1></NavLink>
        <NavLink to="/login"
        className={({ isActive }) => (isActive ? `${Style.activeLink}` : "")}
        ><h1>Login</h1></NavLink>
      </div>
      <form onSubmit={handleSubmit(getFormData)}>
      <input type="text" placeholder="email" {...register("email",emailValidation)}/>
      <div className={Style.errors}>
      {errors.email&&"*"+errors.email?.message}
      </div>
      <input type="password" placeholder="password" {...register("password", passwordValidation)}/>
      <div className={Style.errors}>
      {errors.password&&"*"+errors.password?.message}
      </div>
      <button type="submit">Login</button>
      <button onClick={dummyLogin}>Dummy login</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default Login
