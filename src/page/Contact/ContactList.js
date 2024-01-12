import React from "react";
import * as API from "../../api/index";
import { useEffect } from "react";
import { useState } from "react";

import { MESSAGE, header } from "../../schemas/Validation";
import { useNavigate } from "react-router";
const ContactList = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [comonSataus, setComonSataus] = useState(2);
  const [data, setData] = useState([]);
  const orderDataTable = async () => {
    try {
      const response = await API.contactGet(header);
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
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget ecommerce-table">
          <div class="widget-heading">
            <h5 class="">Enquiry list </h5>
          </div>
          <div class="widget-content">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content">ID</div>
                    </th>
                    <th>
                      <div class="th-content">Name</div>
                    </th>
                    <th>
                      <div class="th-content">Email</div>
                    </th>
                    <th>
                      <div class="th-content">Phone No</div>
                    </th>
                    <th>
                      <div class="th-content">Address</div>
                    </th>
                    <th>
                      <div class="th-content">Details</div>
                    </th>
                    <th>
                      <div class="th-content">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr>
                      <td>{index + 1} </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone === "" ? "N/A" : item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.message}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            //onClick={() => userDelete(item.id)}
                            class="align-items-center btn btn-danger d-flex font-20 px-2"
                          >
                            <i class="las la-times-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactList;
