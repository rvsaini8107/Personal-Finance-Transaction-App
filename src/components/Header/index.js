import React, { useEffect } from "react";
import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "./../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import logoutIcon from "../../assist/images/logout.png";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", true);
      }
      navigate("/dashboard");
    }
    console.log(user, "<<<<<user1");
  }, [user, loading]);

  function Logout() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
          }
          toast.success("Logout Successful");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Finance</p>

      {user && (
        <div className="profile">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="profile"
            className="UserProfileImg"
          />

          {logoutIcon ? (
            <img
              src={logoutIcon}
              alt="Logout"
              onClick={() => Logout()}
              className="logout-btn"
            />
          ) : (
            "Logout"
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
