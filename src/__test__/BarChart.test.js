import React from 'react';
import { render } from '@testing-library/react';
import BarChart from '../components/BarChart';
import { Provider } from 'react-redux';
import store from '../store';

describe("Header", () => {
    it("should render the component", () => {
      render(
        <Provider store={store}>
          <BarChart />
        </Provider>
      
    );
    });
  });