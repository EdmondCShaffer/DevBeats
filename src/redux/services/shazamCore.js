import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'


const apiKey = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', apiKey)
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () =>  'v1/charts/world?country_code=DZ'}),
        getSongsByGenre: builder.query({query: (genre) => `v1/charts/genre-world?genre_code=${genre}&country_code=DZ`}),
        getSongDetails: builder.query({query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
        getSongLyrics: builder.query({query: ({ trackadamid }) => `v2/tracks/details?track_id=${trackadamid}`}),
        getSongRelated: builder.query({query: ({songid}) => `v1/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId) => `v2/artists/details?artist_id=${artistId}`}),
        getSongsByCountry: builder.query({query: (countryCode) => `v1/charts/country?country_code=${countryCode}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
    }), 
    
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongLyricsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi