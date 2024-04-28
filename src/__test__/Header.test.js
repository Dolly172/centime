import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';

describe("Header", () => {
    it("should render the component", () => {
      render(<Header />);
    });
  });