import { useState, useCallback } from 'react';

export default function useContextForm({ updateError, contextForm, callback }) {
  const [valid, updateValid] = useState(true);

  const onSubmit = useCallback(() => {
    updateValid(true);
    callback();
  }, [callback]);

  const onError = useCallback(errors => {
    updateError('Something is wrong with one or more of your fields.');
    updateValid(false);
    console.error('Form Errors', errors);
  }, [updateError, updateValid]);

  return [valid, onSubmit, onError];
}
