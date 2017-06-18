const ENV = process.env.MODE ? process.env.MODE : 'prod';

const config = {
  database: 'video_platform',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `video_platform_${ENV}.sqlite`,
    define: {
      underscore: false,
    },
  },
  jwt: {
    secret: 'JwT53cR3t@..',
    session: { session: false },
  },
};

export default config;
