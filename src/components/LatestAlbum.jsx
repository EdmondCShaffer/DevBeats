import React from 'react';

const LatestAlbum = ({ artistDetailsData }) => {
    const albums = artistDetailsData?.data[0]?.views['full-albums']?.data
    if (!albums || albums.length === 0) {
        return null; // Render nothing if there are no albums or if albums is undefined
    }
    return (

        <div className='flex flex-col ml-3'>
            <h1 className='font-bold text-3xl text-white'>Albums: </h1>
            {albums?.map((album, i) => (
                <div className={`w-full flex flex-row items-center bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 mt-6`}>
                    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
                    <div className="flex-1 flex flex-row justify-between items-center">
                        <img
                            className="w-20 h-20 rounded-lg"
                            src={album?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}
                            alt={album?.attributes?.name}
                        />
                        <div className="flex-1 flex flex-col justify-center mx-3">
                            <p className="text-xl font-bold text-white">
                                Album: {album?.attributes?.name}
                            </p>
                            <p className="text-base text-white mt-1">
                                Record Label: {album?.attributes?.recordLabel}
                            </p>
                            <p className="text-base text-white mt-1">
                                Release Date: {album?.attributes?.releaseDate}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default LatestAlbum;
