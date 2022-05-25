import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

const AllPlaylists = (props) => {
  const [playlistList, setPlaylistList] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const dateFormatter = (date) => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-us", options);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/playlists`) //Playlists
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setPlaylistList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/playlists/${idFromBelow}`) //DELETE Playlist

      .then((res) => {
        console.log(res);
        console.log(res.data);
        setPlaylistList(playlistList.filter((playlist) => playlist._id !== idFromBelow));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/users`, // Get LoggedInUser
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

  const logout = (e) => {
    axios
      .post(
        `http://localhost:8000/api/users/logout`,
        {}, // empty {} for clearing cookies
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-dark shadow-lg p-3 mb-5 rounded-bottom">
        <img
          src="https://img.icons8.com/fluency/96/000000/spotify.png"
          alt="spotifylogo"
          className="img ms-5 m-3 bg-dark"
        ></img>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <h2 className="bg-white border border-dark rounded px-3 py-2 text-success mr-5">Playlistify</h2>
          <ul className="navbar-nav">
            <li className="nav-item active mx-5">
              <button className="btn btn-success me-2" type="button" onClick={() => navigate(`/new`)}>
                Add Playlist
              </button>
            </li>
            <div className="btn-group me-5" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-light text-success me-2 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.username}
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <Link to={"#"} className="dropdown-item">
                  Account Info
                </Link>
                <button className="btn dropdown-item" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div>
            <h1 className=" my-3 mb-5">Playlists</h1>
          </div>
        </div>

        <table className="table align-middle table-hover border border-dark p-2 border-opacity-10 mb-2  mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Description</th>
              <th scope="col">Created By</th>
              <th scope="col">Date Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {playlistList.map((playlist, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/playlist/${playlist._id}`} className="text-decoration-none link-success">
                      <strong>{playlist.name}</strong>
                    </Link>
                  </td>
                  <td>{playlist.genre}</td>
                  <td>{playlist.description}</td>
                  <td>{playlist.createdBy?.username}</td>

                  <td>{dateFormatter(playlist.createdAt)}</td>

                  <td>
                    {playlist.createdBy._id === user._id && (
                      <div className="btn-group my-1">
                        <button
                          className="btn btn-success me-2"
                          type="button"
                          onClick={() => navigate(`/playlist/edit/${playlist._id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-success me-2"
                          type="button"
                          onClick={() => deleteHandler(playlist._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlaylists;
