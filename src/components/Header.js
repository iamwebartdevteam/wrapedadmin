import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const logoutButton = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(localStorage.removeItem("isLogin"));
    if (localStorage.getItem("isLogin") === null) {
      navigate("/");
    }
  };
  return (
    <>
      <div class="header-container fixed-top">
        <header class="header navbar navbar-expand-sm">
          <ul class="navbar-item flex-row ml-md-0 ml-auto theme-brand">
            <li class="nav-item align-self-center">
              <div class="d-flex flex-row align-center justify-content-center logo-area">
                <a href="index.html" class="nav-link pr-4 d-none d-md-block">
                  {" "}
                  Wrapped In Music{" "}
                </a>
              </div>
            </li>
          </ul>
          <ul class="navbar-item flex-row ml-md-auto">
            <li class="nav-item dropdown user-profile-dropdown">
              <a
                href="javascript:void(0);"
                class="nav-link dropdown-toggle user"
                id="userProfileDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <img src="assets/img/profile-16.jpg" alt="avatar" />
              </a>
              <div
                class="dropdown-menu position-absolute"
                aria-labelledby="userProfileDropdown"
              >
                <div class="nav-drop is-account-dropdown">
                  <div class="inner">
                    <div class="nav-drop-header">
                      <span class="text-primary font-15">Welcome Admin !</span>
                    </div>
                    <div class="nav-drop-body account-items pb-0">
                      <a
                        id="profile-link"
                        class="account-item"
                        href="pages_profile.html"
                      >
                        <div class="media align-center">
                          <div class="media-left">
                            <div class="image">
                              <img
                                class="rounded-circle avatar-xs"
                                src="assets/img/profile-16.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="media-content ml-3">
                            <h6 class="font-13 mb-0 strong">Sara</h6>
                            <small>Britannia</small>
                          </div>
                          <div class="media-right">
                            <i data-feather="check"></i>
                          </div>
                        </div>
                      </a>
                      <a class="account-item" href="pages_profile.html">
                        <div class="media align-center">
                          <div class="icon-wrap">
                            <i class="las la-user font-20"></i>
                          </div>
                          <div class="media-content ml-3">
                            <h6 class="font-13 mb-0 strong">My Account</h6>
                          </div>
                        </div>
                      </a>

                      <hr class="account-divider" />
                      <span class="account-item">
                        <div class="media align-center">
                          <div class="icon-wrap">
                            <i class="las la-sign-out-alt font-20"></i>
                          </div>
                          <div class="media-content ml-3">
                            <h6
                              onClick={logoutButton}
                              class="font-13 mb-0 strong "
                            >
                              Logout
                            </h6>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-item flex-row">
            <li class="nav-item dropdown header-setting">
              <a
                href="javascript:void(0);"
                class="nav-link dropdown-toggle rightbarCollapse"
                data-placement="bottom"
              >
                <i class="las la-sliders-h"></i>
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Header;
