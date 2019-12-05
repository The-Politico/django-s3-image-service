import React from 'react';
import classnames from 'classnames';

import Branding from './Branding';
import Breadcrumb from './Breadcrumb';
import Info from './Info';
import Save from './Save';
import New from './New';

import { styles } from './styles.scss';

const Navigation = (props) => {
  const { error, lastUpdated, onSave, saveText, breadcrumbs, allowNew, newLink, shouldConfirm } = props;
  const contextForm = props.children.contextForm;

  return (
    <div className={classnames('navigation', styles)}>
      <nav className='global'>
        <Branding />
        {breadcrumbs.map(({ href, title }) =>
          <Breadcrumb key={href} href={href}>{title}</Breadcrumb>
        )}
        <div className='align-right'>
          <Info error={error} lastUpdated={lastUpdated} />
          {contextForm}

          <Save onSave={onSave}>{saveText}</Save>
          <New active={allowNew} href={newLink} shouldConfirm={shouldConfirm} />
        </div>
      </nav>
    </div>
  );
};

Navigation.defaultProps = {
  allowNew: false,
  newLink: '../',
  shouldConfirm: true,
};

export default Navigation;
