import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';

describe("Header", () => {
    test("should render the component", () => {
      render(<Header />);
    });
    test('renders logo image with alt text', () => {

      const { getByAltText } = render(<Header />);
      expect(() => getByAltText('centime-logo')).not.toThrow();
    });
  });