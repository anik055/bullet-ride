import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



const SignUp = () => {
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
    //   {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <input onBlur={handleBlur} placeholder='email' name="email"  ref={register} />
        
        <br/>
        <input onBlur={handleBlur} type="password" placeholder='password' name="password"  ref={register} />
        <br/>
        
        {/* include validation with required or other standard HTML validation rules */}
        {newUser && (
            <input placeholder='name' name="name" ref={register({ required: true })} />
        )}
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        {/* {newUser? <button>sign up</button>: <button>sign in</button> } */}
        <button onClick={()=>setNewUser(!newUser)}>{newUser? 'sign up': 'sign in'}</button>
        
        <input onBlur={handleBlur} type="submit" />
        <button onClick={handleGoogleSignIn}>google sign in</button>
      </form>
      
    );
};

export default SignUp;