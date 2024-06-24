import { FC, useState } from 'react';
import { decode } from 'html-entities';

import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { WatchCard } from '.';

decode('&copy;, &lt; &gt; &quot; &apos; &amp; &#169; &#8710;', {
    level: 'html5',
});

interface VideoBlockCardProps {
    id: string;
    title: string;
    img: string;
    channelTitle: string;
}

const VideoBlockCard: FC<VideoBlockCardProps> = ({ id, title, img, channelTitle }) => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
    const handleModal = (): void => setIsVideoModalOpen(true);

    return (
        <>
            <Card
                sx={{
                    mb: 1,
                    width: { xs: '100%', sm: '358px', md: '320px' },
                    boxShadow: 'none',
                    borderRadius: 0,
                    '@media (max-width: 1005px)': {
                        width: { sm: '290px', md: '270px' },
                    },
                }}>
                <CardMedia
                    component="img"
                    image={img}
                    alt={title}
                    sx={{
                        width: { xs: '100%', sm: '100%' },
                        height: 180,
                        cursor: 'pointer',
                    }}
                    onClick={handleModal}
                />

                <CardContent sx={{ height: '70px', bgcolor: '#1E1E1E' }}>
                    <Typography
                        variant="subtitle1"
                        onClick={handleModal}
                        fontSize="15px"
                        color="#FFF"
                        sx={{ cursor: 'pointer' }}>
                        {decode(title.slice(0, 65))}
                    </Typography>

                    <Typography variant="subtitle2" color="#808080">
                        {channelTitle}
                        <CheckCircleIcon sx={{ ml: '5px', fontSize: '12px', color: '#808080' }} />
                    </Typography>
                </CardContent>
            </Card>

            <WatchCard
                id={id}
                isVideoModalOpen={isVideoModalOpen}
                setIsVideoModalOpen={setIsVideoModalOpen}
            />
        </>
    );
};

export default VideoBlockCard;
