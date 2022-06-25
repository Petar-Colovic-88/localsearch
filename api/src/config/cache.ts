export default {
  ttl: process.env.CACHE_TTL || 5,
  max: process.env.CACHE_MAX || 10,
};
