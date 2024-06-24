import { Dispatch, FC, SetStateAction } from 'react';

import { Box, Modal } from '@mui/material';
import { CONSTANTS } from '../constants';

import styles from '../styles/watchCard.module.less';

interface WatchCardProps {
    isVideoModalOpen: boolean;
    setIsVideoModalOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
}

const boxStyle = {
    position: 'relative',
    top: '50%',
    left: '50%',
    width: 800,
    height: 500,

    border: '2px solid #000',
    borderRadius: '35px',

    bgcolor: 'black',
    boxShadow: 24,

    transform: 'translate(-50%, -50%)',

    '@media (max-width: 820px)': {
        width: 'auto',
        height: 400,
    },
    '@media (max-width: 610px)': {
        width: 'auto',
        height: 350,
    },
};

const WatchCard: FC<WatchCardProps> = ({ id, isVideoModalOpen, setIsVideoModalOpen }) => (
    <Modal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}>
        <Box sx={boxStyle}>
            <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title={CONSTANTS.IFRAME_TITLE}
                allow={CONSTANTS.IFRAME_ALLOW}
                allowFullScreen
            />
        </Box>
    </Modal>
);

export default WatchCard;
