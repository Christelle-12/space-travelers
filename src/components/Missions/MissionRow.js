import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from '../../css/missionstable.module.css';
import { joinMission, leaveMission } from '../../Redux/Missions/missionsSlice';

const MissionRow = ({
  props,
}) => {
  const {
    name, id, description, reserved,
  } = props;

  const dispatch = useDispatch();

  return (
    <tr className={styles.tableRow}>
      <th className={styles.tableCell}>{name}</th>
      <td className={styles.tableCell}>{description}</td>
      <td className={styles.tableCell}>
        {reserved === true
          && (
          <button
            className={styles.member}
            type="button"
          >
            Active Member
          </button>
          )}
        {reserved !== true
          && (
          <button
            className={styles.notMember}
            type="button"
          >
            NOT A MEMBER
          </button>
          )}
      </td>
      <td className={styles.tableCell}>
        {reserved === true
          && (
          <button
            className={styles.leave}
            type="button"
            onClick={() => dispatch(leaveMission(id))}
          >
            Leave Mission
          </button>
          )}
        {reserved !== true
          && (
          <button
            className={styles.join}
            type="button"
            onClick={() => dispatch(joinMission(id))}
          >
            Join Mission
          </button>
          )}
      </td>
    </tr>
  );
};

MissionRow.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default MissionRow;
