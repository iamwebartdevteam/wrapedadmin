import React from "react";
import { Edit2 } from "react-feather";
import { IMG } from "../api/constant";

const Songtable = ({ data, userDelete }) => {
  console.log("data", data);
  return (
    <>
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
              {/* <th>
                <div class="th-content">Occasion</div>
              </th>
              <th>
                <div class="th-content">Mood</div>
              </th> */}
              <th>
                <div class="th-content">Amount</div>
              </th>
              <th>
                <div class="th-content">File</div>
              </th>
              <th>
                <div class="th-content">Thumbnail</div>
              </th>
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
                  <td width="50">
                    {item.Songcategories[0].subcategory.name}
                    {/* {item.Songcategories[0].category.name === "Genre" ? (
                      <ul className="p-0 moodTag">
                        {item.Songcategories.map((catItem, index) => (
                          <li key={index}>
                            {index + 1}) {catItem.subcategory.name}
                          </li>
                        ))}
                      </ul>
                    ) : undefined} */}
                  </td>

                  {/* <td width="200">
                    <ul className="p-0 moodTag">
                      {item.Songcategories.map((catItem, index) => (
                        <li key={index}>
                          {index + 1}) {catItem.subcategory.name}
                        </li>
                      ))}
                    </ul>
                  </td> */}
                  <td>$ {item.amount}</td>
                  <td>
                    {item.music_file === "" ? (
                      "N/A"
                    ) : item.music_file ? (
                      <i class="bi bi-music-note-beamed musicFile"></i>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <img className="w-50" src={IMG + item.image} />
                  </td>
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
    </>
  );
};

export default Songtable;
