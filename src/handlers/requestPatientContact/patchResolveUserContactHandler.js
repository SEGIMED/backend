import models from "../../databaseConfig.js";

const patchResolveUserContactHandler = async (id) => {
  try {
    if(!id) throw new Error ('The request id is required')
    const update = await models.RequestPatientContact.update(
      {
        resolved: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return ('Patient contact request has been resolved')
  } catch (error) {
    throw new Error("Error resolving the request: " + error.message);
  }
};

export default patchResolveUserContactHandler;
