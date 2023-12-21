import React from "react";

const SubHeader = () => {
  return (
    <>
      <div class="sub-header-container">
        <header class="header navbar navbar-expand-sm justify-content-between">
          <a
            href="javascript:void(0);"
            class="sidebarCollapse"
            data-placement="bottom"
          >
            <i class="las la-bars"></i>
          </a>
          <ul class="navbar-nav flex-row">
            <li>
              <div class="page-header">
                <nav class="breadcrumb-one" aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="javascript:void(0);">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      <span>Dashboard 1</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default SubHeader;
