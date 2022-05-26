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

  const getPlaylist =() => {
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
  };

  useEffect(() => {
    getPlaylist()
  }, [])

  const chooseTrack = (track) => {
    axios
      .put(`http://localhost:8000/api/playlists/${onePlaylist._id}`, {
        songs: [...onePlaylist.songs, track],
      })
      .then((res) => {
        console.log("Edit success ", res);
        console.log(res.data.songs);
        // window.location.reload();
        // setSongList(res.data.songs);
        getPlaylist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      
        <nav className='navbar navbar-expand-sm navbar-light bg-dark shadow-lg p-3 mb-5 rounded-bottom'>
                <img src="https://img.icons8.com/fluency/96/000000/spotify.png" alt="spotifylogo" className="img ms-5 m-3 bg-dark"></img>
                    <div className='collapse navbar-collapse justify-content-between' id='navbarNav'>
                        <h2 className="bg-white border border-dark rounded px-3 py-2 text-success mr-5">Playlistify</h2>
                            <ul className='navbar-nav'>
                                <li className='nav-item active mx-5'>
                                    <button className="btn btn-success me-2" type="button" onClick = {() => navigate (`/home`)}>Dashboard</button>
                                </li>
                                <div className="btn-group me-5" role="group">
                                    <button id="btnGroupDrop1" 
                                            type="button" 
                                            className="btn btn-light text-success me-2 dropdown-toggle" 
                                            data-bs-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false">
                                    {user.username}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <Link to={"#"} className="dropdown-item">Account Info</Link>
                                    <button className="btn dropdown-item" type="button" onClick = {logout}>Logout</button>
                                    </div>
                                </div>
                            </ul>
                    </div>
            </nav>
      

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
              <div className="mb-2">
                <button
                  className="btn  btn-success me-2"
                  type="button"
                  onClick={() => navigate(`/playlist/edit/${onePlaylist._id}`)}
                >
                  Edit
                </button>
                <button className="btn  btn-success" type="button" onClick={deletePlaylistHandler}>
                  Delete
                </button>
              </div>
              <div className="col-8 mx-auto">
                <AddSongs user={user} playlist={onePlaylist} setSongList={setSongList} chooseTrack={chooseTrack} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnePlaylist;
