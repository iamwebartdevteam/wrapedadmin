import React from "react";
import * as API from "../api/index";
import { useState } from "react";
import { useEffect } from "react";
import { Edit2 } from "react-feather";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PaymentHistory = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userStas, setUserStas] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.payment_history(header);
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

  const userStatus = (userIds) => {
    setOpen(true);
    setUserId(userIds);
    try {
    } catch (error) {}
  };

  const userDelete = async (useId) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.user_delete(useId);
      console.log("response", response);
      if (response.data.success === 1) {
        toast(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        commonDataTable();
      }
    } catch (error) {}
  };

  useEffect(() => {
    commonDataTable();
  }, []);
  return (
    <>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widget ecommerce-table">
          <div class="widget-heading">
            <h5 class="">Payment History</h5>
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
                      <div class="th-content">User Name</div>
                    </th>
                    <th>
                      <div class="th-content">Amount</div>
                    </th>

                    <th>
                      <div class="th-content">Status</div>
                    </th>
                    {/* <th>
                      <div class="th-content">Action</div>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td> {item.transaction_id} </td>
                      <td> {item.username} </td>
                      <td>$ {item.amount}</td>
                      <td>
                        {item.is_paid ? (
                          <span class="badge badge-success">Paid</span>
                        ) : (
                          <span class="badge badge-info">Pendding</span>
                        )}
                      </td>
                      {/* <td>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            onClick={() => userDelete(item.id)}
                            class="align-items-center btn btn-danger d-flex font-20 px-2"
                          >
                            <i class="las la-times-circle"></i>
                          </button>
                        </div>
                      </td> */}
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

export default PaymentHistory;
