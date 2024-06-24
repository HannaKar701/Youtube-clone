import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from '@mui/material';

import { AppBar, Box, Button, IconButton, Stack, TextField, Tooltip } from '@mui/material';

import { Copyright, Loader, Videos } from '..';
import { CONSTANTS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem } from '../../redux/savedRequestsSlice';
import { fetchYouTubeVideos } from '../../redux/fetchYouTubeVideos';

import styles from '../../styles/homePage.module.less';

declare namespace JSX {
    interface IntrinsicElements {
        div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
}

const HomePage: FC = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        search: '',
    });

    const { data, loading } = useAppSelector((state) => state.youtube);
    const savedRequestsList = useAppSelector((state) => state.savedRequests.value);

    const isBookmarkIconActive = (_str: string): boolean =>
        (formData.search ? false : true) ||
        savedRequestsList.some(
            (request) =>
                request.search.trim().toLowerCase() === formData.search.trim().toLowerCase(),
        );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });

    const handleBookmarkIconClick = () => dispatch(addItem(formData.search));

    const handleFormSubmit = (e: FormEvent): void => {
        e.preventDefault();
        dispatch(
            fetchYouTubeVideos({
                search: formData.search,
                results: 12,
                sort: CONSTANTS.SORT_OPTIONS.RELEVANCE,
            }),
        );
    };

    const handleLogOut = (): void => {
        navigate('/Youtube-clone');
        sessionStorage.removeItem('token');
    };

    return loading ? (
        <Loader />
    ) : (
        <AppBar className={styles.body} elevation={1}>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                alignItems="center"
                justifyContent="space-around"
                position="relative"
                top={0}
                p={2}>
                <Link to="/Youtube-clone/home">
                    <img className={styles.youtubeLogo} src={CONSTANTS.LOGO_URL} alt="logo" />
                </Link>

                <Button
                    onClick={() => navigate('/Youtube-clone/home/saved')}
                    color="error"
                    sx={{
                        fontSize: '21px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        ':hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px',
                        },
                        ...(isMobile && {
                            fontSize: '17px',
                            mt: 1, // Отступ сверху для переноса элемента вниз
                        }),
                    }}
                    startIcon={<BookmarkIcon fontSize="large" />}>
                    {CONSTANTS.SAVED_LINK}
                </Button>

                <Button
                    onClick={() => handleLogOut()}
                    color="error"
                    sx={{
                        fontSize: '21px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        ':hover': {
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px',
                        },
                        ...(isMobile && {
                            fontSize: '16px',
                            mt: 1, // Отступ сверху для переноса элемента вниз
                        }),
                    }}
                    startIcon={<LogoutIcon fontSize="large" />}>
                    {CONSTANTS.LOG_OUT}
                </Button>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                spacing={2}
                mt="10px"
                width="100%">
                <Box component="form" onSubmit={handleFormSubmit} className={styles.searchForm}>
                    <TextField
                        value={formData.search}
                        onChange={handleInputChange}
                        autoFocus={true}
                        placeholder="Search..."
                        variant="standard"
                        type="search"
                        name="search"
                        color="error"
                        sx={{
                            width: '95%',
                            bgcolor: '#fff',
                        }}
                        InputProps={{
                            endAdornment: (
                                <>
                                    {formData.search && (
                                        <Tooltip title={CONSTANTS.TOOLTIP_SAVE_A_REQUEST}>
                                            <IconButton
                                                onClick={handleBookmarkIconClick}
                                                aria-label="Bookmark Icon"
                                                edge="end"
                                                sx={{
                                                    ':hover': { color: '#ff0000' },
                                                }}>
                                                {isBookmarkIconActive(formData.search) ? (
                                                    <BookmarkIcon sx={{ fill: '#ff0000' }} />
                                                ) : (
                                                    <BookmarkIcon />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    <IconButton
                                        aria-label="Search Icon"
                                        type="submit"
                                        sx={{ p: '10px', color: '#ff0000' }}>
                                        <SearchIcon />
                                    </IconButton>
                                </>
                            ),
                        }}
                    />
                </Box>
            </Stack>

            <div className={styles.videoContainer}>
                {data && <Videos videos={data} formDataSearch={formData.search} />}
            </div>

            <Copyright />
        </AppBar>
    );
};
export default HomePage;
