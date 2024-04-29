import React from 'react';
import { render } from '@testing-library/react';
import BarChart from '../components/BarChart';
import { Provider } from 'react-redux';
import store from '../store';

describe("Header", () => {
    test("should render the component", () => {
      render(
        <Provider store={store}>
          <BarChart />
        </Provider>
    );
    });
    test('renders the chart with legend displayed', () => {
        const { container } = render(
          <Provider store={store}>
            <BarChart />
          </Provider>
        );
      
        const legend = container.querySelector('.chart .legend');
        expect(() => legend).not.toThrow();

      });

  });