import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppBar, Button, List, Stack, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppSelector } from '../../redux/hooks';
import { Copyright, Loader, SavedRequest } from '..';
import { CONSTANTS } from '../../constants';

import styles from '../../styles/savedRequestsPage.module.less';

const SavedRequestsPage: FC = () => {
    const navigate = useNavigate();
    const savedRequestsList = useAppSelector((state) => state.savedRequests.value);
    const { loading } = useAppSelector((state) => state.youtube);

    const searchListItems = savedRequestsList?.map((request, index: number) => (
        <SavedRequest
            savedRequest={request.search}
            newResult={request.results}
            newSort={request.sort}
            key={index}
        />
    ));

    const handleLogOut = (): void => {
        navigate('/Youtube-clone');
        sessionStorage.removeItem('token');
    };

    return loading ? (
        <Loader />
    ) : (
        <AppBar elevation={1} className={styles.body}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                position="sticky"
                top={0}
                p={2}>
                <Link to="/Youtube-clone/home">
                    <img className={styles.logo} src={CONSTANTS.LOGO_URL} alt="logo" height={45} />
                </Link>

                <Typography
                    className={styles.title}
                    component="h1"
                    sx={{
                        '@media (max-width: 670px)': {
                            fontSize: '30px',
                        },
                        '@media (max-width: 525px)': {
                            fontSize: '20px',
                        },
                    }}
                    color="error">
                    {CONSTANTS.SAVED_REQUESTS}
                </Typography>

                <Button
                    onClick={() => handleLogOut()}
                    sx={{
                        fontSize: '21px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        ':hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '4.5px',
                        },
                    }}
                    color="error"
                    startIcon={<LogoutIcon fontSize="large" />}>
                    {CONSTANTS.LOG_OUT}
                </Button>
            </Stack>

            <List sx={{ ml: '12px' }}>
                {searchListItems?.length ? (
                    searchListItems
                ) : (
                    <Typography
                        component="h4"
                        variant="h4"
                        mt={35}
                        fontStyle="italic"
                        textAlign="center"
                        letterSpacing={2}
                        sx={{
                            transition: '0.8s',
                            ':hover': {
                                textDecoration: 'underline #ff0000',
                                textUnderlineOffset: '8px',
                            },
                        }}>
                        <Link to="/Youtube-clone/home">{CONSTANTS.ADD_YOUR_FIRST_REQUEST}</Link>
                    </Typography>
                )}
            </List>
            <Copyright />
        </AppBar>
    );
};
export default SavedRequestsPage;
