import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { IoAddCircleOutline } from "react-icons/io5";
import React, { useState, useEffect } from 'react'
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const [playList, setPlayList] = useState();



  const handleClick = () => {
    if (playList === undefined || playList === null) {
      // If the playlist is undefined or null, set it to an array containing the song
      setPlayList([song]);
    } else {
      // If the playlist already exists, append the new song to it
      setPlayList(prevSongs => [...prevSongs, song]);
    }

  };

  console.log(playList);;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>

        </p>
        <p className="text-sm truncate mt-1 text-gray-300">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artist'}>
            {song.subtitle}
          </Link>
        </p>
        <div className="" onClick={handleClick}>
          <IoAddCircleOutline />
        </div>
      </div>
    </div>
  )
};

export default SongCard;
