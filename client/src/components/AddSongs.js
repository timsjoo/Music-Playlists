import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Form} from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult';

const AddSongs = ({user, playlist}) => {

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResult] = useState([])

  useEffect(() => {
    if(!search) return setSearchResult([])
    let cancel = false
    axios.get(`http://localhost:8000/songs/${search}`)
      .then((res) => {
        if (cancel) return
        // console.log(res.data.items)
        setSearchResult(res.data.items)
      })
      .catch(err => console.log(err))
      return () => cancel = true
  }, [search])

  const chooseTrack = (track) => {
    axios.put(`http://localhost:8000/api/playlists/${playlist._id}`, {
      songs: [...playlist.songs, track]
    })
        .then((res) => {
            console.log("Edit success ", res);

        })
        .catch((err) => {
            console.log(err);
        });
  }

  console.log(playlist)

  return(
  <>
    <Form.Control className="d-flex flex-column py-2" type="search" placeholder="Search Songs/Artists" value={search} onChange={(e) => setSearch(e.target.value)}/>
    <div className="flex-grow-1 my-2" style={{overFlowY: "auto"}}>
      {searchResults.map((track) => (
        <TrackSearchResult key={track.id} track={track} chooseTrack={chooseTrack} />
      ))}
    </div>
  </>
  )
}

export default AddSongs; 