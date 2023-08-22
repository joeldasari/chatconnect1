import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookie from "universal-cookie";
import img from "../assets/signin.png";
const cookies = new Cookie();

export const Auth = (props) => {
  const { setTest } = props;
  const handleBtn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("authToken", result.user.refreshToken);
      setTest(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <div className="formitems">
        <span>ChatConnect</span>
        <p>Sign In with Google to continue</p>
        <div className="buttondiv">
          <button
            style={{ display: "none" }}
            id="signinbtn"
            onClick={handleBtn}
          >
            Sign In with Google
          </button>
          <label htmlFor="signinbtn">
            <img src={img} alt="signin" />
          </label>
        </div>
      </div>
    </div>
  );
};
