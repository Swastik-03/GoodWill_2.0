import React, { useState } from "react";
import RegisterForm from "./components/LoginForm/RegisterForm";
import LoginFom from "./components/LoginForm/LoginFom";
import { toast } from "react-toastify";
import { loginUser, registerUser, validateEmail } from "./services/authService";
import { SAVE_USER, SET_LOGIN_USER, SET_NAME } from "./redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./components/LoginForm/LoginRegister2.css";
const register_initialState = {
  mode: "User",
  name: "",
  email: "",
  password: "",
  password2: "",
};

const log_initialState = {
  mode: "User",
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addclass, setaddclass] = useState("");
  const [secondclass, setsecondclass] = useState("");
  const [error, setError] = useState("");

  // Register
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(register_initialState);
  const { name, email, password, password2, mode } = formData;

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!mode || !email || !name || !password || !password2) {
      return toast.error("All fields are required");
    } else if (password !== password2) {
      return toast.error("passwords dont match");
    } else if (password.length < 6) {
      return toast.error("Password is not strong");
    } else if (!validateEmail(email)) {
      return toast.error("please enter a valid email");
    } else {
      const userData = {
        mode,
        name,
        email,
        password,
      };
      setIsLoading(true);
      try {
        const data = await registerUser(userData);
        console.log("hel")
        console.log(data);
        await dispatch(SET_LOGIN_USER(true));
        await dispatch(SET_NAME(data.name));
        await dispatch(SAVE_USER(data.email))
        
        if(data.mode=="User")
        {

          navigate("/user");
        }
        else if(data.mode=="Ngo")
        {
          navigate('/Ngo_dashboard');
        }
       
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };

  // login
  const [LogisLoading, setLogIsLoading] = useState(false);
  const [LogFormData, setLogFormData] = useState(log_initialState);

  const handleloginInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setLogFormData({ ...LogFormData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(LogFormData.email);

    if (!LogFormData.mode || !LogFormData.email || !LogFormData.password) {
      return toast.error("All fields are required");
      // return toast.error("All fields are required")
    } else if (!validateEmail(LogFormData.email)) {
      return toast.error("please enter a valid email");
    } else {
      const userData = {
        mode: LogFormData.mode,
        email: LogFormData.email,
        password: LogFormData.password,
      };
      setLogIsLoading(true);
      try {
        console.log("login user")


        if(LogFormData.mode=="Admin")
        {
          console.log("navigat ku nahi..");
          navigate('/Admin')
        }
        console.log("hi wtf");
        console.log(userData);
        const data = await loginUser(userData);

        // console.log(data);
        dispatch(SET_LOGIN_USER(true));
        dispatch(SET_NAME(data.name));
        dispatch(SAVE_USER(data.email));
        
        console.log(data)
        
        
        if(data.mode=="User")
        {

          navigate("/user");
        }
        else if(data.mode=="Ngo")
        {
          navigate('/Ngo_dashboard');
        }
        // else if(data.name=="Admin")
        // {
        //   navigate('/Admin')
        // }
        setLogIsLoading(false);


      } catch (error) {
        setLogIsLoading(false);
        console.log("error");
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="main_container">
      <div className={`shadow_container ${addclass} ${secondclass}`}>
        <div className="form-container  sign-up-container">
          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            register={register}
            setFormData={setFormData}
            errormessage={error}
          />
        </div>
        <div className="form-container sign-in-container">
          <LoginFom
            formData={LogFormData}
            handleInputChange={handleloginInputChange}
            login={login}
            setFormData={setLogFormData}
            errormessage={error}
          />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  setaddclass("");
                  setsecondclass("left-active");
                }}
              >
                GO TO LOGIN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  setaddclass("right-panel-active");
                  setsecondclass("");
                }}
              >
                GO TO REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
