import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";
import firebase from "firebase/app";
import "firebase/auth";
import './login.css'
import firebaseConfig from './firebase.config';
import { Form } from 'react-bootstrap';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



const SignUp = () => {

    let [error, setError]  = useState('');
    let [password,setPassword] = useState('');
    let [password2,setPassword2] = useState('');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });
    const { register, handleSubmit, watch, errors } = useForm();
    // const onSubmit = data => console.log(data);

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
    
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });
      };

    const onSubmit = data =>{
        if(newUser && data.email && data.password){
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                setUser(res);
                console.log(res);
                setLoggedInUser(res.user);
                console.log(loggedInUser);
                history.replace(from);
                updateUserName(data.name)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
                console.log(errorCode, errorMessage);
                // ..
            });
        }
        if(!newUser && data.email && data.password){
            firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
            
            console.log(res.user);
            setUser(res);
            setLoggedInUser(res.user);
            console.log(loggedInUser);
            history.replace(from);

            })
            .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            // return newUserInfo;
            console.log(error.message);
            });
        }

    }
    const handleBlur = (event) => {
        console.log(event);
        let isFormValid = true;
        if (event.target.name === "email") {
          isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
          const isPasswordValid = event.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(event.target.value);
          isFormValid = isPasswordValid && passwordHasNumber;
          // console.log(isPasswordValid);
        }
    
        if (isFormValid) {
          const newUserInfo = { ...user };
          newUserInfo[event.target.name] = event.target.value;
          setUser(newUserInfo);
          console.log(newUserInfo);
        }
      };
  
    const handleResponse = (res,redirect) => {
      setUser(res);
      setLoggedInUser(res);
      console.log(res);
      console.log(loggedInUser);
      if(redirect){
          history.replace(from);
      }
  }
  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name, value);
    if (name === 'password'){
      setPassword(value);
      console.log(value);
    }
    else if(name === 'password2'){
      setPassword2(value);
      // console.log(value);
    }
    console.log(password2);
    
  }

  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL,
          success: true,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
        // var user = result.user;
        console.log(signedInUser);
        // return signedInUser;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
    // console.log(watch("example")); // watch input value by passing the name of it
  
    return (

      <form className="login-form m-5 w-50 justify-content-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
        {newUser && (
            <input className="form-control" placeholder='name' name="name" ref={register({ required: true })} />
        )}
        </div>
        <div className="form-group">
          <input className="form-control" onBlur={handleBlur} placeholder='email' name="email"  ref={register} />
        </div>

        <div className="form-group">
          <input className="form-control" onChange={handleChange} onBlur={handleBlur} type="password" placeholder='password' name="password"  ref={register} />
        </div>
        

        <div className="form-group">
          {newUser && (
            <input className="form-control" onChange={handleChange} onBlur={handleBlur} type="password" placeholder='password' name="password2"  ref={register} />
            
          )}
          <p style={{color:'red'}}>{password && password2 && password !== password2 && 'password dont match'}</p>
        </div>
        <div style={{color:'red'}}>
          {error}
        </div>
        
        <div>
        <input onBlur={handleBlur} type="submit" value={newUser ? "Create an account" : "Log in"} />

        <p>{newUser ? 'Already have an account?' : 'Don\'t have an account?'} <button className='login' onClick={() => setNewUser(!newUser)} type="text" >{!newUser ? "create an account" : "Login"}</button> </p>

        {/* <input onBlur={handleBlur} type="submit" /> */}

        </div>
        <button className="btn" onClick={handleGoogleSignIn}>Google sign in</button>
      </form>
      
    );
};

export default SignUp;