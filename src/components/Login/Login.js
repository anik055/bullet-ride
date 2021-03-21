import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from 'react-hook-form';
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";
import './login.css'
import SignUp from "./SignUp";

const Login = () => {
  const { register, watch, errors } = useForm();

    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
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

  const handleSubmit = (event) => {
      console.log(user);
    if (newUser && user.email && user.password) {
        console.log('anik');
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
        console.log(res);
      })
    }

    if (!newUser && user.email && user.password) {
        console.log('zaman');
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        console.log(res);
        handleResponse(res, true);
      })
    }
    event.preventDefault();
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

const handleBlur = (event) => {
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
    }
  };

  return (
    <div>
      <h1>{newUser ? 'Create new account' : 'Login'}</h1>
      <SignUp/>
      
      
      <form className="login-form" onSubmit={handleSubmit} action="">
        {newUser && (
            <div>
                <p>name</p>
                <input
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  placeholder="write your name"
                  required
                />
                {/* <input onBlur={handleBlur} name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name" />
      {errors.name && <span className="error">name is required</span>} */}
            </div>
        )}
        <p>Email</p>
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="write your email address"
          required
        />
        {/* <input onBlur={handleBlur} name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your email" />
      {errors.email && <span className="error">email is required</span>}

      <input onBlur={handleBlur} name="password" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your password" />
      {errors.password && <span className="error">password is required</span>} */}
      {/* <input name="password" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your password" />
      {errors.password && <span className="error">password is required</span>} */}
        <p>Password</p>
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="your password"
          required
        />
        
        
      
      <br/>
        <input onBlur={handleBlur} type="submit" value={newUser ? "Create an account" : "Log in"} />
        <p>{newUser ? 'Already have an account' : 'Don\'t have an account?'} <button className='login' onClick={() => setNewUser(!newUser)} type="text" >{!newUser ? "create an account" : "Login"}</button> </p>
        {/* <p>{newUser ? 'Already have an account?' : 'Don\'t have an account?'} <a href="#"> <span onClick={() => setNewUser(!newUser)} type="text" >{!newUser ? "create an account" : "Login"}</span> </a> </p> */}
        
      </form>
      <br/>
      <button onClick={handleGoogleSignIn}>google sign in</button>
    </div>
  );
};

export default Login;
