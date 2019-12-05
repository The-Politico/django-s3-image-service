import path from 'path';
import api from 'Common/utils/api';

export default ({ endpoint, data, onError, isNew, action, forwardTo }) => {
  if (isNew) {
    // New Page
    api[endpoint].POST({ data })
      .then(d => {
        window.location.href = path.join(forwardTo || '', d.id);
      })
      .catch(e => {
        onError(e.message);
      });
  } else {
    // Edit Page
    const method = action ? 'POST' : 'PUT';
    api[endpoint][method]({
      data,
      instance: data.id,
      action: action || undefined,
    })
      .then(() => {
        location.reload();
      })
      .catch(e => {
        onError(e.message);
      });
  }
};
