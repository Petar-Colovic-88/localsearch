import axiosInstance from 'axios';
import getConfig from 'next/config';

// ----------------------------------------------------------------------

export const axios = axiosInstance.create({
  baseURL: getConfig()?.publicRuntimeConfig?.api?.url || '',
});

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);
