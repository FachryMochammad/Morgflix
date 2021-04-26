const { Series } = require("./Series");

const resolvers = {
  Query: {
    allSeries: () => Series.getAll(),
    series: (_, args) => Series.getOne(args),
  },
  Mutation: {
    addSeries: (_, args) => Series.add(args),
    deleteSeries: (_, args) => Series.delete(args),
    editSeries: (_, args) => Series.edit(args),
  },
};

module.exports = {
  resolvers,
};
