import React from "react";
import { useState } from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MESSAGE, header } from "../schemas/Validation";
const initialData = {
  name: "",
  logo: "",
  video: "",
  message: "",
};
const About = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const [imageData, setImageData] = useState("");
  const [video, setVideo] = useState("");
  const [catagoriData, setCatagoriData] = useState([]);

  const handalerChanges = (e) => {
    const { name, value } = e.target;
    if (name === "logo") {
      let images = e.target.files[0];
      setImageData(images);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handalerChangesv = (e) => {
    let video = e.target.files[0];
    setVideo(video);
  };

  const documentSubmit = async (e) => {
    let images = e.target.files[0];
    const formSubmitData = new FormData();
    formSubmitData.append("image", images);
    formSubmitData.append("userId", localStorage.getItem("loginId"));
    formSubmitData.append("mastertestId");

    const respons = await API.aboutus(formSubmitData);

    console.log("respons", respons);
  };

  const add_subcatagori = async () => {
    const formSubmitData = new FormData();
    formSubmitData.append("logo", imageData);
    formSubmitData.append("video", video);
    formSubmitData.append("message", formData.message);
    formSubmitData.append("title", formData.name);
    try {
      const response = await API.aboutus(formSubmitData, header);
      console.log("response", response);
      if (response.data.success === 1) {
        navigate("/about-list");
        MESSAGE(response.data.msg, 1);
      } else {
        MESSAGE(response.data.msg);
      }
    } catch (error) {}
  };

  const btnDisabal = !formData.name || !formData.details || !imageData;

  useEffect(() => {}, []);

  return (
    <>
      <div class="col-lg-12 layout-spacing">
        <div class="statbox widget box box-shadow mb-4">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>About</h4>
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
                    Logo
                    <span class="text-danger">*</span>
                    <input
                      type="file"
                      name="logo"
                      value={formData.logo}
                      className="form-control"
                      onChange={handalerChanges}
                    />
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label>
                    Video
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    className="form-control"
                    onChange={handalerChangesv}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div class="form-group">
                  <label>
                    Details
                    <span class="text-danger">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    name="message"
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

export default About;
