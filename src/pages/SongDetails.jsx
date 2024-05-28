import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongLyricsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { songid } = useParams()

    const [songLyrics, setSongLyrics] = useState(null);
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid })
    const { data: songLyricData } = useGetSongLyricsQuery({ trackadamid: songData?.trackadamid })
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid })


    useEffect(() => {
        if (songLyricData) {
            setSongLyrics(Object.values(songLyricData?.resources.lyrics))
        }

    }, [songLyricData])

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
    }

    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />
    if (error) return <Error />
    return (
        <div className="flex flex-col">
            <DetailsHeader
                artistId=''
                songData={songData}
            />
            <div className="mb-10">
                <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>
                <div className='mt-5'>
                    {songLyrics
                        ? songLyrics[0].attributes.text.map((line, i) => (
                            <p className='text-gray-400 text-base my-1'>{line}</p>
                        )) : <p className='text-gray-400 text-base my-1'>Sorry, no lyrics found!</p>}
                </div>
            </div>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )

}

export default SongDetails;
