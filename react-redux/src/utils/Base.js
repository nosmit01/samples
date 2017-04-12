const urls = {
  development: '.../pizza', // purposely hidden
};

export const baseUrl = () => (
  urls[process.env.NODE_ENV]
);

