import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { logIn, signUp } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await logIn(email, password);
    } else {
      await signUp(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? <input value={name} onChange={(evt) => { setName(evt.target.value) }} type="text" placeholder='Your Name' id='name' /> : <></>}
          <input value={email} onChange={(evt) => { setEmail(evt.target.value) }} type="email" placeholder='Email' />
          <input value={password} onChange={(evt) => { setPassword(evt.target.value) }} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id='remember' />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? <p>Already have an account? <span onClick={() => { setSignState("Sign In") }}>Sign In Now</span></p> : <p>New to Netflix? <span onClick={() => { setSignState("Sign Up"); }}>Sign Up Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login