import http from './http';
import cache from './cache';
import api from './api';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  http,
  cache,
  api,
});
