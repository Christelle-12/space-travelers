import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/missionstable.module.css';

const MissionRow = ({
  props,
}) => {
  const { name, description, Reserved } = props;
  return (
    <tr className={styles.tableRow}>
      <th className={styles.tableCell}>{name}</th>
      <td className={styles.tableCell}>{description}</td>
      <td className={styles.tableCell}>
        {Reserved === true && <button className={styles.member} type="button">Active Member</button>}
        {Reserved !== true && <button className={styles.notMember} type="button">NOT A MEMBER</button>}
      </td>
      <td className={styles.tableCell}>
        {Reserved === true && <button className={styles.leave} type="button">Leave Mission</button>}
        {Reserved !== true && <button className={styles.join} type="button">Join Mission</button>}
      </td>
    </tr>
  );
};

MissionRow.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Reserved: PropTypes.bool.isRequired,
};

export default MissionRow;
