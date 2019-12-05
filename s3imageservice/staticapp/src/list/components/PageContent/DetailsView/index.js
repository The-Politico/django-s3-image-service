import React from 'react';
import classnames from 'classnames';
import keys from 'lodash/keys';

import Image from './Image';

import { styles } from './styles.scss';

const DetailsView = (props) => {
  const { children: data } = props;

  return (
    <div className={classnames('details-view', styles)}>
      {keys(props.children).map(day =>
        <div className='day-collection-container' key={day}>
          <h3>{day}</h3>
          <div className='day-collection'>
            {props.children[day].map(d =>
              <Image key={d.id} {...d} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsView;
