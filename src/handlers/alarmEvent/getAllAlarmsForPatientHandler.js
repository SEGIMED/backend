import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import { User, CatPulmonaryHypertensionGroup, PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";

const getAllAlarmsForPatientHandler = async (patientId) => {
    try {
        if (patientId) {
            const allAlarmsForPatient = await AlarmEvent.findAll({
                where: {
                    patient: patientId
                }
            });

            return allAlarmsForPatient.map(alarm => ({
                id: alarm.id,
                patient: alarm.patient,
                alarmDescription: alarm.alarmDescription,
                questionsPriority: mapquestionsPriority(alarm.questionsPriority)
            }));
        } else {
            const allAlarmsForPatient = await AlarmEvent.findAll({
                include: [
                    {
                        model: User,
                        as: 'AlarmForPatient',
                        attributes: { exclude: ['password'] },
                        include: [{
                            model: PatientPulmonaryHypertensionGroup,
                            as: 'userHpGroups',
                            include: {
                                model: CatPulmonaryHypertensionGroup,
                                as: 'catHpGroup',
                                attributes: ['name']
                            }
                        },],
                    }]
            });


            // return allAlarmsForPatient
            return allAlarmsForPatient.map(alarm => {

                return {
                    id: alarm.id,
                    patient: alarm.patient,
                    alarmDescription: alarm.alarmDescription,
                    solved: alarm.solved,
                    fecha: new Date(alarm.createdAt).toLocaleDateString(),
                    hora: new Date(alarm.createdAt).toLocaleTimeString(),
                    name: alarm.AlarmForPatient ? alarm.AlarmForPatient.name : null,
                    lastname: alarm.AlarmForPatient ? alarm.AlarmForPatient.lastname : null,
                    HTP: alarm.AlarmForPatient?.userHpGroups,
                    questionsPriority: mapquestionsPriority(alarm.questionsPriority)
                };
            });
        }
    } catch (error) {
        throw new Error("Ha habido un error al cargar las alarmas: " + error.message);
    }
};

export default getAllAlarmsForPatientHandler;