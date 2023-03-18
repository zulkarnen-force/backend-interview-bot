
export default function serverConfig(app) {
    let config = {
        ip: '127.0.0.1',
        port: '3000'
    }
  function healthCheck() {
    // ERR_CONNECTING_TO_MONGO
    if (
      mongoose.connection.readyState === 0 ||
      mongoose.connection.readyState === 3
    ) {
      return Promise.reject(new Error('Mongoose has disconnected'));
    }
    // CONNECTING_TO_MONGO
    if (mongoose.connection.readyState === 2) {
      return Promise.reject(new Error('Mongoose is connecting'));
    }
    // CONNECTED_TO_MONGO
    return Promise.resolve();
  }

  function onSignal() {
    console.log('server is starting cleanup');
    return new Promise((resolve, reject) => {
      mongoose
        .disconnect(false)
        .then(() => {
          console.info('Mongoose has disconnected');
          resolve();
        })
        .catch(reject);
    });
  }

  function beforeShutdown() {
    return new Promise((resolve) => {
      setTimeout(resolve, 15000);
    });
  }

  function onShutdown() {
    console.log('cleanup finished, server is shutting down');
  }

  function startServer() {
    app.listen(config.port, config.ip, () => {
      console.log(
        'Express server listening on %d, in %s mode',
        config.port,
        app.get('env')
      );
    });
  }

  return {
    startServer
  };
}
