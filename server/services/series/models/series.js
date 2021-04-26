const { getDatabase } = require("../config/mongodb.js");
const { ObjectId } = require("mongodb");
const collectionSeries = "Series";

class Series {
  static find() {
    return getDatabase().collection(collectionSeries).find().toArray();
  }

  static create(newSeries) {
    return getDatabase().collection(collectionSeries).insertOne(newSeries);
  }

  static findById(id) {
    return getDatabase()
      .collection(collectionSeries)
      .findOne({ _id: ObjectId(id) });
  }

  static findByIdAndDelete(id) {
    return getDatabase()
      .collection(collectionSeries)
      .deleteOne({ _id: ObjectId(id) });
  }

  static findByIdAndUpdate(id, updatedSeries) {
    return getDatabase()
      .collection(collectionSeries)
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: updatedSeries,
        }
      );
  }
}

module.exports = Series;
