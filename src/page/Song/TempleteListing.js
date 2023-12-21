import React from "react";
import { Edit2, PlusCircle, Trash2 } from "react-feather";
import * as API from "../../api/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { MESSAGE, header } from "../../schemas/Validation";
import { toast } from "react-toastify";
import { IMG } from "../../api/constant";
const TempleteListing = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [data, setData] = useState([]);

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.template_listing(loaction.state.id, header);
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

  const userDelete = async (songId) => {
    try {
      const response = await API.tem_delete(songId, header);
      console.log("response", response);
      if (response.data.success === 1) {
        commonDataTable();
        MESSAGE(response.data.msg);
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
            <div class="row">
              <div class="col-xl-10 col-md-10 col-sm-10 col-12">
                <h5 class="">List of Template </h5>
              </div>
              <div className="col-md-2 text-lg-right"></div>
            </div>
          </div>
          <div class="widget-content">
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content">ID</div>
                    </th>
                    <th>
                      <div class="th-content"> Name</div>
                    </th>
                    <th>
                      <div class="th-content">Template Type</div>
                    </th>

                    <th>
                      <div class="th-content">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <>
                      <h4 className="text-center">No Record found</h4>
                    </>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1} </td>
                        <td> {item.name}</td>
                        <td>
                          <p>{item.templeteType}</p>
                        </td>

                        <td width="80">
                          <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              onClick={() => userDelete(item.id)}
                              class="align-items-center btn btn-danger d-flex font-20 px-2"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempleteListing;
