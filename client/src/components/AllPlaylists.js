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
      <div className="container">
        <nav className="navbar navbar-expand-sm my-3 navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-text">
              <p>Welcome {user.username}</p>
            </span>
          </div>
          <form className="container-fluid justify-content-end">
            <button className="btn btn-outline-success me-2" type="button" onClick={() => navigate(`/new`)}>
              Add New Playlist
            </button>
            <button className="btn  btn-outline-success me-2" type="button" onClick={logout}>
              Logout
            </button>
          </form>
        </nav>

        <div className="row">
          <div>
            <h1 className=" my-3 mb-5"> Playlists</h1>
          </div>
        </div>

        <table className=" table table-striped  border-start  border-end border-secondaryp-2 border-opacity-10 mb-2  mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Description</th>
              <th scope="col">Created By</th>
              <th scope="col">Date Created</th>
            </tr>
          </thead>

          <tbody>
            {playlistList.map((playlist, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/playlist/${playlist._id}`}>{playlist.name}</Link>
                  </td>
                  <td>{playlist.genre}</td>
                  <td>{playlist.description}</td>
                  <td>{playlist.createdBy?.username}</td>

                  <td>{dateFormatter(playlist.createdAt)}</td>

                  <td>
                    {playlist.createdBy._id === user._id && (
                      <div className="btn-group my-1">
                        <button
                          className="btn btn-outline-success me-2"
                          type="button"
                          onClick={() => navigate(`/playlist/${playlist._id}`)}
                        >
                          Add Songs
                        </button>

                        <button
                          className="btn btn-outline-success me-2"
                          type="button"
                          onClick={() => navigate(`/playlist/edit/${playlist._id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-outline-success me-2"
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
