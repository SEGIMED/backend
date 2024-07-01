import patchAlarmEventHandler from '../../handlers/alarmEvent/patchAlarmEventHandler.js'

const patchAlarmEventController = async (req,res)=>{
    try {
        const{id}=req.params
        const update= req.body
        const updatedAlarmEvent = await patchAlarmEventHandler(id,update)
        return res.status(200).json(updatedAlarmEvent)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default patchAlarmEventController