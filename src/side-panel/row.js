import React from 'react';

import { Tooltip } from '../components/tooltip';

import './row.css';

const Row = ({ icon, text, tooltip, control }) => (
  <div className="side_panel_row">
    <div>{icon}</div>
    <Tooltip content={tooltip}>
      <div>{text}</div>
    </Tooltip>
    <div>{control}</div>
  </div>
);

export { Row };
