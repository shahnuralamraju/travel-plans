import firebase from "firebase/app";
import './Login.css';
import "firebase/auth";
import firebaseConfig from './firebase.Config'
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    success: false,
    isSignedIn: false,
    error: "",
    name: "",
    email: "",
    password: ""
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // gitHub signIN

  const gitProvider = new firebase.auth.GithubAuthProvider();
  const handleGitHubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        const signedInUser = {
          isSignedIn: true,
          error: "",
          success: true
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
        console.log(result);
      }).catch((error) => {
        const newUserInfo = { ...user }
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
  }



  // google login

  const googleprovider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    console.log("Sign In Clicked");
    firebase.auth().signInWithPopup(googleprovider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          error: "",
          success: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch(error => {
        const newUserInfo = { ...user }
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      })
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }


  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      console.log('submitting');
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);

        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.name = res.user.displayName ;
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          // console.log("sign in user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(() => {
     console.log("user name updated successfully")
    }).catch((error) => {
      console.log(error)
    });
  }


  return (
    <div className="main-card">
      <div className="card">
        <div className="inner-box">
          <h2 className="title">{newUser ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={handleSubmit} >
          
            {newUser && <input onBlur={handleBlur}type="text" name="name" className="input-box" placeholder="Name" required />}
            <input onBlur={handleBlur} type="text" name="email" className="input-box" placeholder="Email" required />
            <input onBlur={handleBlur} type="password" name="password" className="input-box" placeholder="Password" required />
            <input type="submit" value={newUser?'Sign Up':'Sign In'} className="submit" />
          </form>
          <div className="span-container">
            <span className="left">{newUser ? "Already Have An Account?" : "Create New Account?"}</span>
            <span onClick={() => setNewUser(!newUser)} className="right">{!newUser ? "Sign Up" : "Sign In"}</span>
          </div>
          <div className="social-container">
            <p onClick={handleGoogleSignIn}><span className="spanGoogle"><FontAwesomeIcon icon={faGoogle} /></span> <span>Continue with Google</span></p>
            <p onClick={handleGitHubSignIn}><span className="spanGit"><FontAwesomeIcon icon={faGithub} /></span> <span>Continue with GitHub</span></p>

          </div>
        </div>
      </div>
      <p className="error-message">{user.error}</p>
      {user.success && <p className="success-message">Successfully {newUser ? "Create" : "Signed In"} Your Account</p>}
    </div>
  );
};

export default Login;
