import { useState, useCallback, useEffect } from 'react';
import api from 'Common/utils/api';

export default function useSession({ sessionTimeout, data, user, active }) {
  const [sessionId] = useState(data ? data.editing_session : null);
  const [sessionToken] = useState(`${user.name}|${Math.random().toString(36).substr(2)}`);
  const [sessionLock, updateSessionLock] = useState(false);
  const [sessionLockText, updateSessionLockText] = useState(null);

  const sessionWebhookFactory = useCallback((webhook, lockOnError = false, callback = () => {}) => () => {
    const payload = { id: sessionToken };
    api['editing-session'].POST({
      data: payload,
      instance: sessionId,
      action: webhook,
    }).then(d => {
      callback(d);
    })
      .catch(err => {
        if (lockOnError) {
          updateSessionLock(true);
          updateSessionLockText(JSON.parse(err.errorText));
        }
      });
  }, []);

  const newKey = useCallback(
    sessionWebhookFactory('request_new_session', true),
    []
  );

  const close = useCallback(
    sessionWebhookFactory('request_close_session'),
    []
  );

  const ping = useCallback(
    sessionWebhookFactory('ping', true),
    []
  );

  const open = useCallback(
    sessionWebhookFactory('force_open', true, () => { updateSessionLock(false); }),
    []
  );

  // Request new session on start / Request close session on exit
  useEffect(() => {
    if (active) {
      newKey();
      window.addEventListener('beforeunload', close);
      return () => { window.removeEventListenter('beforeunload', close); };
    }
  }, []);

  // Pinging interval
  useEffect(() => {
    if (active) {
      let intervalTime = parseInt(sessionTimeout);
      if (isNaN(intervalTime)) {
        intervalTime = 5000;
      } else {
        intervalTime = intervalTime * 1000 / 2;
      }

      const interval = setInterval(ping, intervalTime);
      return () => { clearInterval(interval); };
    }
  }, []);

  return {
    locked: sessionLock,
    status: sessionLockText,
    webhook: {
      new: newKey,
      close,
      ping,
      open,
    },
  };
}
