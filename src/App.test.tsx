import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders memoire title', () => {
  render(<App />);
  const linkElement = screen.getByText(/testTitle/);
  expect(linkElement).toBeInTheDocument();
});
