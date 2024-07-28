import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  SENDER_MAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(MAIL_CLIENT_ID, MAIL_CLIENT_SECRET);

oauth2Client.setCredentials({
  refresh_token: MAIL_REFRESH_TOKEN,
});
const encodeBase64URL = (str) => {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
const encodeMIMEHeader = (text) => {
  return `=?UTF-8?B?${Buffer.from(text, "utf8").toString("base64")}?=`;
};
export const sendMail = async (destination, mailBody, mailSubject) => {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const encodedSubject = encodeMIMEHeader(mailSubject);

  const message = [
    `To: ${destination}`,
    `From: ${SENDER_MAIL_ADDRESS}`,
    "Content-Type: text/html; charset=utf-8",
    `Subject: ${encodedSubject}`,
    "",
    mailBody,
  ].join("\n");

  const encodedMessage = encodeBase64URL(message);
  try {
    const response = await gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: encodedMessage,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
