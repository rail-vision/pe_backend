const mapToSQLType = (type) => {

  switch (type) {

    case "text":
      return "TEXT";

    case "number":
      return "INTEGER";

    case "date":
      return "DATE";

    case "boolean":
      return "BOOLEAN";

    default:
      return "TEXT";

  }

};

module.exports = {
  mapToSQLType
};