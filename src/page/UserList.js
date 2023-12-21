import React from "react";
import * as API from "../api/index";
import { useState } from "react";
import { useEffect } from "react";
import { Edit2 } from "react-feather";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UserList = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userStas, setUserStas] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.user_listing(header);
      console.log("response", response);
      setData(response.data);
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

  const changesUserStatus = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        id: userId,
        is_active: userStas,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_status(reqObj, header);
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
        setOpen(false);
        commonDataTable();
      }
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
            <h5 class="">User List </h5>
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
                      <div class="th-content">Status</div>
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
                      <td>
                        {item.is_active ? (
                          <span class="badge badge-success">Active</span>
                        ) : (
                          <span class="badge badge-danger">In-Active</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            onClick={() => userStatus(item.id)}
                            class="align-items-center mr-2 btn btn-info d-flex font-20 px-2"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() => userDelete(item.id)}
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
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h4>Change User Status</h4>
        <select
          className="form-control mt-4"
          onChange={(e) => setUserStas(e.target.value)}
        >
          <option>--- Select ---</option>
          <option value="1">Active</option>
          <option value="0">In-active</option>
        </select>
        <button
          onClick={changesUserStatus}
          className="btn btn-success mt-3 w-100"
        >
          Submit
        </button>
      </Modal>
    </>
  );
};

export default UserList;
