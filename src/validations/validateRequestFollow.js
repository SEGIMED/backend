export const validateRequestFollow = (body) => {
    const { userSend, userReceptor, status } = body;
    if (!userSend || !userReceptor) {
        return "No se recibio la informacion necesaria";
    }
    if (status && status !== 'pending') {
        return "El estado de la solicitud debe ser 'pending'";
    }
    return null;
}