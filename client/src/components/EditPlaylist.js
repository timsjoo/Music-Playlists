import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditPlaylist = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    //const [songList, setSongList] = useState([]);

    const [user, setUser] = useState({});

    const [errors, setErrors] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();
    


    useEffect(() => {
        axios.get(`http://localhost:8000/api/playlists/${id}`)
            .then((res) =>{
                console.log(res);
                console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                setGenre(res.data.genre);

            })
            .catch((err) => console.log(err))
        }, [id])

        const handleEditPlaylist = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/playlists/${id}`,

        {
            name: name,
            description: description,
            genre: genre,
        })
        .then((response) => {
            console.log("Edit success ", response);
            
            navigate("/home")
        })
        .catch((err) => {
            console.log("error with editing playlist", err.response);
            
            setErrors(err.response.data.errors);
        });
    }

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

       //{ withCredentials: true }


    const logout = (e) => {
        axios.post(`http://localhost:8000/api/users/logout`, {},  
        { withCredentials: true},
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


            <div className=" container-sm mx-auto">

                <div className="row ">
                    <div>
                        <h1 className=" my-3 mb-5"> Edit Playlist</h1>
                    </div>
                </div>

                <div className="col-6 mx-auto">


                    <form onSubmit={handleEditPlaylist} >


                                <div className="form-group mt-3">
                                    <label htmlFor="name"><strong>Name:</strong></label>
                                    <input type="text" id="name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>

                                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}


                                <div className="form-group mt-3">
                                    <label htmlFor="description"><strong>Description:</strong></label>
                                    <input type="text" id="description" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                {errors.description && (<p style={{ color: "red" }}>{errors.description.message}</p>)}


                                <div className="form-group mt-3">
                                    <label htmlFor="genre"><strong>Genre:</strong></label>

                                    <select class="form-select" aria-label="Default select example" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                                    
                                        <option value="Rock">Rock</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="EDM">EDM</option>
                                        <option value="Dubstep">Dubstep</option>
                                        <option value="Techno">Techno</option>
                                        <option value="R&B">R&B</option>
                                        <option value="Country">Country</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Indie Rock">Indie Rock</option>
                                        <option value="Electro">Electro</option>
                                        <option value="Classical">Classical</option>
                                        <option value="Latin">Latin</option>
                                        <option value="Hip Hop">Hip Hop</option>
                                    </select>


                                </div>

                                {errors.genre ? (<p style={{ color: "red" }}>{errors.genre.message}</p>
                                ) : null}

                                
                                <button className="btn btn-outline-success mt-3" type="submit">Edit Playlist</button>

                    </form>

                </div>
        
            </div>
        </div>     


    );
};

export default EditPlaylist;



/*

<div> {songList.map((song, index) => {
                                        return (
                                            <div key={index}>

                                            <p>{song.name}</p>
                                        
                                            </div>
                                        )})}

                                </div>


                                */

