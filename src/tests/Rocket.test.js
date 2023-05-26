import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import Rocket from '../components/Rockets/Rocket';
import { fetchRockets, reserveRocket, cancelReserve } from '../Redux/Rockets/RocketsSlice';

const mockStore = configureStore([thunkMiddleware]);
const initialState = {
  rockets: {
    data: [
      {
        id: '1',
        name: 'Falcon 9',
        description: 'A two-stage rocket...',
        reserved: false,
        flickrImages: '',
      },
      {
        id: '2',
        name: 'Falcon Heavy',
        description: 'A super heavy-lift rocket...',
        reserved: true,
        flickrImages: '',
      },
    ],
    loading: false,
    isFetch: true,
  },
};

describe('Rocket', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = render(
      <Provider store={store}>
        <Rocket />
      </Provider>,
    );
  });

  it('should render loading state', () => {
    store = mockStore({
      ...initialState,
      rockets: {
        ...initialState.rockets,
        loading: true,
      },
    });

    component.rerender(
      <Provider store={store}>
        <Rocket />
      </Provider>,
    );

    expect(component.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render rocket cards', () => {
    const { getByText } = component;

    expect(getByText('Falcon 9')).toBeInTheDocument();
    expect(getByText('A two-stage rocket...')).toBeInTheDocument();
    expect(getByText('Reserve Rocket')).toBeInTheDocument();

    expect(getByText('Falcon Heavy')).toBeInTheDocument();
    expect(getByText('A super heavy-lift rocket...')).toBeInTheDocument();
    expect(getByText('Cancel Reservation')).toBeInTheDocument();
  });

  it('should dispatch reserveRocket action when Reserve Rocket button is clicked', () => {
    const { getByText } = component;
    const reserveButton = getByText('Reserve Rocket');

    fireEvent.click(reserveButton);

    expect(store.getActions()).toContainEqual(reserveRocket('1'));
  });

  it('should dispatch cancelReserve action when Cancel Reservation button is clicked', () => {
    const { getByText } = component;
    const cancelReserveButton = getByText('Cancel Reservation');

    fireEvent.click(cancelReserveButton);

    expect(store.getActions()).toContainEqual(cancelReserve('2'));
  });

  it('should dispatch fetchRockets action when isFetch is false', async () => {
    await store.dispatch(fetchRockets(false)).unwrap();

    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map((action) => action.type);

    expect(actionTypes).toContain('rockets/fetchRockets/pending');
    expect(actionTypes).toContain('rockets/fetchRockets/fulfilled');
  });
});
