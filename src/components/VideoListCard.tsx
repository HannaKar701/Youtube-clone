import { FC, useState } from 'react';
import { decode } from 'html-entities';

import { Typography, Card, CardContent, CardMedia, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { WatchCard } from '.';

decode('&copy;, &lt; &gt; &quot; &apos; &amp; &#169; &#8710;', {
    level: 'html5',
});

interface VideoListCardProps {
    id: string;
    title: string;
    img: string;
    channelTitle: string;
}

const VideoListCard: FC<VideoListCardProps> = ({ id, title, img, channelTitle }) => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
    const handleModal = (): void => setIsVideoModalOpen(true);

    return (
        <>
            <Card
                sx={{
                    mb: 1,
                    width: { xs: '100%', sm: '358px', md: 'auto' },
                    boxShadow: 'none',
                    borderRadius: 0,
                    '@media (max-width: 899px)': {
                        width: { xs: '100%', sm: '358px', md: '320px', bgcolor: '#1E1E1E' },
                    },
                }}>
                <Stack flexDirection="row" flexWrap="wrap" bgcolor="#1E1E1E">
                    <CardMedia
                        component="img"
                        image={img}
                        alt={title}
                        sx={{
                            width: { xs: '100%', sm: '450px' },
                            height: 'auto',
                            cursor: 'pointer',
                            '@media (max-width: 899px)': {
                                width: {
                                    xs: '100%',
                                    sm: '100%',
                                    height: 180,
                                    bgcolor: '#1E1E1E',
                                },
                            },
                        }}
                        onClick={handleModal}
                    />

                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            flexDirection: 'column',
                            width: '350px',
                            height: 'auto',
                            bgcolor: '#000',
                            '@media (max-width: 899px)': {
                                height: '70px',
                                bgcolor: '#1E1E1E',
                            },
                        }}>
                        <Typography
                            variant="subtitle1"
                            onClick={handleModal}
                            fontSize="15px"
                            sx={{ cursor: 'pointer' }}
                            color="#FFF">
                            {decode(title.slice(0, 100))}
                        </Typography>

                        <Typography variant="subtitle2" color="#808080">
                            {channelTitle}
                            <CheckCircleIcon
                                sx={{ ml: '5px', fontSize: '12px', color: '#808080' }}
                            />
                        </Typography>
                    </CardContent>
                </Stack>
            </Card>

            <WatchCard
                id={id}
                isVideoModalOpen={isVideoModalOpen}
                setIsVideoModalOpen={setIsVideoModalOpen}
            />
        </>
    );
};

export default VideoListCard;
