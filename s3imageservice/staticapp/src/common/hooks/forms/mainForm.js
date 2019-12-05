import { useCallback } from 'react';

export default function useMainForm({ updateError, mainForm, contextForm, contextValid, saveCallback }) {
  const onSubmit = useCallback(() => {
    if (contextValid) {
      saveCallback();
    }
  }, [contextValid, saveCallback]);

  const onError = useCallback(errors => {
    updateError('Something is wrong with one or more of your fields.');
    console.error('Form Errors', errors);
  }, []);

  return [onSubmit, onError];
}
