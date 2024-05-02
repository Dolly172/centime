import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../components/Form';
import { Provider } from 'react-redux';
import store from '../store';

describe("Form", () => {
    test("should render the component", () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
    );
    });

    test('Input field for inflow is present when edit mode is true', () => {
        const { getByTestId } =  render(
            <Provider store={store}>
              <Form />
            </Provider>
        );
        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        expect(() => getByTestId('inflow_salary')).not.toThrow();
    });

    test('Input field for bills is present when edit mode is true', () => {
        const { getByTestId } =  render(
            <Provider store={store}>
              <Form />
            </Provider>
        );
        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        expect(() => getByTestId('outflow_bills')).not.toThrow();
    });

    test('Submit button works correctly', () => {
        const { getByTestId } =  render(
            <Provider store={store}>
              <Form />
            </Provider>
        );
        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        const inflowInput = getByTestId('inflow_salary'); // Update selector
        fireEvent.change(inflowInput, { target: { value: '6000' } });

        const billsInput = getByTestId('outflow_bills'); // Update selector
        fireEvent.change(billsInput, { target: { value: '1500' } });

        const submitButton = getByTestId('submit-button');
        fireEvent.click(submitButton);

    });
    
});
