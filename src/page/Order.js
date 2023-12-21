import React from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useState } from "react";
import OrderTable from "../components/OrderTable";
import { MESSAGE, header } from "../schemas/Validation";
import { useNavigate } from "react-router";
const Order = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [comonSataus, setComonSataus] = useState(2);
  const [data, setData] = useState([]);
  const orderDataTable = async (data) => {
    try {
      const response = await API.order_data_table(data, header);
      console.log("response", response);
      setData(response.data.data);
      if (response.data.is_login === false) {
        localStorage.removeItem("isLogin");
        setIsLogin(localStorage.removeItem("isLogin"));
        if (localStorage.getItem("isLogin") === null) {
          navigate("/");
        }
      }
    } catch (error) {}
  };

  const order_delete = async (data) => {
    try {
      const response = await API.order_delete(data, header);
      console.log("response", response);
      if (response.data.success === 1) {
        MESSAGE(response.data.data, 1);
        orderDataTable();
      }
    } catch (error) {}
  };
  useEffect(() => {
    orderDataTable();
  }, []);

  return (
    <>
      <div
        id="tabsWithIcons"
        class="col-xl-12 col-lg-12 col-md-12 layout-spacing"
      >
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h2>Order</h2>
              </div>
            </div>
          </div>

          <div class="widget-content widget-content-area rounded-corner-pills-icon">
            <ul
              class="nav nav-pills mb-4 mt-3  justify-content-center d-none"
              id="rounded-corner-pills-icon-tab"
              role="tablist"
            >
              <li class="nav-item ml-2 mr-2" onClick={() => orderDataTable(2)}>
                <a
                  class="nav-link mb-2 active text-center"
                  id="rounded-corner-pills-icon-home-tab"
                  data-toggle="pill"
                  href="#rounded-corner-pills-icon-all"
                  role="tab"
                  aria-controls="rounded-corner-pills-icon-home"
                  aria-selected="true"
                >
                  <i class="bi bi-border-style mb-0"></i> All Orders
                </a>
              </li>
              <li class="nav-item ml-2 mr-2" onClick={() => orderDataTable(0)}>
                <a
                  class="nav-link mb-2 text-center"
                  id="rounded-corner-pills-icon-home-tab"
                  data-toggle="pill"
                  href="#rounded-corner-pills-icon-home"
                  role="tab"
                  aria-controls="rounded-corner-pills-icon-home"
                  aria-selected="true"
                >
                  <i class="las la-shopping-cart"></i> In-completed Orders
                </a>
              </li>
              <li class="nav-item ml-2 mr-2" onClick={() => orderDataTable(1)}>
                <a
                  class="nav-link mb-2 text-center"
                  id="rounded-corner-pills-icon-about-tab"
                  data-toggle="pill"
                  href="#rounded-corner-pills-icon-about"
                  role="tab"
                  aria-controls="rounded-corner-pills-icon-about"
                  aria-selected="false"
                >
                  <i class="las la-check"></i> Completed Orders
                </a>
              </li>
            </ul>
            <div class="tab-content" id="rounded-corner-pills-icon-tabContent">
              <div
                class="tab-pane fade show active"
                id="rounded-corner-pills-icon-all"
                role="tabpanel"
                aria-labelledby="rounded-corner-pills-icon-home-tab"
              >
                <OrderTable
                  title="ALL Order"
                  order_delete={order_delete}
                  data={data}
                />
              </div>
              <div
                class="tab-pane fade show "
                id="rounded-corner-pills-icon-home"
                role="tabpanel"
                aria-labelledby="rounded-corner-pills-icon-home-tab"
              >
                <OrderTable title="Pending Order" data={data} />
              </div>
              <div
                class="tab-pane fade"
                id="rounded-corner-pills-icon-about"
                role="tabpanel"
                aria-labelledby="rounded-corner-pills-icon-about-tab"
              >
                <OrderTable title="Completed Order" data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
