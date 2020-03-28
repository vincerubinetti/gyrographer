import React from 'react';

import { Tooltip } from '../components/tooltip';

import { ReactComponent as HelpIcon } from '../images/help.svg';

const HelpLink = () => (
  <Tooltip content='Help and source code'>
    <a
      className='button'
      target='_blank'
      rel='noopener noreferrer'
      href='https://github.com/vincerubinetti/gyrographer#readme'
    >
      <HelpIcon />
    </a>
  </Tooltip>
);

export { HelpLink };
