import { useEffect } from "react";
import "../styles/signUp.css";
import web from "../images/Messages-amico.png";
import web1 from "../images/google.png";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import AOS from "aos";
import "aos/dist/aos.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SignUp = (props) => {
  const { setIsAuth } = props;
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the animation duration
      easing: "ease-in-out", // You can customize the easing
    });
  }, []);
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contanier">
        <div className="navl">
          <h1 className="logo_names">QuickTalk</h1>
          <button className="sign_up" onClick={signIn}>
            Sign Up <img src={web1} alt="google_icon" className="google" />
          </button>
        </div>
        <div className="main">
          <div className="hero">
            <h1 className="tagline">
              Instant Chats, Endless Connections – Where Conversations Come
              Alive.
            </h1>
            <p className="below_tagline">
              Ready to embark on a seamless journey of instant connections?
              Click below to start chatting now and unlock a world of swift,
              meaningful conversations.
            </p>
            <div className="btn">
              <button onClick={signIn} className="started">
                Start Instant Chat
              </button>
            </div>
          </div>
          <div className="hero_img">
            <img src={web} alt="main" loading="lazy" className="image" />
          </div>
        </div>
        <div className="foot">
          <p className="about_me">Made with ❤️ by Hanish</p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
