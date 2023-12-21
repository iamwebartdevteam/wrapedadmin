import React from "react";
import { useState } from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { header } from "../schemas/Validation";
const initialData = {
  name: "",
  details: "",
};
const EditCategoris = () => {
  const location = useLocation();
  console.log("location", location.state.id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const [imageData, setImageData] = useState("");
  const [catagoriId, setCatagoriId] = useState("");
  const [catagoriData, setCatagoriData] = useState([]);

  const imageUploading = (e) => {
    let images = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageData(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const get_categoryList = async () => {
    try {
      const response = await API.get_subCategory(header);
      setCatagoriData(response.data.data);
    } catch (error) {}
  };

  const handalerChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (e.target.name === "category_id") {
      setCatagoriId(e.target.value);
    }
  };

  const get_categorisByid = async () => {
    try {
      const response = await API.subCategoryId_editGet(
        location.state.id,
        header
      );
      console.log("response", response);
      setFormData(response.data.data);
    } catch (error) {}
  };

  const add_subcatagori = async () => {
    console.log("catagoriId", catagoriId);
    try {
      const reqObj = {
        name: formData.name,
        details: formData.details,
        category_id: catagoriId === "" ? formData.catagoriId : catagoriId,
        image: imageData,
        id: location.state.id,
      };
      console.log("reqObj", reqObj);
      const response = await API.subCategoryId_edit(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
        navigate("/categories");
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

  //const btnDisabal = !formData.name || !formData.details || !imageData;

  useEffect(() => {
    get_categoryList();
    get_categorisByid();
  }, []);

  return (
    <>
      <div class="col-lg-12 layout-spacing">
        <div class="statbox widget box box-shadow mb-4">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Edit Categories</h4>
              </div>
            </div>
          </div>
          <div class="widget-content widget-content-area">
            <div className="row">
              <div className="col-md-6">
                <div class="form-group">
                  <label>
                    Title
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter here"
                    value={formData.name}
                    name="name"
                    onChange={handalerChanges}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label>
                    Choose category
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    onChange={handalerChanges}
                    name="category_id"
                    class="form-control"
                    value={formData.category_id}
                  >
                    <option>--- Select ---</option>
                    {catagoriData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div class="form-group">
                  <label>
                    Images
                    <span class="text-danger">*</span>
                  </label>
                  <div id="dropzone">
                    <form
                      encType="multipart/form-data"
                      action="/upload"
                      class="dropzone needsclick dz-clickable"
                    >
                      <label for="file" className="dz-message needsclick">
                        <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                        <form encType="multipart/form-data">
                          <span class="dz-button">Upload files here.</span>
                          <br />
                          <span class="note needsclick">
                            (This is a Uploadzone. Browse your files)
                          </span>

                          <input
                            hidden
                            id="file"
                            type="file"
                            onChange={imageUploading}
                            class="image-preview-filepond"
                          />
                        </form>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div class="form-group">
                  <label>
                    Details
                    <span class="text-danger">*</span>
                  </label>
                  <textarea
                    value={formData.details}
                    name="details"
                    onChange={handalerChanges}
                    placeholder="Enter hare"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="widget-footer text-right">
            <button
              //disabled={btnDisabal ? true : false}
              onClick={add_subcatagori}
              type="reset"
              class="btn btn-success mr-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategoris;
