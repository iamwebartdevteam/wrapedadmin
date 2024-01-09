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
const Song = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log("data", data);
  const orderDataTable = async (data) => {
    try {
      const response = await API.song_listing(data, header);
      console.log("response", response);
      setData(response.data.data);
    } catch (error) {}
  };

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.song_listing(header);
      console.log("songList", response);
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

  const userDelete = async (songId) => {
    try {
      const response = await API.song_delete(songId, header);
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
                <h5 class="">List of Music </h5>
              </div>
              <div className="col-md-2 text-lg-right">
                <Link
                  to="/add-music"
                  type="button"
                  class="btn btn-success font-20"
                >
                  <i class="las la-plus"></i>
                </Link>
              </div>
            </div>
          </div>
          <div class="widget-content">
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content">ID d</div>
                    </th>
                    <th>
                      <div class="th-content"> Title</div>
                    </th>
                    <th>
                      <div class="th-content">Details</div>
                    </th>
                    <th>
                      <div class="th-content">Genre</div>
                    </th>
                    <th>
                      <div class="th-content">Occasion</div>
                    </th>
                    <th>
                      <div class="th-content">Mood</div>
                    </th>
                    <th>
                      <div class="th-content">Amount</div>
                    </th>
                    {/* <th>
                      <div class="th-content">File</div>
                    </th> */}
                    <th>
                      <div class="th-content">Thumbnail</div>
                    </th>
                    {/* <th>
                      <div class="th-content">Templete</div>
                    </th> */}
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
                        <td width="150"> {item.name}</td>
                        <td width="400">
                          <p>{item.description}</p>
                        </td>
                        <td width="200">
                          <ul className="p-0 moodTag">{item.genre}</ul>
                        </td>

                        <td width="200">
                          <ul className="p-0 moodTag">{item.occasion}</ul>
                        </td>
                        <td width="200">
                          <ul className="p-0 moodTag">{item.mood}</ul>
                        </td>
                        <td>$ {item.amount}:00</td>

                        <td>
                          <img className="w-75" src={IMG + item.image} />
                        </td>
                        <td width="80">
                          <div className="d-flex justify-content-center">
                            <Link
                              state={{ id: item.id }}
                              to="/add-templete"
                              //onClick={() => userStatus(item.id)}
                              class="align-items-center mr-2 btn btn-info d-flex font-20 px-2"
                            >
                              <PlusCircle size={20} />
                            </Link>
                            <Link
                              state={{ id: item.id }}
                              to="/edit-song"
                              className="align-items-center mr-2 btn btn-success d-flex font-20 px-2"
                            >
                              <Edit2 size={20} colo />
                            </Link>
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

export default Song;
