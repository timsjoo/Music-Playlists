import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddSongs from "./AddSongs";
import { Link } from "react-router-dom";

const OnePlaylist = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [onePlaylist, setOnePlaylist] = useState({});
  const [user, setUser] = useState({});
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/playlists/${id}`)
      .then((res) => {
        console.log(res.data);
        setOnePlaylist(res.data);
        setSongList(res.data.songs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePlaylistHandler = () => {
    axios
      .delete(`http://localhost:8000/api/playlists/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = (e) => {
    axios
      .post(`http://localhost:8000/api/users/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/users`, //USERS  Loged In user from getLoggedInUser
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
          <form className="container-fluid justify-content-end">
            <button className="btn btn-outline-success me-2" type="button" onClick={() => navigate(`/home`)}>
              Home
            </button>
            <button className="btn  btn-outline-success me-2" type="button" onClick={logout}>
              Logout
            </button>
          </form>
        </nav>
      </div>

      <div className="  container col-6 mx-auto bg-secondary pb-5 px-4">
        <div className="row">
          <div>
            <h1 className=" my-5"> {onePlaylist.name} </h1>
          </div>
        </div>

        <div className="card border-dark col-8 mx-auto mb-3 ">
          <div className="row ">
            <div className=" col-10 mx-auto">
              <p className="card-title  fs-5 mt-3 "> {onePlaylist.genre}</p>
              <p className="card-title  fs-5 mt-3 "> {onePlaylist.description}</p>

              <div className="pb-3">
                {" "}
                {songList.map((song, index) => {
                  return (
                    <div key={index}>
                      <a href={song.external_urls.spotify} target="_blank">
                        {song.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {onePlaylist.createdBy === user._id && (
          <div>
            <div className="row "></div>
            <div className="row">
              <div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  type="button"
                  onClick={() => navigate(`/playlist/edit/${onePlaylist._id}`)}
                >
                  Edit
                </button>
                <button className="btn  btn-sm btn-danger" type="button" onClick={deletePlaylistHandler}>
                  Delete
                </button>
              </div>
              <div>
                <AddSongs user={user} playlist={onePlaylist} setSongList={setSongList} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnePlaylist;
