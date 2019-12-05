import React from 'react';
import classnames from 'classnames';

import CodeBlock from 'Common/components/CodeBlock';
import CopyInput from 'Common/components/CopyInput';

import { styles } from './styles.scss';

const Uploads = (props) => {
  const { canonical, data, slug } = props;

  return (
    <div className={classnames('verticals', styles)}>
      <h1>{slug}</h1>
      <img src={canonical} alt={slug} />

      <div className='data-container'>
        <CopyInput
          label='Unique ID'
          value={slug}
        />

        <CopyInput
          label='Canonical Link'
          value={data.canonical}
        />
      </div>

      {data.sizes &&
        <>
          <h2>More Sizes</h2>
          <div className='data-container sizes'>
            {data.sizes.map((s, idx) =>
              <CopyInput
                key={s}
                label={`${s}`}
                value={data.urls[idx]}
              />
            )}
          </div>
        </>
      }

      <h2>{`<Img> Props`}</h2>
      <CodeBlock
        value={JSON.stringify(data.img, null, 2)}
      />

      <h2>Full Data</h2>
      <CodeBlock
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  );
};

export default Uploads;
