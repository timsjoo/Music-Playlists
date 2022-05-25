import React from 'react';

const TrackSearchResult = ({track, chooseTrack}) => {

  const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    if (image.height < smallest.height ) return image
    return smallest
  })

  const handleAdd = () => {
    chooseTrack(track)
  }
  // console.log(track)

  return (
  <div className="d-flex m-2 align-items-flex-start" style={{cursor: "pointer"}} onClick={handleAdd}>
    <img src = {smallestAlbumImage.url} style={{height: '64px', width: '64px'}} alt="album" />
    <div className="ml-3">
      <div>{track.name}</div>
      <div>{track.artists[0].name}</div>
    </div>
  </div>
  )
}

export default TrackSearchResult; 