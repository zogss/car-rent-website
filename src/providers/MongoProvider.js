import mongoose from "mongoose";
import mongoConfig from "../config/mongo";

class MongoProvider {
  constructor() {
    this.mongoose = mongoose;
  }
  boot() {
    this.connect(mongoConfig.uri);
  }
  connect(uri) {
    this.mongoose.connect(uri, {
      useNewUrlParser: true,
      useunifiedTopology: true,
    });
  }
}

export default new MongoProvider();
