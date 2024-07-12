import 'dotenv/config';
import cron from 'node-cron'
import initialWebSocket from './realtime_server/websocket.js';
import app from './app.js';
import scheduleReminderEmails from './utils/emailReminders/appointmentReminder.js'
import http from 'http';

//create server
const server = http.createServer(app);

const port = app.get("port");

server.listen(port, () => {
 console.log(`Server listening on port ${port}`);
});


//initial websocket server
initialWebSocket(server);
//Reminder appointment
// cron.schedule('0 18 * * *', () => {
//     console.log('running a task every minute');
//     scheduleReminderEmails();
//   });

export {
    app, server
}