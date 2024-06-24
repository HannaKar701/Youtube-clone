import { FC } from 'react';

import { Stack } from '@mui/material';

import { VideoInfo } from '../types';

import { VideoBlockCard } from '.';

interface BlockListVideoProps {
    videos: VideoInfo[];
}

const BlockListVideos: FC<BlockListVideoProps> = ({ videos }) => (
    <Stack
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        mt={1}
        gap={2}
        sx={{
            '@media (max-width: 1005px)': {
                justifyContent: 'start',
                gap: 0.5,
            },
        }}>
        {Object.values(videos).map((video, index: number) => (
            <VideoBlockCard
                key={index}
                id={video?.id.videoId}
                title={video?.snippet.title}
                img={video?.snippet.thumbnails.high.url}
                channelTitle={video?.snippet.channelTitle}
            />
        ))}
    </Stack>
);

export default BlockListVideos;
