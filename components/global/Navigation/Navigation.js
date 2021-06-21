import React from 'react';

import Link from '../Link';
import Face from '../Face';

import { Menu, MenuItem } from './NavigationStyles';

// component
const Navigation = () => (
  <Menu>
    <Link activeClassName="active" href={{ pathname: '/' }}>
      <MenuItem aria-label="Navigate to live screen">
        <Face />
      </MenuItem>
    </Link>
    <Link activeClassName="active" href={{ pathname: '/table/pl' }}>
      <MenuItem aria-label="Navigate to Table">Table</MenuItem>
    </Link>
    <Link activeClassName="active" href={{ pathname: '/fixtures/pl' }}>
      <MenuItem aria-label="Navigate to Fixtures">Fixtures</MenuItem>
    </Link>
  </Menu>
);

export default Navigation;
