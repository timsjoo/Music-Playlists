
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";


const OnePlaylist = (props) => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [onePlaylist, setOnePlaylist] = useState({});
    const [user, setUser] = useState({});/////////
    const [songList, setSongList] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:8000/api/playlists/${id}`)
            .then((res) => {
                console.log(res.data);
                setOnePlaylist(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deletePlaylistHandler = () => {
        axios.delete(`http://localhost:8000/api/playlists/${id}`)
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
        axios.post(`http://localhost:8000/api/users/logout`, {},
            { withCredentials: true },
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



    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`,   //USERS  Loged In user from getLoggedInUser
            { withCredentials: true }
        ).then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    return (

        <div>

            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
                    <form className="container-fluid justify-content-end">
                        <button className="btn btn-outline-success me-2" type="button" onClick={() => navigate(`/home`)}>Home</button>
                        <button className="btn  btn-outline-success me-2" type="button" onClick={logout}>Logout</button>
                        
                    </form>
                </nav>
            </div>


            <div className=" container-sm col-6 mx-auto bg-secondary pb-5 px-4">

                <div className="row">
                    <div>
                        <h1 className=" my-5"> {onePlaylist.name} </h1>
                    </div>
                </div>


                <div class="card border-dark col-8 mx-auto mb-3 ">

                    <div className="row ">

                        <div className=" col-5 mx-auto">

                            <p className="card-title  fs-5 mt-3 "> {onePlaylist.genre}</p>
                            <p className="card-title  fs-5 mt-3 "> {onePlaylist.description}</p>

                            <div> List of songs here:{songList.map((song, index) => {
                                return (
                                    <div key={index}>

                                        <p>{song.name}</p>

                                    </div>
                                )
                            })}

                            </div>

                        </div>

                    </div>

                </div>
                <div className="row">
                    <div>
                    <button className="btn btn-success me-2 mb-2" type="button" onClick={() => navigate(`/playlist/${onePlaylist._id}/addsong`)}>Add Songs</button>
                    </div>
                </div>
                <div className="row">
                    <div>
                    <button className="btn btn-success me-2" type="button" onClick={() => navigate(`/playlist/edit/${onePlaylist._id}`)}>Edit</button>
                    <button className="btn  btn-danger" type="button" onClick={deletePlaylistHandler}>Delete</button>
                    
                    </div>
                </div>

            </div>

        </div>

    );

}

export default OnePlaylist;


