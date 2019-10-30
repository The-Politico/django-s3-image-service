import path from 'path';
import assign from 'lodash/assign';
import keys from 'lodash/keys';
import { capfirst } from 'journalize';
import MODELS from 'Common/constants/models';
import getContentByName from 'Common/utils/getContentByName';

import csrftoken from 'Common/constants/csrf';

export const API_TOKEN = getContentByName('API_TOKEN');
export const ROOT = getContentByName('API_ROOT');

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
  },
};

export const GET = { method: 'GET' };
export const POST = { method: 'POST' };
export const PUT = { method: 'PUT' };
export const PATCH = { method: 'PATCH' };
export const DELETE = { method: 'DELETE' };

export const METHODS = [GET, POST, PUT, PATCH, DELETE];

export const fetchCMS = (model = '', method, data, instance = '', action = '', params = '') => {
  let urlSuffix = '';
  [ROOT, model, instance, action].forEach(e => {
    if (e) {
      urlSuffix = path.join(urlSuffix, e);
    }
  });

  const url = `//${window.location.host}${urlSuffix}/${params}`;

  let requestData = assign(
    {},
    method,
    HEADERS
  );

  if (data) {
    requestData.body = JSON.stringify(data);
  }

  return fetch(url, requestData);
};

const api = {};

MODELS.forEach(mod => {
  if (!(mod in api)) {
    api[mod] = {};
  }

  METHODS.forEach(met => {
    api[mod][met.method] = (config = {}) =>
      fetchCMS(mod, met, config.data, config.instance, config.action, config.params)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          } else {
            return resp.text()
              .then(text => {
                let e;
                try {
                  const parsedError = JSON.parse(text);
                  console.error('Error Report:');
                  console.table(parsedError);
                  console.log(parsedError);

                  const firstError = parsedError[keys(parsedError)[0]][0];
                  if (firstError) {
                    e = new Error(capfirst(`${firstError}`));
                  }
                } catch (err) {}

                if (!e) {
                  e = new Error(`${resp.statusText}. See console for more.`);
                }
                e.errorText = text;
                throw e;
              });
          }
        });
  });
});

export default api;
