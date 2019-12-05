import React from 'react';
import CopyInput from 'Common/components/CopyInput';

const Image = (props) => {
  const { canonical, id, data, slug } = props;

  return (
    <div className='image-row'>
      <div className='preview'>
        <a href={`./detail/${id}`}>
          <img src={canonical} alt={id} />
        </a>
      </div>

      <div className='slug'>
        <CopyInput
          label='Unique ID'
          value={slug}
        />
      </div>

      <div className='canonical'>
        <CopyInput
          label='Canonical Link'
          value={canonical}
        />
      </div>

      <div className='more'>
        <a href={`./detail/${id}`}>More</a>
      </div>
    </div>
  );
};

export default Image;
