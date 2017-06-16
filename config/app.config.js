const config = {
  database: 'video_platform',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `video_platform_${process.env.MODE}.sqlite`,
    define: {
      underscore: false,
    },
  },
};

export default config;
