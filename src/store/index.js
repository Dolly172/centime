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

      const { inflow, outflow } = action.payload;
      if (inflow) {
        state.data.inflow = inflow;
      }
      if (outflow) {
        state.data.outflow = outflow;
      }
      const totalInflow = Object.values(state.data.inflow).reduce((acc, curr) => acc + curr, 0);
      const totalOutflow = Object.values(state.data.outflow).reduce((acc, curr) => acc + curr, 0);
      state.data.remaining = totalInflow - totalOutflow;
     
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
