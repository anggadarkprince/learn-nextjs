import {Fragment, PropsWithChildren} from 'react';

import MainHeader from './main-header';

function Layout(props: PropsWithChildren) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
