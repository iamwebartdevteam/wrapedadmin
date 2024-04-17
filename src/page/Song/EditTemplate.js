import React, { useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import * as API from "../../api/index";
import { header } from "../../schemas/Validation";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
const initialData = {
  templeteType: "",
  templeteFile: "",
  sampleData: "",
  mstart: "",
  messlength: "",
  songlength: "",
  name: "",
  amount: "",
};

const EditTemplate = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [chooseTamplete, setChooseTamplete] = useState("");

  // ? Templete Type
  const [isTemplete, setIsTemplete] = useState(false);

  const [tampleteType, setTampleteType] = useState([]);

  const [formData, setFormData] = useState(initialData);

  const [templeteData, setTempleteData] = useState("");
  const [adminTemFile, setAdminTemFile] = useState("");

  const [templeteFile, setTempleteFilea] = useState("");
  const [sampleData, setSampleData] = useState("");

  const [temFileName, setTemFileName] = useState("");
  const [samFile, setSamFile] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  const uploadtemplete = (e) => {
    let images = e.target.files[0];
    setTemFileName(images.name);
    var reader = new FileReader();
    reader.onloadend = function () {
      setTempleteFilea(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const uploadSample = (e) => {
    let images = e.target.files[0];
    setSamFile(images.name);
    var reader = new FileReader();
    reader.onloadend = function () {
      setSampleData(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const handalerChanges = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTemplete = async () => {
    setIsTemplete(true);

    if (selectedValue === "Intro-Middle-Outro") {
      const hms = formData.mstart;
      var [minutes, seconds] = hms.split(".");
      const mstart = +minutes * 60 + +seconds;

      const hmsll = formData.messlength;
      var [minutes, seconds] = hmsll.split(".");
      const messlength = +minutes * 60 + +seconds;
      const hmsgll = formData.songlength;
      var [minutes, seconds] = hmsgll.split(".");
      const songlength = +minutes * 60 + +seconds;
      try {
        const reqObj = {
          name: formData.name,
          temFileName: temFileName,
          samFile: samFile,
          templeteType: selectedValue ? selectedValue : templeteData,
          templateFile: templeteFile,
          sampleData: sampleData,
          mstart: mstart
            ? mstart
            : formData.mstart > 60
            ? mstart
            : formData.mstart,
          messlength: messlength
            ? messlength
            : formData.messlength > 60
            ? messlength
            : formData.messlength,

          songlength: songlength
            ? songlength
            : formData.songlength > 60
            ? songlength
            : formData.songlength,
          templeteId: loaction.state.id,
          amount: formData.amount,
        };
        console.log("reqObj", reqObj);
        const response = await API.updateTamplete(reqObj, header);
        console.log("response", response);
        if (response.data.success === 1) {
          setTempleteFilea("");
          setSampleData("");
          navigate("/song-list");
          setIsTemplete(false);
        }
      } catch (error) {}
    } else {
      const hmsgll = formData.songlength;
      var [minutes, seconds] = hmsgll.split(".");
      const songlength = +minutes * 60 + +seconds;
      try {
        const reqObj = {
          name: formData.name,
          temFileName: temFileName,
          samFile: samFile,
          templeteType: templeteData,
          templateFile: templeteFile,
          sampleData: sampleData,
          songlength: songlength
            ? songlength
            : formData.songlength > 60
            ? songlength
            : formData.songlength,
          templeteId: loaction.state.id,
        };
        console.log("$%reqObj", reqObj);
        const response = await API.updateTamplete(reqObj, header);
        console.log("response", response);
        if (response.data.success === 1) {
          setTempleteFilea("");
          setSampleData("");
          navigate("/song-list");
          setIsTemplete(false);
        }
      } catch (error) {}
    }
  };

  const getAlltemplete = async () => {
    try {
      const response = await API.getTempleteType(header);
      console.log("response0", response);
      const responsebyId = await API.getTempleteTypeId(
        loaction.state.id,
        header
      );
      console.log("responsebyId", responsebyId);
      setChooseTamplete(responsebyId.data.data);
      setTampleteType(response.data.data);
      setFormData(responsebyId.data.data);
      setSelectedValue(responsebyId.data.data.templeteType);
    } catch (error) {}
  };

  const templeteType = async (e) => {
    const header = localStorage.getItem("_tokenCode");
    const typeData = e.target.value;

    setSelectedValue(typeData);
    setFormData("");
    try {
      const reqObj = {
        tempTypeId: typeData,
        tempId: loaction.state.id,
      };
      const response = await API.gettempleteById(reqObj, header);
      console.log("responsesss", response);
      if (response.data.success === 1) {
        setFormData(response.data.data);
      } else {
        setFormData("");
      }
    } catch (error) {}
    setChooseTamplete("");
    setTempleteFilea("");
    setSampleData("");
    if (typeData === "Intro-Middle-Outro") {
      setTempleteData("Intro-Middle-Outro");
    } else if (typeData === "Intro-Outro" || typeData === "Happy birthday") {
      setTempleteData("Intro-Outro");
    } else if (typeData === "Happy birthday") {
      setTempleteData("Happy birthday");
    }
  };

  useEffect(() => {
    getAlltemplete();
  }, []);
  return (
    <>
      <div class="col-lg-12 layout-spacing">
        <div class="statbox widget box box-shadow mb-4">
          <div class="widget-header">
            <div class="row">
              <div class="col-xl-9 col-md-9 col-sm-9 col-12">
                <h4>Edit Voice Over Template</h4>
              </div>
            </div>
          </div>

          <div class="widget-content widget-content-area">
            <div className="row">
              <div className="col-md-9 borderUS">
                <div className="normal">
                  <div className="justify-content-center row">
                    <div className="col-md-6">
                      <div class="form-group">
                        <label>
                          Change template type to
                          <span class="text-danger">*</span>
                        </label>
                        <select
                          className="form-control mb-2"
                          value={selectedValue}
                          onChange={templeteType}
                        >
                          <option>--- Select --- </option>
                          {tampleteType.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <span>
                          <strong className="text-danger">Note : </strong>
                          Choose existing template if no change is required in
                          type of template
                        </span>
                      </div>
                    </div>
                  </div>
                  {templeteData === "Intro-Middle-Outro" ||
                  selectedValue === "Intro-Middle-Outro" ? (
                    <>
                      <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Voice-Over Template
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
                                        templeteFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {templeteFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {templeteFile
                                        ? temFileName
                                        : formData.temFileName}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      onChange={uploadtemplete}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Prerecorded File
                              <span class="text-danger">*</span>
                            </label>
                            <div id="dropzone">
                              <form
                                encType="multipart/form-data"
                                action="/upload"
                                class="dropzone needsclick dz-clickable"
                              >
                                <label
                                  for="files"
                                  className="dz-message needsclick"
                                >
                                  <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                                  <form encType="multipart/form-data">
                                    <span
                                      class={
                                        sampleData
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {sampleData ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {sampleData ? samFile : formData.samFile}
                                    </span>
                                    <input
                                      hidden
                                      id="files"
                                      type="file"
                                      onChange={uploadSample}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Middle Start
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              value={formData.mstart}
                              name="mstart"
                              onChange={handalerChanges}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Message duration
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              value={formData.messlength}
                              name="messlength"
                              onChange={handalerChanges}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Duration Of Song
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              value={formData.songlength}
                              name="songlength"
                              onChange={handalerChanges}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Amount
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              value={formData.amount}
                              name="amount"
                              onChange={handalerChanges}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          {isTemplete ? (
                            <button class="btn btn-info mr-2">
                              loading ....
                            </button>
                          ) : (
                            <button
                              onClick={addTemplete}
                              class="btn btn-success mr-2"
                            >
                              Update Templete
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : selectedValue === "Happy birthday" ||
                    selectedValue === "Intro-Outro" ? (
                    <>
                      <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Voice-Over Template
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
                                        templeteFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {templeteFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {templeteFile
                                        ? temFileName
                                        : formData.temFileName}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      onChange={uploadtemplete}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Prerecorded File
                              <span class="text-danger">*</span>
                            </label>
                            <div id="dropzone">
                              <form
                                encType="multipart/form-data"
                                action="/upload"
                                class="dropzone needsclick dz-clickable"
                              >
                                <label
                                  for="files"
                                  className="dz-message needsclick"
                                >
                                  <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                                  <form encType="multipart/form-data">
                                    <span
                                      class={
                                        sampleData
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {sampleData ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {sampleData ? samFile : formData.samFile}
                                    </span>
                                    <input
                                      hidden
                                      id="files"
                                      type="file"
                                      onChange={uploadSample}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Duration Of Song
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              value={formData.songlength}
                              name="songlength"
                              onChange={handalerChanges}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          {isTemplete ? (
                            <button class="btn btn-info mr-2">
                              loading ....
                            </button>
                          ) : (
                            <button
                              onClick={addTemplete}
                              class="btn btn-success mr-2"
                            >
                              Update Templete
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : templeteData === "4" || templeteData === "7" ? (
                    <>
                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Templete
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
                                        adminTemFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {adminTemFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {adminTemFile
                                        ? "File Uploaded successfully"
                                        : "Upload Templete files here"}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      onChange={uploadtemplete}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Sample
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
                                        adminTemFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {adminTemFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {adminTemFile
                                        ? "File Uploaded successfully"
                                        : "Upload Sample files here"}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      // onChange={imageUploadingThum}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Middle Start
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              // value={formData.second}
                              name="start"
                              // onChange={handalerChanges}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Message duration
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              //value={formData.second}
                              name="end"
                              //onChange={handalerChanges}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button class="btn btn-info mr-2">
                            Update Templete
                          </button>
                        </div>
                      </div>
                    </>
                  ) : templeteData === "5" ? (
                    ""
                  ) : templeteData === "6" ? (
                    <>
                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Templete
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
                                        adminTemFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {adminTemFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {adminTemFile
                                        ? "File Uploaded successfully"
                                        : "Upload Templete files here"}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      onChange={uploadtemplete}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Upload Sample
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
                                        adminTemFile
                                          ? "dz-button text-success"
                                          : "dz-button"
                                      }
                                    >
                                      {adminTemFile ? (
                                        <span className="d-inline-block mr-2">
                                          <CheckCircle
                                            color="green"
                                            size="30"
                                          />
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {adminTemFile
                                        ? "File Uploaded successfully"
                                        : "Upload Sample files here"}
                                    </span>
                                    <input
                                      hidden
                                      id="file"
                                      type="file"
                                      // onChange={imageUploadingThum}
                                      class="image-preview-filepond"
                                    />
                                  </form>
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>
                              Duration Of Song
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter here"
                              //value={formData.second}
                              name="end"
                              //onChange={handalerChanges}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button class="btn btn-info mr-2">
                            Add Templete
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* <div className="row">
                  <div className="col-md-12">
                    <button class="btn btn-success mr-2">Confirm</button>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="col-md-3">
                <h5 className="mb-3">Existing Template Type</h5>
                <ul className="typeoftemplete">
                  {chooseTamplete === "" ? (
                    <>
                      {selectedValue === "Intro-Middle-Outro" ? (
                        <li>
                          <CheckCircle color="green" size="20" />
                          <span>Intro-Middle-Outro</span>
                        </li>
                      ) : selectedValue === "Intro-Outro" ? (
                        <li>
                          <CheckCircle color="green" size="20" />
                          <span>Intro-Outro</span>
                        </li>
                      ) : selectedValue === "Happy birthday" ? (
                        <li>
                          <CheckCircle color="green" size="20" />
                          <span>Happy birthday</span>
                        </li>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      <li>
                        <CheckCircle color="green" size="20" />
                        <span>{chooseTamplete.templeteType}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTemplate;
