export default function connection(mongoose, config, options) {
  // console.log('connection mongo url', process.env.MONGO_URL);
    function connectToMongo() {
      mongoose
        .connect(process.env.MONGO_URL, options)
        .then(
          (res) => {console.log(config.mongo.uri)},
          (err) => {
            console.info('Mongodb error', err);
          }
        )
        .catch((err) => {
          console.log('ERROR:', err);
        });
    }
  
    mongoose.connection.on('connected', () => {
      console.info('Connected to MongoDB!');
    });
  
    mongoose.connection.on('reconnected', () => {
      console.info('MongoDB reconnected!');
    });
  
    mongoose.connection.on('error', (error) => {
      console.error(`Error in MongoDb connection: ${error}`);
      mongoose.disconnect();
    });
  
    // mongoose.connection.on('disconnected', () => {
    //   console.error(
    //     `MongoDB disconnected! Reconnecting in ${
    //       options.reconnectInterval / 1000
    //     }s...`
    //   );
    //   setTimeout(() => connectToMongo(), options.reconnectInterval);
    // });
  
    return {
      connectToMongo
    };
  }
  