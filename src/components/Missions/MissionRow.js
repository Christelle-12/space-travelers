import React from 'react';
import PropTypes from 'prop-types';

const MissionRow = ({
  props,
}) => {
  const { name, description } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>Status</td>
      <td> </td>
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
};

export default MissionRow;
