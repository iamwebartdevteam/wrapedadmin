import React from "react";
import Order from "../page/Order";

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
          <Order />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
