import axios from "axios";
import * as c from "../api/constant";

// ? REGISTRATION API
export const user_registration = async (data) => {
  try {
    const url = c.SIGNUP + "/login";
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER LIST SHOW
export const user_listing = async (header) => {
  try {
    const url = c.SIGNUP + "/get-users";
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER LIST SHOW
export const user_status = async (data, header) => {
  try {
    const url = c.SIGNUP + "/user-status-change";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const user_delete = async (data) => {
  try {
    const url = c.SIGNUP + "/delete-user/" + data;
    const res = await axios.delete(url);
    return res;
  } catch (e) {
    return e.response;
  }
};

export const get_subCategory = async (header) => {
  try {
    const url = c.CATAGORIES;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const add_subCategory = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const getMain_subCategory = async (header) => {
  try {
    const url = c.SUBCATAGORIES;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const subCategoryId = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES + "/categorywise/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const subCategoryId_delete = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES + "/" + data;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const subCategoryId_editGet = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES + "/" + data;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const subCategoryId_edit = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const add_songs = async (data, header) => {
  try {
    const url = c.SONGS;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const song_listing = async (header) => {
  try {
    const url = c.SONGS;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const template_listing = async (data, header) => {
  try {
    const url = c.GETSONGTEMPLETE + "/" + data;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const song_catagoriId = async (header) => {
  try {
    const url = c.SONGS;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const song_delete = async (data, header) => {
  try {
    const url = c.SONGS + "/" + data;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const tem_delete = async (data, header) => {
  try {
    const url = c.DELETETEMPLETE + "/" + data;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const song_templeteAdd = async (data, header) => {
  try {
    const url = c.SONGTEMPLETE;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const getTempleteType = async (header) => {
  try {
    const url = c.TEMPLETETYPE;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const add_script = async (data, header) => {
  try {
    const url = c.GUIDE;
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const script_listing = async (header) => {
  try {
    const url = c.GUIDE;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const script_delete = async (data, header) => {
  try {
    const url = c.GUIDE + "/" + data;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const moodTagSearchApi = async (data, header) => {
  try {
    const url = c.SUBCATAGORIES + "/categorywise-search";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const order_data_table = async (data, header) => {
  try {
    const url = c.ORDER;
    console.log("url", url);
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const order_delete = async (data, header) => {
  try {
    const url = c.SIGNUP + "/delete-order/" + data;
    const res = await axios.delete(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const payment_history = async (header) => {
  try {
    const url = c.SIGNUP + "/paymenthistory";
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const getSongByid = async (data, header) => {
  try {
    const url = c.SIGNUP + "/getsong/" + data;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const update_songs = async (data, header) => {
  try {
    const url = c.SIGNUP + "/updatesong/" + data.id;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const getTempleteTypeId = async (data, header) => {
  try {
    const url = c.SIGNUP + "/getTemplate/" + data;
    const res = await axios.get(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const updateTamplete = async (data, header) => {
  try {
    const url = c.SIGNUP + "/updatetemplate/" + data.templeteId;
    const res = await axios.patch(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const gettempleteById = async (data, header) => {
  try {
    const url =
      c.SIGNUP + "/gettemplatebytype/" + data.tempId + "/" + data.tempTypeId;
    console.log("url", url);
    const res = await axios.get(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
export const aboutus = async (data, header) => {
  try {
    const url = c.SIGNUP + "/aboutus";
    const res = await axios.post(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const aboutusDelete = async (data, header) => {
  try {
    const url = c.SIGNUP + "/aboutus/" + data;
    const res = await axios.delete(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};

export const aboutusGet = async (data, header) => {
  try {
    const url = c.SIGNUP + "/aboutus";
    const res = await axios.get(url, data, {
      headers: JSON.parse(header),
    });
    return res;
  } catch (e) {
    return e.response;
  }
};
