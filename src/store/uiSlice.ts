import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    viewMode: 'grid' | 'list';
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    searchQuery: string;
}

const initialState: UiState = {
    viewMode: 'grid',
    sortBy: 'name',
    sortOrder: 'asc',
    searchQuery: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewMode = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        toggleSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setViewMode, setSortBy, toggleSortOrder, setSearchQuery } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
export default uiSlice.reducer;