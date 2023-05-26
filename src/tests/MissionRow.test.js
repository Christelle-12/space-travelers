import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import MissionRow from '../components/Missions/MissionRow';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../Redux/Missions/missionsSlice', () => ({
  fetchMissions: jest.fn(),
  joinMission: jest.fn(),
  leaveMission: jest.fn(),
}));

const props = {
  id: '1',
  name: 'Mission Name',
  description: 'Mission Description',
  reserved: false,
};

describe('MissionRow', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', async () => {
    const { getByText } = render(
      <table>
        <tbody>
          <MissionRow
            id={props.id}
            name={props.name}
            description={props.description}
            reserved={false}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByText('Mission Name')).toBeInTheDocument();
    expect(getByText('NOT A MEMBER')).toBeInTheDocument();
    expect(getByText('Mission Description')).toBeInTheDocument();
  });

  test('dispatches joinMission action when "Join Mission" button is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <MissionRow
            id={props.id}
            name={props.name}
            description={props.description}
            reserved={false}
          />
        </tbody>
      </table>,
    );

    const joinButton = getByText('Join Mission');
    fireEvent.click(joinButton);

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  test('dispatches leaveMission action when "Leave Mission" button is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <MissionRow
            id={props.id}
            name={props.name}
            description={props.description}
            reserved
          />
        </tbody>
      </table>,
    );

    const leaveButton = getByText('Leave Mission');
    fireEvent.click(leaveButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
