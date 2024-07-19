import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import { User, CatPulmonaryHypertensionGroup, PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";

const getHighestPriority = (priorities) => {
    if (priorities.includes("Alta")) return "Alta";
    if (priorities.includes("Media")) return "Media";
    return "Baja";
};

const countPriorities = (alarms) => {
    const priorityCounts = {
        Alta: 0,
        Media: 0,
        Baja: 0,
        Activas: 0,
        Inactivas: 0
    };

    alarms.forEach((alarm) => {
        // Count for priorities
        if (!alarm.solved) {
            const highestPriority = getHighestPriority(
                alarm.questionsPriority.map((p) => p.split(": ")[1])
            );
            priorityCounts[highestPriority] += 1;
            priorityCounts.Activas += 1;
        } else {
            priorityCounts.Inactivas += 1;
        }
    });

    return priorityCounts;
};

const formatAlarms = (alarms) => {
    return alarms.map((alarm) => ({
        ...alarm,
        highestPriority: getHighestPriority(
            alarm.questionsPriority.map((p) => p.split(": ")[1])
        ),
    }));
};

const getAllAlarmsForPatientHandler = async (patientId) => {
    try {
        if (patientId) {
            const allAlarmsForPatient = await AlarmEvent.findAll({
                where: {
                    patient: patientId
                }
            });

            const formattedAlarms = formatAlarms(allAlarmsForPatient.map(alarm => ({
                id: alarm.id,
                patient: alarm.patient,
                alarmDescription: alarm.alarmDescription,
                questionsPriority: mapquestionsPriority(alarm.questionsPriority)
            })));

            const priorityCounts = countPriorities(formattedAlarms);

            return { alarms: formattedAlarms, priorityCounts };
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
                        }],
                    }]
            });

            const formattedAlarms = allAlarmsForPatient.map(alarm => {
                const HTPArray = alarm.AlarmForPatient?.userHpGroups || [];
                const HTPObject = HTPArray.reduce((acc, curr) => {
                    acc["data"] = curr;
                    return acc;
                }, {});

                return {
                    id: alarm.id,
                    patient: alarm.patient,
                    alarmDescription: alarm.alarmDescription,
                    solved: alarm.solved,
                    fecha: new Date(alarm.createdAt).toLocaleDateString(),
                    hora: new Date(alarm.createdAt).toLocaleTimeString(),
                    name: alarm.AlarmForPatient ? alarm.AlarmForPatient.name : null,
                    lastname: alarm.AlarmForPatient ? alarm.AlarmForPatient.lastname : null,
                    HTP: HTPObject,
                    questionsPriority: mapquestionsPriority(alarm.questionsPriority)
                };
            });

            const formattedAlarmsWithPriority = formatAlarms(formattedAlarms);
            const priorityCounts = countPriorities(formattedAlarmsWithPriority);

            return { alarms: formattedAlarmsWithPriority, priorityCounts };
        }
    } catch (error) {
        throw new Error("Ha habido un error al cargar las alarmas: " + error.message);
    }
};

export default getAllAlarmsForPatientHandler;


