import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Data, VideoInfo, YoutubeVideo } from '../types';

export const fetchYouTubeVideos = createAsyncThunk(
    'youtube/fetchYouTubeVideos',
    async ({ search, results, sort }: YoutubeVideo): Promise<Data> => {
        try {
            const { data } = await axios.get(import.meta.env.VITE_YOUTUBE_API_URL, {
                params: {
                    key: import.meta.env.VITE_API_KEY,
                    part: 'snippet',
                    type: 'video',
                    maxResults: results,
                    order: sort,
                    q: search,
                },
            });

            return { data: data?.items, search: search };
        } catch (error) {
            console.error(error);
        }
    },
);

type VideosState = {
    data?: VideoInfo[];
    loading: boolean;
    error: null | string;
};

const initialState: VideosState = {
    data: [],
    loading: false,
    error: null,
};

const youtubeDataSlice = createSlice({
    name: 'youtubeData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchYouTubeVideos.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),
            builder.addCase(fetchYouTubeVideos.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.error = null;
            });
        builder.addCase(fetchYouTubeVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default youtubeDataSlice.reducer;
