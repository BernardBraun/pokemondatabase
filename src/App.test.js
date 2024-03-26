/**
 * @jest-environment jsdom
 */

/**
 * @babel/preset-env is needed to use ES6+ features.
 * @babel/preset-react is needed to use JSX syntax.
 */

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
