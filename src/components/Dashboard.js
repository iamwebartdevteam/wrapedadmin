import React from "react";

const Dashboard = () => {
  return (
    <>
      <div class="layout-px-spacing">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="widget">
                <div class="d-flex align-items-center mb-3">
                  <div class="mr-3">
                    <span class="quick-category-icon qc-primary rounded-circle">
                      <i class="las la-shopping-cart"></i>
                    </span>
                  </div>
                  <h5 class="font-size-14 mb-0">Orders</h5>
                </div>
                <div class="text-muted mt-3">
                  <h3 class="mb-2">1,452</h3>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="widget">
                <div class="d-flex align-items-center mb-3">
                  <div class="mr-3">
                    <span class="quick-category-icon qc-primary rounded-circle">
                      <i class="las la-hand-holding-usd"></i>
                    </span>
                  </div>
                  <h5 class="font-size-14 mb-0">Profit</h5>
                </div>
                <div class="text-muted mt-3">
                  <h3 class="mb-2">$200</h3>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="widget">
                <div class="d-flex align-items-center mb-3">
                  <div class="mr-3">
                    <span class="quick-category-icon qc-primary rounded-circle">
                      <i class="las la-user"></i>
                    </span>
                  </div>
                  <h5 class="font-size-14 mb-0">Customer</h5>
                </div>
                <div class="text-muted mt-3">
                  <h3 class="mb-2">9,887</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row layout-top-spacing">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div class="widget dashboard-table">
              <div class="widget-heading">
                <h5 class="">Projects</h5>
              </div>
              <div class="widget-content">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>
                          <div class="th-content">Name</div>
                        </th>
                        <th>
                          <div class="th-content">Starts Date</div>
                        </th>
                        <th>
                          <div class="th-content">Ends on</div>
                        </th>
                        <th>
                          <div class="th-content">Team</div>
                        </th>
                        <th>
                          <div class="th-content">Status</div>
                        </th>
                        <th>
                          <div class="th-content">Client</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Android App Development</td>
                        <td>Jun 20, 2018</td>
                        <td>Dec 21, 2020</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="Jeremy Lawson"
                            >
                              <img
                                src="assets/img/profile-4.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Dino Morea"
                            >
                              <img
                                src="assets/img/profile-5.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Anna Ivanovic"
                            >
                              <img
                                src="assets/img/profile-6.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <span class="avatar-sm rounded-circle extra-group-people ml-m-12 border-width-2px border-solid border-light">
                              +4
                            </span>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-info"> Ongoing </span>
                        </td>
                        <td>RN Groups</td>
                      </tr>
                      <tr>
                        <td>Angular Frontend</td>
                        <td>Aug 23, 2019</td>
                        <td>Jan 01, 2020</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="Dean Jones"
                            >
                              <img
                                src="assets/img/profile-1.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Smirti Mandhana"
                            >
                              <img
                                src="assets/img/profile-2.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Kane Williamson"
                            >
                              <img
                                src="assets/img/profile-3.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <span class="avatar-sm rounded-circle extra-group-people ml-m-12 border-width-2px border-solid border-light">
                              +2
                            </span>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-info"> Ongoing </span>
                        </td>
                        <td>Bose</td>
                      </tr>
                      <tr>
                        <td>Java Backend</td>
                        <td>Feb 20, 2018</td>
                        <td>Dec 21, 2019</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="John Doe"
                            >
                              <img
                                src="assets/img/profile-7.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Katrina Kaif"
                            >
                              <img
                                src="assets/img/profile-8.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Risha Sengupta"
                            >
                              <img
                                src="assets/img/profile-9.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <span class="avatar-sm rounded-circle extra-group-people ml-m-12 border-width-2px border-solid border-light">
                              +9
                            </span>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-success-teal">
                            {" "}
                            Completed{" "}
                          </span>
                        </td>
                        <td>Reliance</td>
                      </tr>
                      <tr>
                        <td>AWS Server Migration</td>
                        <td>Sep 20, 2018</td>
                        <td>Mar 21, 2020</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="Kiara Lawson"
                            >
                              <img
                                src="assets/img/profile-10.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Kareena Morea"
                            >
                              <img
                                src="assets/img/profile-11.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Eli Ivanovic"
                            >
                              <img
                                src="assets/img/profile-12.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-warning"> Pending </span>
                        </td>
                        <td>Amazon</td>
                      </tr>
                      <tr>
                        <td>Firbase Backup</td>
                        <td>Jan 20, 2020</td>
                        <td>Mar 21, 2020</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="Dennis Mennace"
                            >
                              <img
                                src="assets/img/profile-13.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Gini Khurima"
                            >
                              <img
                                src="assets/img/profile-14.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-danger"> Cancelled </span>
                        </td>
                        <td>Corporation</td>
                      </tr>
                      <tr>
                        <td>iOS Swift</td>
                        <td>Jun 20, 2017</td>
                        <td>Dec 21, 2020</td>
                        <td>
                          <div class="d-flex">
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip"
                              title="Jeremy Lawson"
                            >
                              <img
                                src="assets/img/profile-4.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Dino Morea"
                            >
                              <img
                                src="assets/img/profile-5.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <a
                              href="javascript:void(0);"
                              class="bs-tooltip ml-m-12"
                              title="Anna Ivanovic"
                            >
                              <img
                                src="assets/img/profile-6.jpg"
                                class="avatar-sm rounded-circle border-width-2px border-solid border-light"
                                alt="avatar"
                              />
                            </a>
                            <span class="avatar-sm rounded-circle extra-group-people ml-m-12 border-width-2px border-solid border-light">
                              +5
                            </span>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-info"> Ongoing </span>
                        </td>
                        <td>Umbrella</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
