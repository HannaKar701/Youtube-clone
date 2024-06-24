import { FC, FormEvent, ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    AppBar,
    FormLabel,
    IconButton,
    InputAdornment,
    Tooltip,
    FormControl,
    RadioGroup,
    Radio,
    Container,
    Typography,
    Box,
    Grid,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { LoadingButton } from '@mui/lab';

import { Copyright } from '..';
import { CONSTANTS } from '../../constants';

import styles from '../../styles/registration.module.less';

enum Gender {
    Female = 'female',
    Male = 'male',
}

const Registration: FC = () => {
    const [age, setAge] = useState<number | string>('');
    const [gender, setGender] = useState<Gender>(Gender.Female);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

    const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

    const navigate = useNavigate();

    const onChangeGender = (e: ChangeEvent<HTMLInputElement>): void =>
        setGender(e.target.value as Gender);

    const onChangeAge = (e: ChangeEvent<HTMLInputElement>): void =>
        setAge(e.target.value === '' ? '' : Number(e.target.value));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsRequestSent(true);

        try {
            const { status } = await axios.post(import.meta.env.VITE_APP_REGISTER, {
                username,
                password,
                email,
                gender,
                age,
            });
            setIsRequestSent(false);
            navigate('/Youtube-clone');

            console.log(status);
        } catch (error) {
            setIsRequestSent(false);
            navigate('/error');
        }
    };

    const handleBlur = (): void => {
        Number(age) < 10 && setAge(10);
        Number(age) > 100 && setAge(100);
    };

    return (
        <Container maxWidth="xs" className={styles.container}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '20px',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <YouTubeIcon
                        className={styles.youtubeIcon}
                        sx={{
                            m: 1,
                            fontSize: '45px',
                            color: '#ff0000',
                            opacity: 0.9,
                        }}
                    />
                    <Typography component="h5" variant="h5" color="#000">
                        {CONSTANTS.APP_NAME}
                    </Typography>
                </Box>

                <Typography className={styles.title} component="h5" variant="h5" color="#000">
                    {CONSTANTS.REGISTRATION}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <FormControl sx={{ m: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={true}
                                    label={CONSTANTS.USERNAME_LABEL}
                                    id="username"
                                    name="username"
                                    autoFocus
                                    fullWidth
                                    color="error"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                    label={CONSTANTS.EMAIL_LABEL}
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    fullWidth
                                    color="error"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Tooltip
                                    title={CONSTANTS.TOOLTIP_TITLE}
                                    id="password"
                                    placement="left-start"
                                    arrow>
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required={true}
                                        type={isPasswordShown ? 'text' : 'password'}
                                        label={CONSTANTS.PASSWORD_LABEL}
                                        id="password"
                                        name="password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() =>
                                                            setIsPasswordShown(!isPasswordShown)
                                                        }>
                                                        {isPasswordShown ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        color="error"
                                    />
                                </Tooltip>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={age}
                                    onChange={onChangeAge}
                                    onBlur={handleBlur}
                                    required={true}
                                    label={CONSTANTS.AGE_LABEL}
                                    id="age"
                                    name="age"
                                    type="number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        type: 'number',
                                        pattern: '[0-9]*',
                                        min: 10,
                                        max: 100,
                                        'aria-labelledby': 'age',
                                    }}
                                    fullWidth
                                    color="error"
                                />
                            </Grid>

                            <FormLabel
                                aria-labelledby="gender"
                                required={true}
                                sx={{ m: 3 }}
                                color="error">
                                {CONSTANTS.GENDER_LABEL}
                            </FormLabel>
                            <RadioGroup value={gender} onChange={onChangeGender} name="gender" row>
                                <FormControlLabel
                                    label={CONSTANTS.FEMALE_LABEL}
                                    control={<Radio color="error" />}
                                    value={Gender.Female}
                                    sx={{ color: '#000' }}
                                />
                                <FormControlLabel
                                    label={CONSTANTS.MALE_LABEL}
                                    control={<Radio color="error" />}
                                    value={Gender.Male}
                                    sx={{ color: '#000' }}
                                />
                            </RadioGroup>
                        </Grid>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isRequestSent}
                            loading={isRequestSent}
                            sx={{
                                mt: 1,
                                mb: 2,
                                border: '1.5px solid #000',
                                borderRadius: '50px',
                                bgcolor: '#0f0f0f',
                                ':hover': {
                                    bgcolor: ' #fd0808',
                                },
                            }}>
                            <span>{CONSTANTS.SIGN_UP}</span>
                        </LoadingButton>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/Youtube-clone" className={styles.hasAccount}>
                                    {CONSTANTS.ALREADY_HAVE_AN_ACCOUNT} &nbsp;
                                </Link>

                                <Link to="/Youtube-clone" className={styles.signIn}>
                                    {CONSTANTS.SIGN_IN}
                                </Link>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Box>
            </Box>

            <AppBar position="fixed">
                <Copyright />
            </AppBar>
        </Container>
    );
};

export default Registration;
