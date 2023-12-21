import React from "react";
import { Edit2 } from "react-feather";
import * as API from "../api/index";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { header } from "../schemas/Validation";
import { toast } from "react-toastify";
import { IMG } from "../api/constant";
import Songtable from "./Songtable";
const Script = ({ setIsLogin }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
      const response = await API.script_listing(header);
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
      const response = await API.script_delete(songId, header);
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
                <h5 class="">List of Script </h5>
              </div>
              <div className="col-md-2 text-lg-right">
                <Link
                  to="/add-script"
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
                      <div class="th-content">ID</div>
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
                    {/* <th>
                      <div class="th-content">Thumbnail</div>
                    </th> */}
                    <th>
                      <div class="th-content">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <h4 className="text-center">No Record found</h4>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1} </td>
                        <td width="150"> {item.name}</td>
                        <td width="400">
                          <p>{item.description}</p>
                        </td>
                        <td width="200">
                          <ul className="p-0 moodTag">
                            {item.genere.length === 0 ? (
                              "N/A"
                            ) : (
                              <>
                                {item.genere.map((catItem, index) => (
                                  <li key={index}>
                                    {index + 1}) {catItem.subcategory.name}
                                  </li>
                                ))}
                              </>
                            )}
                          </ul>
                        </td>

                        <td width="200">
                          <ul className="p-0 moodTag">
                            {item.occation.length === 0 ? (
                              "N/A "
                            ) : (
                              <>
                                {item.occation.map((catItem, index) => (
                                  <li key={index}>
                                    {index + 1}) {catItem.subcategory.name}
                                  </li>
                                ))}
                              </>
                            )}
                          </ul>
                        </td>
                        <td width="200">
                          <ul className="p-0 moodTag">
                            {item.mood.length === 0 ? (
                              "N/A"
                            ) : (
                              <>
                                {item.mood.map((catItem, index) => (
                                  <li key={index}>
                                    {index + 1}) {catItem.subcategory.name}
                                  </li>
                                ))}
                              </>
                            )}
                          </ul>
                        </td>
                        <td>$ {item.amount}:00</td>
                        {/* <td>
                          {item.music_file === "" ? (
                            "N/A"
                          ) : item.music_file ? (
                            <i class="bi bi-music-note-beamed musicFile"></i>
                          ) : (
                            ""
                          )}
                        </td> */}

                        <td width="80">
                          <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              //onClick={() => userStatus(item.id)}
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

export default Script;
