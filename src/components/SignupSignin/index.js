import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    console.log("signup details", name, email, password, conformPassword);
    // Authenticate the user, or basically create a new account using email & pass

    if (
      name.length !== "" &&
      email.length !== "" &&
      password.length !== "" &&
      conformPassword.length !== ""
    ) {
      if (password === conformPassword) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("new User id>>>", user);
            toast.success("Signup Successful");
            setName("");
            setEmail("");
            setPassword("");
            setConformPassword("");
            setLoading(false);
            createDoc(user);
            console.log("user", user);
            // create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // toast.error(errorCode);
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("All fields are required");
    }
  };
  function LoginWithEmail() {
    console.log("login details", email, password);
    if (email.length !== "" && password.length !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Login Successful");
          setEmail("");
          setPassword("");
          setLoading(false);

          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are required");
    }
  }
  function GoogleAuth() {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          toast.success("User Authenticated Successful");

          navigate("/dashboard");
          console.log("user>>>>Google", user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          toast.error(errorMessage, "Google Signin Error");
        });
    } catch (error) {
      console.log(error, "google Auth error");
    }
  }
  async function createDoc(user) {
    setLoading(true);
    // make sure that the doc  with uid does not exist
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });

        toast.success("Doc Created Successful");
        setLoading(false);
      } catch (error) {
        console.log(error, "this is errorrr");
        toast.error(error.message, "this is error");
        setLoading(false);
      }
    } else {
      toast.error("User already exists");
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="signup-h">
            Login on <span className="signup-h-span">Finance.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"ShriGaneshSaini123@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"ShriGaneshSaini123"}
            />

            <Button
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={() => LoginWithEmail()}
            />
            <p className="or">or</p>
            <Button
              text={loading ? "Loading..." : "Login Using Google"}
              blue="true"
              onClick={() => GoogleAuth()}
            />
            <p className="or" onClick={() => setLoginForm(!loginForm)}>
              Or Don't Have An Account? Click Here.
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="signup-h">
            Sign Up on <span className="signup-h-span">Finance.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"ShriGanesh Saini"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"ShriGaneshSaini123@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"ShriGaneshSaini123"}
            />
            <Input
              label={"Conform Password"}
              state={conformPassword}
              setState={setConformPassword}
              placeholder={"ShriGaneshSaini123"}
              type={"password"}
            />
            <Button
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={() => signupWithEmail()}
            />
            <p className="or">or</p>
            <Button
              text={loading ? "Loading..." : "Signup Using Google"}
              blue="true"
              onClick={() => GoogleAuth()}
            />
            <p onClick={() => setLoginForm(!loginForm)} className="or">
              Or Have An Account Already? Click Here.{" "}
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;
