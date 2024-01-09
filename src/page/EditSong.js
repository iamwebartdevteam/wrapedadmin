import React from "react";
import { useState } from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from "react-dropdown-select";
import { MESSAGE, header } from "../schemas/Validation";
import { toast } from "react-toastify";
import { CheckCircle } from "react-feather";
import SongTemplete from "./Song/SongTemplete";
const initialData = {
  name: "",
  category_id: "",
  subcategory_id: "2",
  music_file: "",
  description: "",
  minutes: "",
  second: "",
  amount: "",
  mood: "",
  genre: "",
  occasion: "",
};

const EditSong = () => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [imageData, setImageData] = useState("");

  const [catagoriData, setCatagoriData] = useState([]);

  const [songThumb, setSongThumb] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [occasionData, setOccasionData] = useState("");
  const [genreData, setGenreData] = useState("");
  const [moodData, setMoodData] = useState("");
  const imageUploading = (e) => {
    let images = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageData(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const imageUploadingThum = (e) => {
    let images = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setSongThumb(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const handalerChanges = async (e) => {
    const { name, value } = e.target;
    if (name === "occasion") {
      setOccasionData(parseInt(e.target.value));
    }
    if (name === "genre") {
      setGenreData(parseInt(e.target.value));
    }
    if (name === "mood") {
      setMoodData(parseInt(e.target.value));
    }
    setFormData({ ...formData, [name]: value });
  };

  const add_subcatagori = async () => {
    const header = localStorage.getItem("_tokenCode");
    setIsLoading(true);
    const subArry = [];
    subArry.push(formData.subcategory_id);
    try {
      const reqObj = {
        name: formData.name,
        mood: typeof moodData === "number" ? moodData : "",
        occasion: typeof occasionData === "number" ? occasionData : "",
        genre: typeof genreData === "number" ? genreData : "",
        description: formData.description,
        music_file: imageData,
        amount: formData.amount,
        image: songThumb,
        id: loaction.state.id,
      };
      console.log("reqObj", reqObj);
      const response = await API.update_songs(reqObj, header);
      console.log("update_songs", response);
      if (response.data.success === 1) {
        setIsLoading(false);
        MESSAGE(response.data.msg, 1);
        navigate("/song-list");
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const commonDataTable = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.getSongByid(loaction.state.id, header);
      console.log("songList", response.data.data.categories);
      setCurrentData(response.data.data);
      setCatagoriData(response.data.data.categories);
      setFormData(response.data.data);
      if (response.data.is_login === false) {
        localStorage.removeItem("isLogin");
        if (localStorage.getItem("isLogin") === null) {
          navigate("/");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    commonDataTable();
  }, []);

  const btnDisabal =
    !formData.name ||
    !imageData ||
    !songThumb ||
    !formData.description ||
    !formData.minutes ||
    !formData.second ||
    !formData.amount;

  return (
    <>
      <div class="col-lg-12 layout-spacing">
        <div class="statbox widget box box-shadow mb-4">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Edit Music</h4>
              </div>
            </div>
          </div>

          <div class="widget-content widget-content-area">
            <div className="row">
              <div className="normal">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row ">
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
                            Occasion
                            <span class="text-danger">*</span>
                          </label>
                          <span>
                            {" "}
                            Current seletion{" "}
                            <strong className="text-danger">
                              {currentData.occasion}
                            </strong>
                          </span>

                          <select
                            className="form-control"
                            onChange={handalerChanges}
                            name="occasion"
                          >
                            <option>--- Select ---</option>
                            {catagoriData.length === 0
                              ? null
                              : catagoriData.Occasion.map((item, index) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Genre
                            <span class="text-danger">*</span>
                            <span>
                              {" "}
                              Current seletion{" "}
                              <strong className="text-danger">
                                {currentData.genre}
                              </strong>
                            </span>
                          </label>
                          <select
                            className="form-control"
                            value={formData.genre}
                            onChange={handalerChanges}
                            name="genre"
                          >
                            <option>--- Select ---</option>
                            {catagoriData.length === 0
                              ? null
                              : catagoriData.Genre.map((item, index) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Mood
                            <span class="text-danger">*</span>
                            <span>
                              {" "}
                              Current seletion{" "}
                              <strong className="text-danger">
                                {currentData.mood}
                              </strong>
                            </span>
                          </label>
                          <select
                            className="form-control"
                            onChange={handalerChanges}
                            value={formData.mood}
                            name="mood"
                          >
                            <option>--- Select ---</option>
                            {catagoriData.length === 0
                              ? null
                              : catagoriData.Mood.map((item, index) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Amount
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Hare"
                            className="form-control"
                            value={formData.amount}
                            name="amount"
                            onChange={handalerChanges}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 d-none">
                        <div class="form-group">
                          <label>
                            Minutes
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter here"
                            value={formData.minutes}
                            name="minutes"
                            onChange={handalerChanges}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 d-none">
                        <div class="form-group">
                          <label>
                            Second
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter here"
                            value={formData.second}
                            name="second"
                            onChange={handalerChanges}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Music File
                            <span class="text-danger">*</span>
                          </label>
                          <div id="dropzone">
                            <form
                              encType="multipart/form-data"
                              action="/upload"
                              class="dropzone needsclick dz-clickable"
                            >
                              <label
                                for="fileT"
                                className="dz-message needsclick"
                              >
                                <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                                <form encType="multipart/form-data">
                                  <span
                                    class={
                                      imageData
                                        ? "dz-button text-success"
                                        : "dz-button"
                                    }
                                  >
                                    {imageData ? (
                                      <span className="d-inline-block mr-2">
                                        <CheckCircle color="green" size="30" />
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {imageData
                                      ? "File Uploaded successfully"
                                      : "Upload MP3 files here"}
                                    .
                                  </span>
                                  <input
                                    hidden
                                    id="fileT"
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
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Music thumbnail
                            <span class="text-danger">*</span>
                          </label>
                          <div id="dropzone">
                            <form
                              encType="multipart/form-data"
                              action="/upload"
                              class="dropzone needsclick dz-clickable"
                            >
                              <label
                                for="file"
                                className="dz-message needsclick"
                              >
                                <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                                <form encType="multipart/form-data">
                                  <span
                                    class={
                                      songThumb
                                        ? "dz-button text-success"
                                        : "dz-button"
                                    }
                                  >
                                    {songThumb ? (
                                      <span className="d-inline-block mr-2">
                                        <CheckCircle color="green" size="30" />
                                      </span>
                                    ) : (
                                      ""
                                    )}

                                    {songThumb
                                      ? "File Uploaded successfully"
                                      : "Upload thumbnail files here"}
                                  </span>
                                  <input
                                    hidden
                                    id="file"
                                    type="file"
                                    onChange={imageUploadingThum}
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
                            Description
                            <span class="text-danger">*</span>
                          </label>
                          <textarea
                            value={formData.description}
                            name="description"
                            onChange={handalerChanges}
                            placeholder="Enter hare"
                            class="form-control"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="widget-footer">
            {isLoading ? (
              <button disabled type="reset" class="btn btn-info mr-2">
                Loading...
              </button>
            ) : (
              <button
                //disabled={btnDisabal ? true : false}
                onClick={add_subcatagori}
                type="reset"
                class="btn btn-success mr-2"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSong;
