import { FC } from 'react';

import { Box, CircularProgress, Stack } from '@mui/material';

const Loader: FC = () => (
    <Box minHeight="95vh" zIndex="100">
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            zIndex="100"
            height="80vh">
            <CircularProgress />
        </Stack>
    </Box>
);

export default Loader;
