import { FC, memo } from 'react';

import Typography from '@mui/material/Typography';
import { CONSTANTS } from '../constants';

import styles from '../styles/copyright.module.less';

const Copyright: FC = () => (
    <footer className={styles.footer}>
        <Typography
            variant="body2"
            mt={1}
            align="center"
            color="#808080"
            sx={{
                opacity: '0.8',
            }}>
            {CONSTANTS.COPYRIGHT} {new Date().getFullYear()}
        </Typography>
    </footer>
);

export default memo(Copyright);
