import { FC, useState } from 'react';

import { Box, Stack } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

import { BlockListVideos, ListVideos } from '.';
import { CONSTANTS } from '../constants';

import { VideoInfo } from '../types';

import styles from '../styles/videos.module.less';

interface VideosProps {
    videos: VideoInfo[];
    formDataSearch: string;
}

const Videos: FC<VideosProps> = ({ videos, formDataSearch }) => {
    const [isList, setIsList] = useState<boolean>(true);

    return (
        <Stack m={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between" pl={2}>
                <Box className={styles.videoAbout}>
                    {CONSTANTS.VIDEO_ABOUT}
                    <span className={styles.search}>&nbsp;« {formDataSearch} »&nbsp;</span>
                </Box>

                <Box>
                    <FormatListBulletedIcon
                        onClick={() => setIsList(true)}
                        className={isList ? styles.active : ''}
                        fontSize="large"
                        viewBox="0 0 24 18"
                        sx={{
                            transition: '0.2s',
                            ':hover': {
                                color: '#ff0000',
                                cursor: 'pointer',
                            },
                        }}
                    />

                    <ViewCompactIcon
                        onClick={() => setIsList(false)}
                        className={isList ? '' : styles.active}
                        fontSize="large"
                        viewBox="0 0 20 19"
                        sx={{
                            transition: '0.2s',
                            ':hover': {
                                color: '#ff0000',
                                cursor: 'pointer',
                            },
                        }}
                    />
                </Box>
            </Box>

            {!isList ? <BlockListVideos videos={videos} /> : <ListVideos videos={videos} />}
        </Stack>
    );
};
export default Videos;
