import Notify from "../models/Notify";
import User from "../models/user";
export async function createNotify({content,targetId,senderId}){
    try {
        if(!targetId || !content || !senderId) throw new Error('Faltan argumentos requeridos.');
        const newObj = {
            content: null,
            target: null,
            sender: null,
            state: false,
            date : new Date()
        }
        
        const findTarget = await User.findOne({userId: targetId});
        const findSender = await User.findOne({userId: senderId});

        if(!findTarget || !findSender) throw new Error('No se encontraron los usuarios requeridos.');

        newObj.target = findTarget._id;
        newObj.sender = findSender._id;
        newObj.content = content;

        const newNotify = await Notify.create(newObj);

        if(newNotify) return newNotify;

        throw new Error('Error en crear la notificación.');
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);        
    }


}