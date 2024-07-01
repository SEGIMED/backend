import { User, PhysicianAttendancePlace, PhysicianMedicalRegistry, PhysicianSpecialty, UserCurrentLocation } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { sequelize } from "../../databaseConfig.js";
import { loadImage } from "../../utils/cloudinary/cloudinary.js";

const updateFullPhysicianData = async (body) => {
    try {
        let ImagenAvatar = null;

        if (body.avatarDoc) {
            console.log(body.avatarDoc);
            const avatarr = JSON.parse(body.avatarDoc);
            ImagenAvatar = await loadImage(body.userId, avatarr);
        }


        // Upsert datos del usuario
        const updateUser = await User.update(
            {
                idNumber: body.idNumber,
                idType: body.idType,
                name: body.name,
                lastname: body.lastname,
                avatar: ImagenAvatar?.url,
                cellphone: body.cellphone,
                email: body.email,
                nationality: body.nationalityId,
            },
            {
                where: {
                    id: body.userId,
                },
            }
        );



        await PhysicianSpecialty.destroy({
            where: {
                physician: body.userId
            }
        });
        const specialtyPromises = body.medicalSpecialtyIds.map(async (specialtyId) => {
            const [newSpecialty, created] = await PhysicianSpecialty.findOrCreate({
                where: { physician: body.userId, medicalSpecialty: specialtyId },
                defaults: { medicalSpecialty: specialtyId }
            });
            return newSpecialty;
        });
        const specialties = await Promise.all(specialtyPromises);




        // Crear un nuevo registro médico provincial
        const [newMedicalRegistryProvincial, createdProvincial] = await PhysicianMedicalRegistry.findOrCreate({
            where: { physician: body.userId, registryType: 1, registryId: body.registryIdProvincial },
            defaults: { registryId: body.registryIdProvincial }
        });

        // Crear un nuevo registro médico nacional
        const [newMedicalRegistryNacional, createdNacional] = await PhysicianMedicalRegistry.findOrCreate({
            where: { physician: body.userId, registryType: 2, registryId: body.registryIdNacional },
            defaults: { registryId: body.registryIdNacional }
        });


        // Crear un nuevo lugar de atención del médico
        const newAttendancePlace = await PhysicianAttendancePlace.findOrCreate({
            where: {
                physician: body.userId,
                googleMapsLink: body.googleMapsLink,
                addressDetails: body.addressDetails,
                alias: body.alias
            },
            defaults: {
                physician: body.userId,
                googleMapsLink: body.googleMapsLink,
                addressDetails: body.addressDetails,
                alias: body.alias,
            }
        });


        //Cambia el país y la ciudad
        const user = await User.findByPk(body.userId)
        if (!user.currentLocation) {
            const currentLocation = await UserCurrentLocation.create({
                user: body.userId,
                city: body.city,
                country: body.country
            })
            user.currentLocation = currentLocation.id
            await user.save()
        } else {
            const currentLocation = await UserCurrentLocation.update(
                {
                    city: body.city,
                    country: body.country
                },
                { where: { user: body.userId } },)
        }
        return {
            user: user,
            city: user.currentLocation.city,
            country: user.currentLocation.country,
            specialty: specialties,
            registryProvincial: newMedicalRegistryProvincial,
            registryNacional: newMedicalRegistryNacional,
            attendancePlace: newAttendancePlace
        };
    } catch (error) {
        throw new SegimedAPIError(error, 500);
    }
};

export default updateFullPhysicianData;