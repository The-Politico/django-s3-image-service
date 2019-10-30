import React, { useMemo } from 'react';
import classnames from 'classnames';

import Page from './Page';

import { styles } from './styles.scss';

const Pagination = (props) => {
  const { itemsPerPage } = props;
  const [active, updatePage] = props.page;
  const [hasNext, next] = props.next;
  const [hasPrevious, previous] = props.previous;
  const [data] = props.data;

  const count = useMemo(() => Math.ceil(data.count / itemsPerPage), [data]);

  const pages = useMemo(() => Array.from(new Array(count)).map((_, idx) => idx + 1), [count]);

  if (count < 2) {
    return null;
  }

  return (
    <div className={classnames('pagination', styles)}>
      <button onClick={previous} className={classnames('previous', { active: hasPrevious })}>
        <i className='fas fa-caret-left' />
      </button>

      <ul className='pages'>
        {pages.map(p =>
          <Page key={p} onClick={() => updatePage(p)} active={p === active}>{p}</Page>
        )}
      </ul>

      <button onClick={next} className={classnames('next', { active: hasNext })}>
        <i className='fas fa-caret-right' />
      </button>
    </div>
  );
};

export default Pagination;
