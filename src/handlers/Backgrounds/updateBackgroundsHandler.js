import {Backgrounds} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateBackgroundsHandler = async (body) => {
    const {
        id,
        surgicalBackground,
        pathologicBackground,
        nonPathologicBackground,
        familyBackground,
        pediatricBackground,
        pharmacologicalBackground,
        vaccinationBackground,
        allergicBackground
    } = body

    try {
        const updatedBackground = await Backgrounds.update(
            {
                surgicalBackground,
                pathologicBackground,
                nonPathologicBackground,
                familyBackground,
                pediatricBackground,
                pharmacologicalBackground,
                vaccinationBackground,
                allergicBackground,
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedBackground[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateBackgroundsHandler;