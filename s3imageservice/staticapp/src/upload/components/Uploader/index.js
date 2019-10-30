import React, { useState, useMemo } from 'react';
import classnames from 'classnames';

import File from './File';
import Control from './Control';
import Settings from './Settings';
import Instructions from './Instructions';
import ErrorDisplay from './ErrorDisplay';

import useDrop from './hooks/useDrop';
import useComplexState from 'Common/hooks/useComplexState';

import defaultSettings from 'Upload/constants/defaultSettings';
import uploadFiles from 'Upload/utils/uploadFiles';
import removeFilesFactory from 'Upload/utils/removeFileFromQueue';

import { styles } from './styles.scss';

const Uplaoder = (props) => {
  const { error, updateError } = props;
  const [files, updateFiles] = useState([]);
  const removeFileFromQueue = useMemo(() => removeFilesFactory(updateFiles), [updateFiles]);
  const [settings, updateSettings] = useComplexState(defaultSettings);
  const [uploadInProgress, updateUploadInProgress] = useState(false);
  const [{ isOver, canDrop, cannotDrop }, drop] = useDrop({ files, updateFiles, uploadInProgress, updateError });

  return (
    <div className={classnames('uploader', styles)}>
      <div ref={drop} className={classnames('uploading-space', {
        isOver,
        canDrop: canDrop && !uploadInProgress,
        cannotDrop: cannotDrop || uploadInProgress,
      })}>
        <div className='washer' />
        <h1 className='page-title'>Upload</h1>
        <Settings state={settings} update={updateSettings} />
        <div className='controls'>
          <Control
            className='clear'
            effect={() => updateFiles([])}
            active={files.length > 0 && !uploadInProgress}
            icon='fa-backspace'
            label='Clear'
          />
          <Control
            className='upload'
            effect={() => uploadFiles({ files, updateFiles, updateError, updateUploadInProgress, settings })}
            active={files.filter(f => f.status !== 'complete').length > 0 && !uploadInProgress}
            icon='fa-upload'
            label='Upload'
          />
        </div>

        <Instructions
          error={error}
          active={files.length === 0}
          updateFiles={updateFiles}
          updateError={updateError}
        />

        <ErrorDisplay
          error={error}
          active={files.length > 0}
          updateFiles={updateFiles}
          updateError={updateError}
        />

        <div className={classnames('files-container', { single: files.length === 1, double: files.length === 2 })}>
          {files.map((f, idx) =>
            <File key={f.file.name} idx={idx} remove={removeFileFromQueue} {...f} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Uplaoder;
