import React,{useRef, useContext} from 'react';
import AuthContext from '../../Store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const SubmitHandler= event =>{
    event.preventDefault();

    const eneteredNewPassword = newPasswordInputRef.current.value;
    //add validation 

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5LBTb--rPVGy0bUQ8QPh1WcYgFf5SI1k',{
      method:'POST',
      body:JSON.stringify({
        idToken: authCtx.token,
        password : eneteredNewPassword,
        returnSecureToken : false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      //asumption always succeeds
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
