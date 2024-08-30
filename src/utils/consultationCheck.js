import cron from "node-cron";
import moment from "moment-timezone";
import models from "../databaseConfig.js";
import { Op } from "sequelize";

cron.schedule("0 0 * * *", async () => {
  try {
    const now = moment().startOf("day");

    const outdatedConsultations = await models.AppointmentScheduling.findAll({
      where: {
        scheduling_status: 1,
        scheduled_start_timestamp: {
          [Op.lt]: now.toDate(),
        },
      },
    });

    await Promise.all(
      outdatedConsultations.map(async (consultation) => {
        consultation.scheduling_status = 4;
        await consultation.save();
      })
    );

    console.log(
      `Actualizado el estado de ${outdatedConsultations.length} consultas a 'No atendidas'.`
    );
  } catch (error) {
    console.error("Error al actualizar consultas vencidas:", error);
  }
});
