
import {useForm} from "react-hook-form"
import Style from "../css/signup.module.css"
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {

  let {register,handleSubmit, setError, formState:{errors}} = useForm()
  let navigate = useNavigate()
  
  let usersData = JSON.parse(localStorage.getItem("usersData")) || []

  let emailValidation = {
    required: { value: true, message: "Email is required" },
    maxLength: { value: 50, message: "Maximum 50 characters allowed" },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email address",
    }
  };

  let getFormData = (data)=>{
    console.log(data);
    console.log(usersData);
    let userAvailable = usersData.find(({email})=>{
      return email==data.email
    })
    if(userAvailable){
      console.log(userAvailable);
      setError("email", {
        type: "manual",
        message: "User already exists. Try with a different email.",
      });
      return;
    }
    usersData.push(data)
    console.log(usersData);
    localStorage.setItem("usersData",JSON.stringify([...usersData]))
    navigate("/login")
  }
  
  let passwordValidation = {
    required: { value: true, message: "Password is required" },
    minLength: { value: 6, message: "Password must be at least 6 characters" },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: "Password must contain at least one letter and one number",
    },
  };
  
  let dummyLogin = ()=>{
    navigate("/events")
  }

  return (
    <>
    <div className={Style.mainSignup}>
      <h1>SignUp or Login to See the Events</h1>
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
      <input type="text" placeholder="email" 
      {...register("email",emailValidation)}/>
      <div className={Style.errors}>
      {errors.email&&"*"+errors.email?.message}
      </div>
      <input type="password" placeholder="password" 
      {...register("password",passwordValidation)}/>
      <div className={Style.errors}>
      {errors.password&&"*"+errors.password?.message}
      </div>
      <button type="submit">Register</button>
      <button onClick={dummyLogin}>Dummy login</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default Signup
