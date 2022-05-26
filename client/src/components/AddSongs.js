import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackSearchResult from "./TrackSearchResult";

const AddSongs = ({ user, playlist, setSongList, chooseTrack }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResult([]);
    let cancel = false;
    axios
      .get(`http://localhost:8000/songs/${search}`)
      .then((res) => {
        if (cancel) return;
        // console.log(res.data.items)
        setSearchResult(res.data.items);
      })
      .catch((err) => console.log(err));
    return () => (cancel = true);
  }, [search]);

  // console.log(playlist);

  return (
    <>
      <form onChange={(e) => setSearch(e.target.value)} className="d-flex flex-column py-2">
        <input type="search" placeholder="Search Songs/Artists" defaultValue={search}></input>
      </form>
      <div className="flex-grow-1 my-2" style={{ overFlowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult key={track.id} track={track} chooseTrack={chooseTrack} />
        ))}
      </div>
    </>
  );
};

export default AddSongs;
