import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';

class MongoProvider {
  mongoose;

  constructor() {
    this.mongoose = mongoose;
  }
  boot() {
    if (mongoConfig.uri) {
      this.mongoose.set('strictQuery', false);
      this.connect(mongoConfig.uri);
    }
  }
  connect(uri) {
    this.mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new MongoProvider();
