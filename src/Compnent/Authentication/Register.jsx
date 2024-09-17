import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import regis from "../../../assets/depositphotos_9125976-stock-photo-register-now.jpg";
import { AuthContext } from "./Provider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long!");
      return;
    } else if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo).then(() => {});
        toast.success("Successfully registered!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        toast.error("Registration failed.");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register-MRS Gallery</title>
      </Helmet>
      <div className="md:flex w-full p-5 bg-cyan-700 items-center">
        <div className="md:w-1/2">
          <img src={""} alt="Register Now" />
        </div>
        <div className="md:w-1/2">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-4xl text-white text-center shadow-sm">
              Register Now
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="photo"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
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
              <button className="btn mt-6 text-2xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:shadow-xl hover:shadow-black text-white">
                Register
              </button>
            </div>
            <hr className="my-5" />
            <h2 className="text-white">
              Already have an account?{" "}
              <Link className="text-teal-200 text-center font-bold" to="/login">
                Login
              </Link>
            </h2>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
