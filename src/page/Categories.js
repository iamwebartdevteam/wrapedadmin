import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as API from "../api/index";
import { Edit2 } from "react-feather";
import { IMG } from "../api/constant";
import { toast } from "react-toastify";
import { header } from "../schemas/Validation";
const Categories = () => {
  const [isActive, setIsActive] = useState(false);
  const [categoriData, setCategoriData] = useState("");
  const [catagoriMain, setCatagoriMain] = useState([]);

  const [tableData, setTableData] = useState([]);

  const get_categoryList = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.get_subCategory(header);
      console.log("response", response);
      setCatagoriMain(response.data.data);
    } catch (error) {}
  };

  const activeButton = () => {
    setIsActive(false);
    setCategoriData("");
    getAll_subcatagori();
  };

  const getAll_subcatagori = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.getMain_subCategory(header);
      console.log("response", response);
      setTableData(response.data.data);
    } catch (error) {}
  };

  const categoriy_details = async (categoriId) => {
    const header = localStorage.getItem("_tokenCode");
    setIsActive(true);
    setCategoriData(categoriId);
    try {
      const response = await API.subCategoryId(categoriId, header);
      setTableData(response.data.data);
    } catch (error) {}
  };

  const userDelete = async (cataId) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.subCategoryId_delete(cataId, header);
      console.log("response", response);
      if (response.data.success === 1) {
        getAll_subcatagori();
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
    get_categoryList();
    getAll_subcatagori();
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
              <div class="col-xl-10 col-md-10 col-sm-10 col-12">
                <h4>Categories List</h4>
              </div>
              <div className="col-md-2 text-lg-right">
                <Link
                  to="/add-categories"
                  type="button"
                  class="btn btn-success font-20"
                >
                  <i class="las la-plus"></i>
                </Link>
              </div>
            </div>
          </div>
          <div class="widget-content catagoriy  widget-content-area rounded-corner-pills-icon">
            <ul
              class="nav nav-pills mb-4 mt-3  justify-content-center"
              id="rounded-corner-pills-icon-tab"
              role="tablist"
            >
              <li class="nav-item ml-2 mr-2">
                <span
                  onClick={activeButton}
                  class={
                    isActive
                      ? "nav-link mb-2  text-center"
                      : "nav-link mb-2 active  text-center"
                  }
                >
                  All
                </span>
              </li>
              {catagoriMain.map((item, index) => (
                <li class="nav-item ml-2 mr-2" key={index}>
                  <span
                    onClick={() => categoriy_details(item.id)}
                    class={
                      categoriData === item.id
                        ? "nav-link mb-2 active text-center"
                        : "nav-link mb-2 text-center"
                    }
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
              <div class="widget ecommerce-table">
                <div class="widget-heading">
                  <h5 class="">List of Categories </h5>
                </div>
                <div class="widget-content">
                  <div class="table-responsive text-center">
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
                            <div class="th-content">Image</div>
                          </th>
                          <th>
                            <div class="th-content">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.details}</td>
                            <td>
                              <img
                                className="w-25"
                                src={IMG + "/" + item.image}
                              />
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <Link
                                  to="/edit-categories"
                                  state={{ id: item.id }}
                                  //onClick={() => userStatus(item.id)}
                                  class="align-items-center mr-2 btn btn-info d-flex font-20 px-2"
                                >
                                  <Edit2 size={20} />
                                </Link>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
