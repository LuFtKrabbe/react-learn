import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import { HYDRATE } from 'next-redux-wrapper';

export type PaginationState = {
  page: number;
  itemsPerPage: 5 | 10;
  itemsQuantity: number;
};

const initialState: PaginationState = {
  page: 1,
  itemsPerPage: 10,
  itemsQuantity: 60,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      console.log(action);
    },
    setItemsPerPage: (state, action: PayloadAction<5 | 10>) => {
      state.itemsPerPage = action.payload;
    },
    setItemsQuantity: (state, action: PayloadAction<number>) => {
      state.itemsQuantity = action.payload;
    },
  },
  /*   extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action);
      return {
        ...state,
        ...action.payload.pagination,
      }
    } 
  } */
});

export const { setPage, setItemsPerPage, setItemsQuantity } =
  paginationSlice.actions;

export default paginationSlice.reducer;
