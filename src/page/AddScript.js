import React from "react";
import { useState } from "react";
import * as API from "../api/index";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from "react-dropdown-select";
import { header } from "../schemas/Validation";
import { toast } from "react-toastify";
import { CheckCircle } from "react-feather";
const initialData = {
  name: "",
  category_id: "",
  subcategory_id: "2",
  music_file: "",
  description: "",
  minutes: "",
  second: "",
  amount: "",
};

const AddScript = () => {
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

  const onChaeckBox = async (idData, moodTag) => {
    moodArry.includes(moodTag) == false
      ? moodArry.push(moodTag)
      : delete moodArry[moodArry.indexOf(moodTag)];
    setTagArry(moodArry);
    setIsOpen(false);
    dataArry.includes(idData) == false
      ? dataArry.push(idData)
      : delete dataArry[dataArry.indexOf(idData)];
  };

  const onChaeckBox2 = async (idData, moodTag) => {
    moodArry2.includes(moodTag) == false
      ? moodArry2.push(moodTag)
      : delete moodArry2[moodArry2.indexOf(moodTag)];
    setTagArry2(moodArry2);
    setIsOpen(false);
    dataArry2.includes(idData) == false
      ? dataArry2.push(idData)
      : delete dataArry2[dataArry2.indexOf(idData)];
  };

  const onChaeckBox3 = async (idData, moodTag) => {
    moodArry3.includes(moodTag) == false
      ? moodArry3.push(moodTag)
      : delete moodArry3[moodArry3.indexOf(moodTag)];
    setTagArry3(moodArry3);
    setIsOpen(false);
    dataArry3.includes(idData) == false
      ? dataArry3.push(idData)
      : delete dataArry3[dataArry3.indexOf(idData)];
  };

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

  const handalerChangesCata = async (e) => {
    setCatagoriId(e.target.value);
    try {
      const response = await API.subCategoryId(e.target.value, header);
      console.log("responseSSS", response);
      setSearchData(response.data.data);
    } catch (error) {}
  };

  const catagoriY = async (data) => {
    const header = localStorage.getItem("_tokenCode");
    if (data === "1") {
      setIsOpen("1");
      setCatagoriId(data);
      try {
        const response = await API.subCategoryId(data, header);
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

  const moodTegSearch = async (e) => {
    try {
      const reqObj = {
        category_id: catagoriId,
        search_term: e.target.value,
      };
      const response = await API.moodTagSearchApi(reqObj, header);
      if (response.data.success === 1) {
        setSearchData(response.data.data);
      }
    } catch (error) {}
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
        mood: dataArry3,
        occasion: dataArry2,
        genre: dataArry,
        description: formData.description,
        amount: formData.amount,
      };
      console.log("reqObj", reqObj);
      const response = await API.add_script(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
        setIsLoading(false);
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
        navigate("/script-list");
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const closeModal = () => {
    setIsOpen(false);
    //setSearchData("");
  };

  const btnDisabal =
    !formData.name ||
    !formData.description ||
    !formData.amount ||
    !dataArry ||
    !dataArry2 ||
    !dataArry3;

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
                <h4>Add Script</h4>
              </div>
            </div>
          </div>
          <div class="widget-content widget-content-area">
            <div className="row">
              <div className="normal">
                <div className="row">
                  <div className="col-md-9">
                    <div className="row borderUS">
                      <div className="col-md-12">
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
                            Choose Genre
                            <span class="text-danger">*</span>
                          </label>
                          <>
                            <input
                              type="text"
                              onFocus={() => catagoriY("1")}
                              onChange={moodTegSearch}
                              className="form-control"
                              placeholder="Search Genre"
                            />
                            {isOpen === "1" ? (
                              <div className="dropdownW">
                                <span
                                  className="dropClose"
                                  onClick={closeModal}
                                >
                                  <i class="bi bi-x-square"></i>
                                </span>
                                <ul>
                                  {searchData.map((item, index) => (
                                    <li key={index}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            dataArry.includes(item.id)
                                              ? true
                                              : false
                                          }
                                          onChange={() =>
                                            onChaeckBox(item.id, item.name)
                                          }
                                          className="mr-2"
                                        />
                                        {item.name}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Choose Occasion
                            <span class="text-danger">*</span>
                          </label>

                          <>
                            <input
                              type="text"
                              onFocus={() => catagoriY("2")}
                              onChange={moodTegSearch}
                              className="form-control"
                              placeholder="Search Occasion"
                            />
                            {isOpen === "2" ? (
                              <div className="dropdownW">
                                <span
                                  className="dropClose"
                                  onClick={closeModal}
                                >
                                  <i class="bi bi-x-square"></i>
                                </span>
                                <ul>
                                  {searchData2.map((item, index) => (
                                    <li key={index}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            dataArry2.includes(item.id)
                                              ? true
                                              : false
                                          }
                                          onChange={() =>
                                            onChaeckBox2(item.id, item.name)
                                          }
                                          className="mr-2"
                                        />
                                        {item.name}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Choose Mood
                            <span class="text-danger">*</span>
                          </label>
                          <>
                            <input
                              type="text"
                              onFocus={() => catagoriY("3")}
                              onChange={moodTegSearch}
                              className="form-control"
                              placeholder="Search Mood"
                            />
                            {isOpen === "3" ? (
                              <div className="dropdownW">
                                <span
                                  className="dropClose"
                                  onClick={closeModal}
                                >
                                  <i class="bi bi-x-square"></i>
                                </span>
                                <ul>
                                  {searchData3.map((item, index) => (
                                    <li key={index}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          defaultChecked={
                                            dataArry3.includes(item.id)
                                              ? true
                                              : false
                                          }
                                          onChange={() =>
                                            onChaeckBox3(item.id, item.name)
                                          }
                                          className="mr-2"
                                        />
                                        {item.name}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </>
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
                  <div className="col-md-3">
                    <h6>Genre Tag</h6>
                    <ul className="chooesTeg">
                      {tagArry.map((item, key) => {
                        return <li key={key}>{item}</li>;
                      })}
                    </ul>
                    <h6>Occasion Tag</h6>
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
                disabled={btnDisabal ? true : false}
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

export default AddScript;
