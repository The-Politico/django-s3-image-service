import { useCallback } from 'react';
import { useDrop as dropHook } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import addFilesToQueue from 'Upload/utils/addFilesToQueue';

export default function useDrop({ updateFiles, updateError, uploadInProgress }) {
  const onDrop = useCallback(
    ({ files }) => addFilesToQueue({ additions: files, updateFiles, updateError }),
    [updateFiles, updateError]
  );

  return dropHook({
    accept: [NativeTypes.FILE],
    drop: (i, m) => {
      if (!uploadInProgress) {
        onDrop(i, m);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      cannotDrop: monitor.getItem() && !monitor.canDrop(),
    }),
  });
}
