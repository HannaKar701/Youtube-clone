import { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    ListItemButton,
    ListItemText,
    MenuItem,
    Modal,
    Slider,
    Stack,
    TextField,
    Typography,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteItem, editItem } from '../redux/savedRequestsSlice';
import { useAppDispatch } from '../redux/hooks';
import { fetchYouTubeVideos } from '../redux/fetchYouTubeVideos';
import { CONSTANTS } from '../constants';

interface SavedRequestProps {
    savedRequest: string;
    newResult: number | string;
    newSort: string;
}

const SavedRequest: FC<SavedRequestProps> = ({ savedRequest, newResult, newSort }) => {
    const [formData, setFormData] = useState({
        newState: savedRequest || '',
        results: newResult,
        sort: newSort,
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleModalClose = (): void => {
        setIsModalOpen(false);
        setFormData((prevState) => {
            return {
                ...prevState,
                newState: savedRequest || '',
                results: newResult,
                sort: newSort,
            };
        });
    };
    const handleModalOpen = (e: MouseEvent): void => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleSortChange = (e: SelectChangeEvent): void =>
        setFormData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });

    const handleNewRequestChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value as string };
        });
    };

    const handleSliderChange = (_e: Event, newValue: number | number[]): void => {
        setFormData((prevState) => ({
            ...prevState,
            results: newValue as number,
        }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prevState) => ({
            ...prevState,
            results: e.target.value === '' ? '' : Number(e.target.value),
        }));
    };

    const handleBlur = (): void => {
        Number(formData.results) < 1 &&
            setFormData((prevState) => ({
                ...prevState,
                results: 1,
            }));
        Number(formData.results) > 50 &&
            setFormData((prevState) => ({
                ...prevState,
                results: 50,
            }));
    };

    const handleDeleteItem = (e: MouseEvent): void => {
        e.stopPropagation();
        dispatch(deleteItem(savedRequest));
    };

    const handleOnClickRequest = (): void => {
        dispatch(
            fetchYouTubeVideos({
                search: savedRequest,
                results: formData.results,
                sort: formData.sort,
            }),
        );
        navigate('/Youtube-clone/home');
    };

    const handleSaveButton = (e: MouseEvent): void => {
        e.preventDefault();
        dispatch(
            editItem({
                prevState: savedRequest,
                newState: formData.newState,
                results: formData.results,
                sort: formData.sort,
            }),
        );
        setIsModalOpen(false);
    };

    return (
        <>
            <ListItemButton
                onClick={handleOnClickRequest}
                alignItems="center"
                sx={{
                    mb: 1,
                    mr: 3,
                    color: '#fff',
                    bgcolor: '#8b0000',
                    ':hover': { bgcolor: '#ff0000' },
                }}>
                <ListItemText primary={savedRequest} />

                <IconButton
                    onClick={handleModalOpen}
                    edge="end"
                    sx={{ color: '#fff', ':hover': { color: '#000' } }}>
                    <EditIcon />
                </IconButton>

                <IconButton
                    onClick={handleDeleteItem}
                    edge="end"
                    sx={{ color: '#fff', ':hover': { color: '#000' } }}>
                    <DeleteIcon />
                </IconButton>
            </ListItemButton>

            <Modal
                aria-labelledby="modal-title"
                open={isModalOpen}
                onClose={handleModalClose}
                disableEscapeKeyDown>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: '#fff',
                        boxShadow: 24,

                        p: 4,
                        '@media (max-width: 600px)': {
                            left: '15%',
                            top: '20%',

                            transform: 'translate(-10%, -20%)',
                        },
                    }}>
                    <Box component="form">
                        <Typography
                            id="modal-title"
                            variant="h4"
                            component="h4"
                            mb={2}
                            textAlign="center">
                            {CONSTANTS.EDIT_A_REQUEST}
                        </Typography>
                        <TextField
                            value={savedRequest}
                            disabled={true}
                            label="Request"
                            variant="filled"
                            fullWidth
                        />
                        <TextField
                            value={formData.newState}
                            onChange={handleNewRequestChange}
                            required={true}
                            autoFocus={true}
                            label="Edited request"
                            name="newState"
                            fullWidth
                            sx={{ mt: 2 }}
                            color="error"
                        />

                        <InputLabel id="demo-select-small-label" sx={{ mt: 1 }}>
                            {CONSTANTS.SORT_LABEL}
                        </InputLabel>

                        <Select
                            value={formData.sort}
                            onChange={handleSortChange}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name="sort"
                            fullWidth
                            color="error">
                            <MenuItem value={CONSTANTS.SORT_OPTIONS.RELEVANCE}>
                                {CONSTANTS.SORT_OPTIONS.RELEVANCE}
                            </MenuItem>
                            <MenuItem value={CONSTANTS.SORT_OPTIONS.DATE}>
                                {CONSTANTS.SORT_OPTIONS.DATE}
                            </MenuItem>
                            <MenuItem value={CONSTANTS.SORT_OPTIONS.RATING}>
                                {CONSTANTS.SORT_OPTIONS.RATING}
                            </MenuItem>
                            <MenuItem value={CONSTANTS.SORT_OPTIONS.VIEW_COUNT}>
                                {CONSTANTS.SORT_OPTIONS.VIEW_COUNT}
                            </MenuItem>
                            <MenuItem value={CONSTANTS.SORT_OPTIONS.TITLE}>
                                {CONSTANTS.SORT_OPTIONS.TITLE}
                            </MenuItem>
                        </Select>

                        <InputLabel id="input-slider" sx={{ mt: 3 }}>
                            {CONSTANTS.SLIDER_LABEL}
                        </InputLabel>

                        <Stack direction="row" width="100%" sx={{ mt: 1 }}>
                            <Slider
                                value={typeof formData.results === 'number' ? formData.results : 1}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                                defaultValue={12}
                                min={1}
                                max={50}
                                sx={{ display: 'block', width: '60%', color: '#ff0000' }}
                            />

                            <Grid item sx={{ color: '#ff0000', ml: 2 }}>
                                <TextField
                                    value={formData.results}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    type="number"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        max: 50,
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    color="error"
                                />
                            </Grid>
                        </Stack>

                        <Stack direction="row" width="100%" sx={{ mt: 1 }}>
                            <Button
                                onClick={handleModalClose}
                                variant="contained"
                                sx={{ width: '45%', mt: 4 }}
                                color="error">
                                {CONSTANTS.MODAL_BUTTON_CLOSE}
                            </Button>

                            <Button
                                onClick={handleSaveButton}
                                disabled={!formData?.newState}
                                variant="contained"
                                sx={{
                                    display: 'block',
                                    mt: 4,
                                    ml: 'auto',
                                    width: '45%',
                                }}
                                color="error">
                                {CONSTANTS.MODAL_BUTTON_SAVE}
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
export default SavedRequest;
