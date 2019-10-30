import React from 'react';
import classnames from 'classnames';

const Page = (props) => {
  const { active, onClick } = props;
  return (
    <li
      onClick={onClick}
      className={classnames('pagination-page', { active })}
    >
      <i className='fas fa-circle' />
    </li>
  );
};

export default Page;
