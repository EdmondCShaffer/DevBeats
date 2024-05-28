import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs, LatestAlbum } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams()
  const { data: artistDetailsData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId)

  const topSongData = artistDetailsData?.data[0].views['top-songs']?.data
  const bioData = artistDetailsData?.data[0]?.attributes?.artistBio
  const bioInfo = bioData?.slice(0, 200).concat('...')

  const hasAlbums = artistDetailsData?.data[0]?.views['full-albums']?.data?.length > 0;

  const [artistBioInfo, setArtistBioInfo] = useState(bioInfo)
  const [readMore, setReadMore] = useState('Read more')

  useEffect(() => {
    setArtistBioInfo(bioInfo)
  }, [artistDetailsData])

  const handleReadMore = () => {
    setArtistBioInfo((prevBio) => {
      if (prevBio === bioData) {
        return bioInfo || 'No Bio available';
      } else {
        return bioData;
      }
    });
    setReadMore((prevReadMore) => prevReadMore === 'Read more' ? 'Show less' : 'Read more');
  };

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />
  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistDetailsData={artistDetailsData}
      />
      {artistBioInfo ? (
        <div className='text-white mt-6 mb-6 sm:w-100 w-50 shadow-xl '>
          {artistBioInfo}
          <button onClick={handleReadMore} className="px-2 text-gray-300 text-base cursor-pointer">{readMore}</button>
        </div>
      ) : (
        <h1 className='text-white mt-6'>Sorry no bio available for this artist</h1>
      )}

      {hasAlbums ? (
        <div className='flex sm:flex-row flex-col'>
          <div className='flex-1'>
            <RelatedSongs
              data={Object.values(topSongData)}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          </div>
          <div className='flex-1'>
            <LatestAlbum artistDetailsData={artistDetailsData} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <RelatedSongs
            data={Object.values(topSongData)}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
      )}
    </div>

  )
}


export default ArtistDetails;
