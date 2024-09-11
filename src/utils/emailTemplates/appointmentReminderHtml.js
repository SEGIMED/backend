export const appointmentReminderHtml = (
  appointmentStart,
  physicianName,
  patient
) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Recordatorio de cita</title>
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Poppins", sans-serif;
        background-color: #fafafc;
        margin: 0;
        padding: 0;
        width: 600px;
      }
      .container {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        background-color: #fafafc;
      }
      .email-content {
        width: 90%;
        padding: 0 15px;
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .logo-container {
        padding: 20px 0;
      }
      .logo-container img {
        display: block;
        margin: 0 auto;
        width: 180px;
      }
      .content {
        padding: 45px 0 20px 0;
        text-align: center;
        color: #808080;
        font-size: 16px;
        width: 100%;
        margin: 0 auto;
      }
      .content h1 {
        font-size: 32px;
        color: #487ffa;
        font-weight: 500;
        margin-bottom: 30px;
      }
      .content h2 {
        font-size: 42px;
        color: #487ffa;
        font-weight: 500;
      }
      .content p {
        margin-bottom: 20px;
      }
      .button {
        text-align: center;
        color: #808080;
        font-size: 16px;
        width: 60%;
        margin: 0 auto;
      }
      .footer {
        padding: 0px 0px 40px 0;
        font-size: 14px;
        color: #808080;
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
      @media only screen and (max-width: 600px) {
        body {
          width: 90%;
        }
        .email-content {
          width: 100% !important;
          box-shadow: none;
        }
        .logo-container img {
          width: 150px;
        }
        .content {
          padding: 30px 10px 10px 10px;
          font-size: 18px;
          width: 100%;
          box-shadow: 1px 1px 1px 1px black;
        }
        .content h1 {
          font-size: 28px;
        }
        .button {
          padding-top: 10px;
          padding-bottom: 25px;
        }
        .footer {
          padding: 20px 0;
          font-size: 12px;
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" class="logo-container">
          <img
            src="https://res.cloudinary.com/dya1ekkd5/image/upload/v1721930541/oidzxqlccwuewq2daqoa.png"
            alt="Logo"
          />
        </td>
      </tr>
      <tr>
        <td align="center">
          <table
            class="email-content"
            cellpadding="0"
            cellspacing="0"
            width="100%"
          >
            <tr>
              <td class="content">
                <h1>Recordatorio de cita</h1>

                <p>
                  Hola ${ patient.name }, recordá que tenes una cita con el
                  médico ${ physicianName?.name || "" }
                  ${physicianName?.lastname || ""}
                </p>

                <p style="color: #487ffa">
                  Fecha: ${appointmentStart.toLocaleDateString()}
                </p>
                <p style="color: #487ffa">
                  Hora: ${appointmentStart.toLocaleTimeString()}
                </p>
              </td>
            </tr>

            <tr>
              <td class="footer">
                <p>
                  Si no solicitaste una cita médica, puedes ignorar este correo.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};