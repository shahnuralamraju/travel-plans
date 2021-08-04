import "firebase/auth";
import firebase from "firebase/app";
// import firebaseConfig from './firebase.config';
import firebaseConfig from "./firebase.Config";


export const initializeLoginFramework = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

// google Sign In 

export const handleGoogleSignIn = () => {
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    console.log("Sign In Clicked");
    return firebase.auth().signInWithPopup(googleprovider)
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
            return signedInUser; 
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}


// github Sign In  with popup

export const handleGitHubSignIn = () => {
    const gitProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(gitProvider)
        .then((result) => {
            const signedInUser = {
                isSignedIn: true,
                error: "",
                success: true
            }
            return signedInUser;
        }).catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

// createUserWithEmailAndPassword

export const createUserWithEmailAndPassword = (name, email, password) =>{
   return firebase.auth().createUserWithEmailAndPassword( email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.success = true;
          updateUserName(name)
          return newUserInfo;

        })
        .catch((error) => {
          const newUserInfo = {}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}

// signInUserWithEmailAndPassword

export const signInUserWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.success = true;
          return newUserInfo; 
        })
        .catch((error) => {
          const newUserInfo = {}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}

// sign out

export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          success:false,
          name: '',
          email: '',
          photo: ''
        }
        return signedOutUser;
      })
      .catch((error) => {
        const newUserInfo = {}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}



// updateuser name
const updateUserName = (name) => {
    
    firebase.auth().currentUser
    .updateProfile({
      displayName: name
      
    }).then(() => {
     console.log("user name updated successfully");
      
    }).catch((error) => {
      console.log(error)
    });
  }
