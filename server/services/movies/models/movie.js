const { getDatabase } = require("../config/mongodb.js");
const { ObjectId } = require("mongodb");
const collectionMovie = "Movies";

class Movie {
  static find() {
    return getDatabase().collection(collectionMovie).find().toArray();
  }

  static create(newMovie) {
    return getDatabase().collection(collectionMovie).insertOne(newMovie);
  }

  static findById(id) {
    return getDatabase()
      .collection(collectionMovie)
      .findOne({ _id: ObjectId(id) });
  }

  static findByIdAndDelete(id) {
    return getDatabase()
      .collection(collectionMovie)
      .deleteOne({ _id: ObjectId(id) });
  }

  static findByIdAndUpdate(id, updatedMovie) {
    return getDatabase()
      .collection(collectionMovie)
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: updatedMovie,
        }
      );
  }
}

module.exports = Movie;
