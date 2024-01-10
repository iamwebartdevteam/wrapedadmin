import React from "react";
import { Edit2, PlusCircle, Trash2 } from "react-feather";
import * as API from "../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { header } from "../schemas/Validation";
import { toast } from "react-toastify";
import { IMG } from "../api/constant";
import Songtable from "./Songtable";
const AboutList = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.aboutusGet(header);
      console.log("songList", response);
      setData(response.data.data);
    } catch (error) {}
  };

  const userDelete = async (songId) => {
    try {
      const response = await API.aboutusDelete(songId, header);
      console.log("response", response);
      if (response.data.success === 1) {
        commonDataTable();
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
                <h5 class="">About us </h5>
              </div>
              <div className="col-md-2 text-lg-right">
                {data === "" ? (
                  <Link
                    to="/about"
                    type="button"
                    class="btn btn-success font-20"
                  >
                    <i class="las la-plus"></i>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div class="widget-content">
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content"> Title</div>
                    </th>
                    <th>
                      <div class="th-content">logo</div>
                    </th>
                    <th>
                      <div class="th-content">Video</div>
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
                  <tr>
                    <td width="150"> {data.title}</td>
                    <td width="80">
                      <img className="w-50" src={IMG + data.logo} />
                    </td>
                    <td width="150">
                      <video
                        src={IMG + data.video}
                        controls
                        width="100%"
                      ></video>
                    </td>
                    <td width="400">{data.message}</td>

                    <td width="80">
                      <div className="d-flex justify-content-center">
                        <Link
                          state={{ id: data.id }}
                          to="/edit-about"
                          className="align-items-center mr-2 btn btn-success d-flex font-20 px-2"
                        >
                          <Edit2 size={20} colo />
                        </Link>
                        <button
                          type="button"
                          onClick={() => userDelete(data.id)}
                          class="align-items-center btn btn-danger d-flex font-20 px-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutList;
