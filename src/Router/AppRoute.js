import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import Base from "../components/Base";
import Order from "../page/Order";
import SidBar from "../components/SidBar";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import { useState } from "react";
import UserList from "../page/UserList";
import Categories from "../page/Categories";
import AddCategoris from "../page/AddCategoris";
import Song from "../page/Song";
import AddSong from "../page/AddSong";
import EditCategoris from "../page/EditCategoris";
import Script from "../page/Script";
import AddScript from "../page/AddScript";
import SongAdd from "../page/Song/SongAdd";
import SongTemplete from "../page/Song/SongTemplete";
import TempleteListing from "../page/Song/TempleteListing";
import PaymentHistory from "../page/PaymentHistory";
import EditSong from "../page/EditSong";
import EditTemplate from "../page/Song/EditTemplate";
const AppRoute = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  return (
    <>
      <Router>
        {isLogin ? (
          <>
            <div class="main-container" id="container">
              <div class="overlay"></div>
              <div class="search-overlay"></div>
              <div class="rightbar-overlay"></div>
              <SidBar />
              <div id="content" class="main-content">
                <Header setIsLogin={setIsLogin} />
                <SubHeader />
                <Routes>
                  <Route path="/" element={<Base />} />
                  <Route path="/dashboard" element={<Base />} />
                  <Route
                    path="/order"
                    element={<Order setIsLogin={setIsLogin} />}
                  />
                  <Route
                    path="/user"
                    element={<UserList setIsLogin={setIsLogin} />}
                  />
                  <Route
                    path="/categories"
                    element={<Categories setIsLogin={setIsLogin} />}
                  />
                  <Route path="/add-categories" element={<AddCategoris />} />
                  <Route
                    path="/song-list"
                    element={<Song setIsLogin={setIsLogin} />}
                  />
                  {/* <Route path="/add-music" element={<SongAdd />} /> */}
                  <Route path="/add-music" element={<AddSong />} />
                  <Route path="/edit-song" element={<EditSong />} />
                  <Route path="/add-templete" element={<SongTemplete />} />
                  <Route path="/edit-templete" element={<EditTemplate />} />

                  <Route path="/templete-list" element={<TempleteListing />} />
                  <Route path="/payment-history" element={<PaymentHistory />} />
                  <Route
                    path="/script-list"
                    element={<Script setIsLogin={setIsLogin} />}
                  />
                  <Route path="/add-script" element={<AddScript />} />
                  <Route path="/edit-categories" element={<EditCategoris />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
            </Routes>
          </>
        )}
      </Router>
    </>
  );
};

export default AppRoute;
