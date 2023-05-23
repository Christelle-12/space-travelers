import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../../Redux/Missions/missionsSlice';
import MissionRow from './MissionRow';

const Mission = () => {
  const { data, loading } = useSelector((state) => state.missions);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <td>Mission</td>
            <td>Description</td>
            <td>Status</td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {data.map((each) => <MissionRow key={each.id} props={each} />)}
        </tbody>
      </table>
    </div>
  );
};
export default Mission;
