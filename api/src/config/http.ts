export default {
  timeout: process.env.HTTP_TIMEOUT || 5000,
  maxRedirects: process.env.HTTP_MAX_REDIRECTS || 5,
};
