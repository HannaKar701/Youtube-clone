import { useNavigate } from 'react-router-dom';

import { Button, Alert, Stack } from '@mui/material';

import { CONSTANTS } from '../constants';

const AlertError = () => {
    const navigate = useNavigate();
    return (
        <Stack
            sx={{
                justifyContent: 'space-around',
            }}
            spacing={1}>
            <Alert
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 0,
                    width: '100%',
                }}
                severity="error">
                {CONSTANTS.ALERT_MESSAGE}
            </Alert>

            <Stack sx={{ alignItems: 'center' }}>
                <Button
                    variant="contained"
                    sx={{
                        width: '30%',
                        borderRadius: '50px',
                        bgcolor: ' #aa0707',
                        ':hover': { backgroundColor: '#fd0808' },
                    }}
                    onClick={() => navigate('/Youtube-clone')}>
                    {CONSTANTS.BACK}
                </Button>
            </Stack>
        </Stack>
    );
};
export default AlertError;
