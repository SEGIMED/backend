import {google} from 'googleapis'

const OAuth2 = google.auth.OAuth2

const {
    MAIL_CLIENT_ID,
    MAIL_CLIENT_SECRET,
    MAIL_REFRESH_TOKEN,
    SENDER_MAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAIL_CLIENT_ID,
    MAIL_CLIENT_SECRET,

)

oauth2Client.setCredentials({
    refresh_token : MAIL_REFRESH_TOKEN
})


export const sendMail = async (destination, mailBody, mailSubject) => {

    const gmail = google.gmail({version: 'v1', auth: oauth2Client});
    const message = [
        `To: ${destination}`,
        `From: ${SENDER_MAIL_ADDRESS}`,
        "Content-Type: text/html; charset=utf-8",
        `Subject: ${mailSubject}`,
        "",
        mailBody].join('\n');

    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '-')
        .replace(/=+$/, '');

    try{
        const response = await gmail.users.messages.send({
            userId: "me",
            resource: {
                raw:encodedMessage
            }
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }

}