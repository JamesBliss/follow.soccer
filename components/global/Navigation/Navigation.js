import React from 'react';
import { useRouter } from 'next/router';

import Link from '../Link';
import Face from '../Face';

import { Menu, MenuItem } from './NavigationStyles';

// component
const Navigation = () => {
  const { query } = useRouter();

  return (
    <Menu>
      <Link activeClassName="active" href={{ pathname: `/live/${query.code}` }}>
        <MenuItem aria-label="Navigate to live screen">
          <Face />
        </MenuItem>
      </Link>
      <Link activeClassName="active" href={{ pathname: `/table/${query.code}` }}>
        <MenuItem aria-label="Navigate to Table">Table</MenuItem>
      </Link>
      <Link activeClassName="active" href={{ pathname: `/fixtures/${query.code}` }}>
        <MenuItem aria-label="Navigate to Fixtures">Fixtures</MenuItem>
      </Link>
    </Menu>
  );
};

export default Navigation;
