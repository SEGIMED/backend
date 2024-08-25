import { LoginRecord } from "../../databaseConfig.js";
import moment from "moment-timezone";
import { Op, Sequelize } from "sequelize";

const getAllLoginRecords = async () => {
  try {
    const from = moment()
      .subtract(7, "days")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss"); // inicio del día hace 7 días
    const to = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"); // final del día actual

    const loginRecords = await LoginRecord.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("record")), "date"],
        "userId",
      ],
      where: {
        record: {
          [Op.between]: [from, to],
        },
      },
      group: [Sequelize.fn("DATE", Sequelize.col("record")), "userId"],
      order: [
        [Sequelize.fn("DATE", Sequelize.col("record")), "ASC"],
        ["userId", "ASC"],
      ],
    });

    //agrupo los resultados por FECHA y USUARIO contando los registros unicos
    const groupedResults = {};

    loginRecords.forEach((record) => {
      const date = record.get("date");
      if (!groupedResults[date]) {
        groupedResults[date] = new Set();
      }
      groupedResults[date].add(record.get("userId"));
    });

    const result = Object.keys(groupedResults).reduce((acc, date, index) => {
      acc[date] = groupedResults[date].size;
      return acc;
    }, {});

    return result;
  } catch (error) {
    throw new Error("Error loading Login Records: " + error.message);
  }
};

export default getAllLoginRecords;
