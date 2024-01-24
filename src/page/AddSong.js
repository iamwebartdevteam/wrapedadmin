import React from "react";
import { useState } from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useNavigate } from "react-router";
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
  genre: "",
  occasion: "",
  mood: "",
};

const AddSong = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [imageData, setImageData] = useState("");
  const [catagoriId, setCatagoriId] = useState("");
  const [catagoriData, setCatagoriData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchData2, setSearchData2] = useState([]);
  const [searchData3, setSearchData3] = useState([]);
  const [isOpen, setIsOpen] = useState(0);
  const [dataArry, setDataArry] = useState([]);
  const [moodArry, setMoodArry] = useState([]);
  const [tagArry, setTagArry] = useState([]);

  const [dataArry2, setDataArry2] = useState([]);
  const [moodArry2, setMoodArry2] = useState([]);
  const [tagArry2, setTagArry2] = useState([]);

  const [dataArry3, setDataArry3] = useState([]);
  const [moodArry3, setMoodArry3] = useState([]);
  const [tagArry3, setTagArry3] = useState([]);

  const [songThumb, setSongThumb] = useState("");

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

  const get_categoryList = async () => {
    try {
      const response = await API.get_subCategory(header);
      console.log("response", response);
      setCatagoriData(response.data.data);
    } catch (error) {}
  };

  const catagoriY = async (data) => {
    const header = localStorage.getItem("_tokenCode");
    console.log("data", data);
    if (data === "1") {
      setIsOpen("1");
      setCatagoriId(data);
      try {
        const response = await API.subCategoryId(data, header);
        console.log("response", response);
        setSearchData(response.data.data);
      } catch (error) {}
    } else if (data === "2") {
      setIsOpen("2");
      setCatagoriId(data);
      try {
        const response = await API.subCategoryId(data, header);
        setSearchData2(response.data.data);
      } catch (error) {}
    } else if (data === "3") {
      setIsOpen("3");
      setCatagoriId(data);
      try {
        const response = await API.subCategoryId(data, header);
        setSearchData3(response.data.data);
      } catch (error) {}
    }
  };

  const handalerChanges = async (e) => {
    const { name, value } = e.target;
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
        mood: formData.mood,
        occasion: formData.occasion,
        genre: formData.genre,
        description: formData.description,
        music_file: imageData,
        duration: formData.minutes + ":" + formData.second,
        amount: formData.amount,
        image: songThumb,
      };
      console.log("reqObj", reqObj);
      const response = await API.add_songs(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
        //setIsLoading(false);
        MESSAGE(response.data.msg, 1);
        navigate("/song-list");
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };

  // ? Music Tamplete

  const closeModal = () => {
    setIsOpen(false);
    //setSearchData("");
  };

  useEffect(() => {
    get_categoryList();
  }, []);

  return (
    <>
      <div class="col-lg-12 layout-spacing">
        <div class="statbox widget box box-shadow mb-4">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Add Music</h4>
              </div>
            </div>
          </div>
          <div class="widget-content widget-content-area">
            <div className="row">
              <div className="normal">
                <div className="row">
                  <div className="col-md-12">
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
                            Choose Occasion
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            onChange={handalerChanges}
                            onFocus={() => catagoriY("1")}
                            value={formData.occasion}
                            name="occasion"
                          >
                            <option>--- Select ---</option>
                            {searchData.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Choose Genre
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            onChange={handalerChanges}
                            onFocus={() => catagoriY("2")}
                            value={formData.genre}
                            name="genre"
                          >
                            <option>--- Select ---</option>
                            {searchData2.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Choose Mood
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            onChange={handalerChanges}
                            onFocus={() => catagoriY("3")}
                            value={formData.mood}
                            name="mood"
                          >
                            <option>--- Select ---</option>
                            {searchData3.map((item, index) => (
                              <option key={index} value={item.id}>
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
                            Thumbnail Image
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

                  <div className="col-md-3 d-none">
                    <h6>Occasion Tag </h6>
                    <ul className="chooesTeg">
                      {tagArry.map((item, key) => {
                        return <li key={key}>{item}</li>;
                      })}
                    </ul>
                    <h6>Genre Tag</h6>
                    <ul className="chooesTeg">
                      {tagArry2.map((item, key) => {
                        return <li key={key}>{item}</li>;
                      })}
                    </ul>
                    <h6>Mood Tag</h6>
                    <ul className="chooesTeg">
                      {tagArry3.map((item, key) => {
                        return <li key={key}>{item}</li>;
                      })}
                    </ul>
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
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSong;
