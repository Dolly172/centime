import { createSlice, configureStore } from '@reduxjs/toolkit';
import i18n from '../i18n';

const initialState = {
  data: {
    inflow: {
      salary: 5000,
      total: 5000
    },
    outflow: {
        bills: 1000,
        misc: 2000,
        total: 3000,
    },
    remaining: 2000 
  },

  settings: {
    language: 'en',
  },
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    updateData: (state, action) => {
      // console.log(action);
      state.data = action.payload;
    },
  },
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    chart: chartSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export const { updateData } = chartSlice.actions;
export const { changeLanguage } = settingsSlice.actions;

export default store;
