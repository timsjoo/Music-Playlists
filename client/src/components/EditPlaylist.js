import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-light bg-light my-3">
                    
                    <form className="container-fluid justify-content-end">
                        <button className="btn btn-outline-success me-2" type="button" onClick={() => navigate(`/home`)}>Home</button>
                        <button className="btn btn-outline-success me-2" type="button" onClick = {() => navigate (`/new`)}>Add New Playlist</button>
                        <button className="btn  btn-outline-success" type="button" onClick={logout}>Logout</button>

                    </form>
                </nav>
            </div>


            <div className=" container-sm mx-auto">

                <div className="row ">
                    <div>
                        <h1 className=" my-3 mb-5"> Edit Playlist</h1>
                    </div>
                </div>

                <div className="col-6 mx-auto">


                    <form onSubmit={handleEditPlaylist} >


                                <div className="form-group">
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" id="name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>

                                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}


                                <div className="form-group">
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" id="description" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                {errors.description && (<p style={{ color: "red" }}>{errors.description.message}</p>)}


                                <div className="form-group">
                                    <label htmlFor="genre">Genre: </label>

                                    <select class="form-select" aria-label="Default select example" id="genre"  onChange={(e) => setGenre(e.target.value)}>
                                    
                                        <option selected>Select genre</option>
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

                                
                                <button className="btn btn-primary mt-3" type="submit">Edit Playlist</button>

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
