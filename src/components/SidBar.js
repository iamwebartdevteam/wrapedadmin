import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
const SidBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleOpenData = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <>
      <div class="sidebar-wrapper sidebar-theme">
        <nav id="sidebar">
          <ul class="list-unstyled menu-categories" id="accordionExample">
            <li class="menu">
              <NavLink
                to="/dashboard"
                class="main-item dropdown-toggle bs-tooltip"
              >
                <i class="las la-home"></i>
              </NavLink>
            </li>
            <li class="menu">
              <NavLink
                to="/user"
                class="main-item dropdown-toggle bs-tooltip"
                data-toggle="tooltip"
                data-placement="right"
                title="User List"
              >
                <i class="las la-user"></i>
              </NavLink>
            </li>
            <li class="menu">
              <NavLink
                to="/order"
                class="main-item dropdown-toggle bs-tooltip"
                data-toggle="tooltip"
                data-placement="right"
                title="Order"
              >
                <i class="las la-shopping-cart"></i>
              </NavLink>
            </li>
            <li class="menu">
              <NavLink
                to="/song-list"
                id="authPages"
                class="main-item dropdown-toggle bs-tooltip"
                data-toggle="tooltip"
                data-placement="right"
                title="Song"
              >
                <span class="new-notification"></span>
                <i class="las la-music"></i>
              </NavLink>
            </li>
            <li class="menu">
              <NavLink
                to="/categories"
                id="otherPages"
                class="main-item dropdown-toggle bs-tooltip"
                data-toggle="tooltip"
                data-placement="right"
                title="Categories"
              >
                <i class="las la-list"></i>
              </NavLink>
            </li>
            {/* <li class="menu">
              <NavLink
                to="javascript:void(0);"
                id="basicUI"
                data-original-title="Pages"
                data-placement="right"
                class="main-item dropdown-toggle bs-tooltip"
              >
                <i class="las la-file"></i>
              </NavLink>
            </li> */}

            <li class="menu">
              <NavLink
                to="/payment-history"
                id="forms"
                data-original-title="Transactions"
                data-placement="right"
                class="main-item dropdown-toggle bs-tooltip"
              >
                <i class="las la-money-bill"></i>
              </NavLink>
            </li>
            {/* <li class="menu">
              <NavLink
                to="/script-list"
                id="maps"
                data-toggle="tooltip"
                data-placement="right"
                title="Script"
                class="main-item dropdown-toggle bs-tooltip"
              >
                <i class="las la-cog"></i>
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SidBar;
