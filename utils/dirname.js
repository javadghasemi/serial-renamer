import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export const __dirname = (url) => {
  return dirname(fileURLToPath(url));
}