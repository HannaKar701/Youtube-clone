import { FC } from 'react';
import { Stack } from '@mui/material';

import { VideoInfo } from '../types';

import { VideoListCard } from '.';

interface ListVideoProps {
    videos: VideoInfo[];
}

const ListVideos: FC<ListVideoProps> = ({ videos }) => (
    <Stack alignItems="center" flexDirection="column" gap={2}>
        {Object.values(videos).map((video, index: number) => (
            <VideoListCard
                key={index}
                id={video?.id.videoId}
                title={video?.snippet?.title}
                img={video?.snippet?.thumbnails.high.url}
                channelTitle={video?.snippet?.channelTitle}
            />
        ))}
    </Stack>
);

export default ListVideos;
