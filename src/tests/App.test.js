import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as ReactRedux from 'react-redux';
import store from '../Redux/Store';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

test('renders the App component', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  useDispatchMock.mockReturnValue(jest.fn());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  // Test for the Navigation component
  const navigationElement = screen.getByText(/Space Travelers' Hub/i);
  expect(navigationElement).toBeInTheDocument();

  // Test for the Mission component
  const missionElement = screen.getByText(/Mission/i);
  expect(missionElement).toBeInTheDocument();

  // Test for the Profile component
  const profileElement = screen.getByText(/My Profile/i);
  expect(profileElement).toBeInTheDocument();
});
