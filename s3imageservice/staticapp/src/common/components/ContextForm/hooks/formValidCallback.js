import { useEffect } from 'react';

function useFormValidCallback({ formIsValid, open, updateOpen }) {
  useEffect(() => {
    if (!formIsValid && !open) {
      updateOpen(true);
    }
  }, [formIsValid]);
}

export default useFormValidCallback;
