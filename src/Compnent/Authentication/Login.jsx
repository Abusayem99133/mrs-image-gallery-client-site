import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/signIn Image/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-ve.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AuthContext } from "./Provider/AuthProvider";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Successfully Login!");
        if (result.user) {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Failed to Login. Please check your credentials.");
      });
  };

  const handleSocialLogIn = (socialProvider) => {
    socialProvider()
      .then((result) => {
        toast.success("Successfully Login with social account!");
        if (result.user) {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error("Social login error:", error);
        toast.error("Failed to Login with social account.");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login - MRS Gallery</title>
      </Helmet>
      <div className="md:flex w-full p-5 bg-cyan-700 items-center">
        <div className="md:w-1/2">
          <img src={img} alt="Login" />
        </div>
        <div className="md:w-1/2">
          <form onSubmit={handleLogin} className="card-body">
            <h2 className="text-4xl text-white text-center shadow-sm">
              Login Now!
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="ml-60 md:ml-96 -mt-8 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn mt-6 text-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:shadow-xl hover:shadow-black text-white">
                Login
              </button>
            </div>
            <h2 className="text-white mt-4">
              Don't have an account?{" "}
              <Link className="text-teal-300 font-bold" to="/register">
                Register
              </Link>
            </h2>
            <hr className="my-4" />
            <h2 className="text-white text-center">Or Sign In With</h2>
            <div className="flex justify-center space-x-6 text-6xl  p-2 rounded-md">
              <button onClick={() => handleSocialLogIn(googleLogin)}>
                <FcGoogle />
              </button>
              {/* <button onClick={() => handleSocialLogIn(gitHubLogin)}>
                <FaGithub />
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
