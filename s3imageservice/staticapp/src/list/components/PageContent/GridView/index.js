import React from 'react';
import classnames from 'classnames';
import keys from 'lodash/keys';

import StackGrid from 'react-stack-grid';

import { styles } from './styles.scss';

const GridView = (props) => (
  <div className={classnames('GridView', styles)}>
    {keys(props.children).map(day =>
      <div className='day-collection-container' key={day}>
        <h3>{day}</h3>
        <div className='day-collection'>
          <StackGrid
            monitorImagesLoaded
            columnWidth={200}
            duration={300}
            appearDelay={60}
            gutterWidth={15}
            gutterHeight={15}
          >
            {props.children[day].map(i =>
              <div key={i.id} className='image'>
                <a className='image-inner-container' href={`./detail/${i.id}`}>
                  <img src={i.canonical} alt={i.id} />
                </a>
              </div>
            )}
          </StackGrid>
        </div>
      </div>
    )}
  </div>
);

export default GridView;
