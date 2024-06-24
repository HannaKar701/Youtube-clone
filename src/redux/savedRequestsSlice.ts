import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CONSTANTS } from '../constants';

type EditItem = {
    prevState: string;
    newState: string;
    results: number | string;
    sort: string;
};

type List = {
    search: string;
    results: number | string;
    sort: string;
};

type SearchListState = {
    value: List[];
};

const initialState: SearchListState = {
    value: [],
};

export const savedRequestsSlice = createSlice({
    name: 'savedRequests',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.value.some(
                (request) =>
                    request.search.toLowerCase().trim() === action.payload.toLowerCase().trim(),
            ) ||
                state.value.push({
                    search: action.payload,
                    results: 12,
                    sort: CONSTANTS.SORT_OPTIONS.RELEVANCE,
                });
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            const newArr = state.value.filter((request) => request.search !== action.payload);
            return { ...state, value: newArr };
        },
        editItem: (state, action: PayloadAction<EditItem>) => {
            const { prevState, newState, results, sort } = action.payload;

            const isDuplicate = state.value.some(
                (request) => request.search.toLowerCase().trim() === newState.toLowerCase().trim(),
            );

            if (isDuplicate) {
                return state;
            }

            const newArr = state.value.map((request) =>
                request.search === prevState
                    ? {
                          search: newState,
                          results,
                          sort,
                      }
                    : request,
            );
            return { ...state, value: newArr };
        },
    },
});

export const { addItem, deleteItem, editItem } = savedRequestsSlice.actions;

export default savedRequestsSlice.reducer;
