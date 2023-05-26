import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import Mission from '../components/Missions/Mission';
import { fetchMissions } from '../Redux/Missions/missionsSlice';

// Mocking react-redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mocking fetchMissions action creator
jest.mock('../Redux/Missions/missionsSlice', () => ({
  fetchMissions: jest.fn(),
}));

describe('Mission component', () => {
  // Sample missions data
  const sampleData = [
    {
      id: 1,
      name: 'Mission 1',
      description: 'Description 1',
      reserved: true,
    },
    {
      id: 2,
      name: 'Mission 2',
      description: 'Description 2',
      reserved: false,
    },
  ];

  beforeEach(() => {
    // Mocking useSelector to return sample data
    useSelector.mockImplementation((selectorFn) => selectorFn({
      missions: {
        data: sampleData,
        loading: false,
        isFetched: true,
      },
    }));
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    fetchMissions.mockClear();
  });

  it('dispatches fetchMissions if isFetched is false', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    // Mocking useSelector to return isFetched as false
    useSelector.mockImplementation((selectorFn) => selectorFn({
      missions: {
        data: [],
        loading: false,
        isFetched: false,
      },
    }));

    render(<Mission />);

    expect(dispatch).toHaveBeenCalledWith(fetchMissions());
  });

  test('renders loading message when loading is true', () => {
    // Mocking useSelector to return loading state
    useSelector.mockImplementation((selectorFn) => selectorFn({
      missions: {
        data: [],
        loading: true,
        isFetched: true,
      },
    }));

    render(<Mission />);
    const loadingText = screen.getByText('Loading...');

    expect(loadingText).toBeInTheDocument();
  });

  test('renders mission table with rows when loading is false', () => {
    render(<Mission />);

    const tableRows = screen.getAllByRole('row');

    expect(tableRows.length).toBe(3);

    const firstRow = tableRows[0];
    expect(firstRow).toHaveTextContent('Mission');
    expect(firstRow).toHaveTextContent('Description');
    expect(firstRow).toHaveTextContent('Status');

    const mission1Row = tableRows[1];
    expect(mission1Row).toHaveTextContent('Mission 1');
    expect(mission1Row).toHaveTextContent('Description 1');
    expect(mission1Row).toHaveClass('tableRow');

    const mission2Row = tableRows[2];
    expect(mission2Row).toHaveTextContent('Mission 2');
    expect(mission2Row).toHaveTextContent('Description 2');

    const joinBtns = screen.getAllByRole('button');

    expect(joinBtns.length).toBe(4);
  });
});
