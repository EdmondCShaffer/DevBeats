import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

import { Error, Loader, SongCard } from '../components'

const AroundYou = () => {

    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEO_API_KEY
        const fetchCountry = async () => {
            try {
                const res = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`)
                const data = await res.json()
                setCountry(data.location.country)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchCountry()

    }, [country])

    if (isFetching && loading) return <Loader title='Loading popular songs around you' />
    if (error && country) return <Error />
    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around you <span className='font-black'>{country}</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        i={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                    />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
