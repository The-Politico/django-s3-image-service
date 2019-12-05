import { useState, useEffect } from 'react';
import includes from 'lodash/includes';

function useOpen(self) {
  const [open, updateOpen] = useState(false);
  useEffect(() => {
    const clickHandler = e => {
      if (open && !includes(e.path, self.current)) {
        updateOpen(false);
      }
    };

    const keyHandler = e => {
      if (open && e.key === 'Escape' && !includes(e.path, self.current)) {
        updateOpen(false);
      }
    };
    window.document.body.addEventListener('click', clickHandler);
    window.document.body.addEventListener('keydown', keyHandler);
    return () => {
      window.document.body.removeEventListener('click', clickHandler);
      window.document.body.removeEventListener('keydown', keyHandler);
    };
  }, [open]);

  return [open, updateOpen];
}

export default useOpen;
