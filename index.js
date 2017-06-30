import app from './app';

app.listen(app.get('port'), () => {
  console.log(`App runnning on port ${app.get('port')}`);
});

export default app;
