import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';
// const API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5LBTb--rPVGy0bUQ8QPh1WcYgFf5SI1k';
const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputref = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler =(event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputref.current.value;
    setIsLogin(true);
    let url ;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5LBTb--rPVGy0bUQ8QPh1WcYgFf5SI1k'
    }else{
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5LBTb--rPVGy0bUQ8QPh1WcYgFf5SI1k'
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      setLoading(false);
      if(res.ok){
          return res.json();
      }else{
        return res.json().then(data=>{
          console.log(data);
          throw new Error("Authentication failed");
        })
      }
    }).then(data=>{
      console.log(data);
    }).catch(err=>{
      alert(err.message);

    })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputref}
          />
        </div>
        <div className={classes.actions}>
          {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {loading && <p>Sending Request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
