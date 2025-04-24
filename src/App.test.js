import { render, screen, waitFor } from '@testing-library/react';
import UsersPage from './pages/UsersPage';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'John Doe', email: 'john@example.com' }]),
  })
);

describe('UsersPage', () => {
  it('renders loading initially', () => {
    render(<UsersPage />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('renders user data after successful fetch', async () => {
    render(<UsersPage />);
    const user = await screen.findByText(/john doe/i);
    expect(user).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error("Network Error")));
    render(<UsersPage />);
    const error = await screen.findByText(/network error/i);
    expect(error).toBeInTheDocument();
  });
});
