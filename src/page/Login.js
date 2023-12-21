import React from "react";
import * as API from "../api/index";
import { useFormik } from "formik";
import { MESSAGE, loginSchema } from "../schemas/Validation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initialValues = {
  email: "",
  password: "",
};
const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        loginSubmit(values);
      },
    });

  const loginSubmit = async (data) => {
    localStorage.setItem("isLogin", true);
    try {
      const response = await API.user_registration(data);
      if (response.data.success === 1) {
        localStorage.setItem("isLogin", true);
        setIsLogin(localStorage.getItem("isLogin"));
        const headerObj = {
          Authorization: `Bearer ${response.data.token_code}`,
        };
        localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
        navigate("/dashboard");
        MESSAGE(response.data.msg, 1);
      } else {
        MESSAGE(response.data.msg);
      }
    } catch (error) {}
  };

  return (
    <>
      <div class="container-fluid login-three-container">
        <div class="row main-login-three">
          <div class="col-xl-3 col-lg-3 col-md-2 d-none d-md-block p-0">
            <div class="login-bg"></div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="d-flex flex-column justify-content-between h-100 center-area">
              <a>Login</a>
              <div>
                <p class="text-dark">Welcome Back</p>
                <h2 class="text-black">Login to your admin panel</h2>
              </div>
              <p class="text-dark d-none d-md-block m-0">Social Network</p>
            </div>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-6">
            <div class="d-flex flex-column justify-content-between h-100 right-area">
              {/* <a
                class="btn btn-sm w-25 bg-gradient-primary text-white ml-auto"
                href="#"
              >
                Sign up
              </a> */}
              <div>
                <form onSubmit={handleSubmit}>
                  <div class="login-three-inputs mt-5">
                    <input
                      type="text"
                      placeholder="Username"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <i class="las la-user-alt"></i>
                    {touched.email && errors.email ? (
                      <>
                        <p className="errorMess text-danger">{errors.email}</p>
                      </>
                    ) : null}
                  </div>
                  <div class="login-three-inputs mt-3">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <i class="las la-lock"></i>
                    {touched.password && errors.password ? (
                      <>
                        <p className="errorMess text-danger">
                          {errors.password}
                        </p>
                      </>
                    ) : null}
                  </div>
                  <div class="login-three-inputs check mt-4">
                    <input class="inp-cbx" id="cbx" type="checkbox" hidden />
                    <label class="cbx" for="cbx">
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span class="font-13 text-muted">Remember me ?</span>
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-4">
                    <button class="text-white btn bg-gradient-primary">
                      Login <i class="las la-key ml-2"></i>
                    </button>
                    <Link class="font-13 text-primary" to="#">
                      Forgot your Password ?
                    </Link>
                  </div>
                </form>
              </div>
              <div class="login-three-social social-logins mt-4">
                <div class="social-btn bg-gradient-primary">
                  <a href="#" class="fb-btn">
                    <i class="lab la-facebook-f"></i>
                  </a>
                </div>
                <div class="social-btn bg-gradient-primary">
                  <a href="#" class="twitter-btn">
                    <i class="lab la-twitter"></i>
                  </a>
                </div>
                <div class="social-btn bg-gradient-primary">
                  <a href="#" class="google-btn">
                    <i class="lab la-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
