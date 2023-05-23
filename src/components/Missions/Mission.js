import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../../Redux/Missions/missionsSlice';
import styles from '../../css/missionstable.module.css';
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
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableCell}>
            <th className={styles.tableCell}>Mission</th>
            <th className={styles.tableCell}>Description</th>
            <th className={styles.tableCell}>Status</th>
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
