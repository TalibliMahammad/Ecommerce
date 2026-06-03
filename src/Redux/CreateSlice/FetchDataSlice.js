import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { data } from 'react-router-dom';

export const fetchProducts = () => async (dispatch) => {
    dispatch(fetchDataStart());

    try {
        const res = await fetch('../../Data/Data.json');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        if (!data || Object.keys(data).length === 0) {
            throw new Error('Data not found');
        }
        dispatch(fetchDataSuccess(data));
        ;
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
        console.error("FETCH ERROR:", error.message);
    }
};



export const fetchDataSlice = createSlice({
    name: 'fetchData',

    initialState: {
        data: {},
        loading: false,
        error: null,
        filtered: [],
    },

    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;

        },
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        filterData(state, action) {
            let allData = [];

            for (let categoryKey in state.data) {
                const category = state.data[categoryKey];

                for (let subKey in category) {
                    const array = category[subKey];

                    // Əgər array-disə, concat et
                    if (Array.isArray(array)) {
                        allData = allData.concat(array);
                    }
                }
            }

            const plainAllData = JSON.parse(JSON.stringify(allData));


            const filteredData = plainAllData.filter(item => {
                const searchTerm = action.payload.toLowerCase();

                return (
                    item.category?.name?.toLowerCase().includes(searchTerm) ||
                    item.title?.toLowerCase().includes(searchTerm) ||
                    item.brand?.toLowerCase().includes(searchTerm) ||
                    item.name?.toLowerCase().includes(searchTerm)
                );
            });


            state.filtered = filteredData;
        },


    },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, filterData } = fetchDataSlice.actions;

export default fetchDataSlice.reducer;