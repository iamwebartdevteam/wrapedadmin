import React from 'react'
import { useState } from 'react';

const SongAdd = () => {
     const [isLoading, setIsLoading] = useState(false);
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
                    <div className="row borderUS">
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
                            //value={formData.name}
                            name="name"
                            //onChange={handalerChanges}
                          />
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
                            //value={formData.amount}
                            name="amount"
                            //onChange={handalerChanges}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Minutes
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter here"
                            //value={formData.minutes}
                            name="minutes"
                            //onChange={handalerChanges}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>
                            Second
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter here"
                            //value={formData.second}
                            name="second"
                           // onChange={handalerChanges}
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
                                  {/* <span
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
                                  </span> */}
                                  <br />
                                  <span class="note needsclick">
                                    (This is a Uploadzone. Browse your files)
                                  </span>

                                  <input
                                    hidden
                                    id="fileT"
                                    type="file"
                                    //onChange={imageUploading}
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
                                  {/* <span
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
                                  </span> */}
                                  <br />
                                  <span class="note needsclick">
                                    (This is a Uploadzone. Browse your files)
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
                      <div className="col-md-12">
                        <div class="form-group">
                          <label>
                            Description
                            <span class="text-danger">*</span>
                          </label>
                          <textarea
                            //value={formData.description}
                            name="description"
                            //onChange={handalerChanges}
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
                //onClick={add_subcatagori}
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
  )
}

export default SongAdd
