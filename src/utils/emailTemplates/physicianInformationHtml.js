export const physicianInformationHtml = ({ onboarding, user, link }) => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=2.0, shrink-to-fit=no"
    />
    <title>Nuevo médico registrado</title>
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
        width: 100%;
        max-width: 600px;
      }

      .container {
        width: 100%;
        padding: 20px 0;
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
        text-align: center;
      }

      .logo-container img {
        display: block;
        margin: 0 auto;
        width: 180px;
      }

      .content {
        padding: 45px 30px 20px 30px;
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
        text-align: center;
      }

      .content h2 {
        font-size: 24px;
        color: #487ffa;
        font-weight: 500;
        margin-bottom: 20px;
      }

      .content p {
        margin-bottom: 15px;
      }

      .info-section {
        background-color: #f0f4ff;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 30px;
      }

      .list-item {
        margin-bottom: 10px;
        padding-left: 20px;
        position: relative;
      }

      .list-item::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #487ffa;
      }

      .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
        color: white;
      }

      .button {
        display: inline-block;
        padding: 15px 20px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 700;
        text-align: center;
        min-width: 200px;
      }

      .verify-button {
        background: #487ffa;
        color: white;
      }

      .whatsapp-button {
        background: #70c247;
        color: white;
      }

      .footer {
        padding: 40px 0;
        font-size: 14px;
        color: #808080;
        width: 90%;
        margin: 0 auto;
        text-align: center;
      }
      a {
        color: white;
        text-decoration: none;
      }

      @media only screen and (max-width: 600px) {
        body {
          width: 100%;
        }
        .email-content {
          width: 100% !important;
          box-shadow: none;
        }
        .logo-container img {
          width: 150px;
        }
        .content {
          padding: 30px 20px 10px 20px;
          font-size: 16px;
        }
        .content h1 {
          font-size: 28px;
        }
        .button-container {
          flex-direction: column;
          align-items: center;
        }
        .button {
          width: 100%;
          max-width: 250px;
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
    <div class="container">
      <div class="email-content">
        <div class="logo-container">
          <img
            src="https://res.cloudinary.com/dya1ekkd5/image/upload/v1721930541/oidzxqlccwuewq2daqoa.png"
            alt="Logo"
          />
        </div>
        <div class="content">
          <h1>Un nuevo médico se registró</h1>
          <div class="info-section">
            <h2>Información del médico</h2>
            <p>
              <strong>Nombre completo:</strong> ${user?.name} ${user?.lastname}
            </p>
            <p><strong>DNI:</strong> ${user?.idNumber}</p>
            <p>
              <strong>Teléfono:</strong> ${user.areaCode} ${user?.cellphone}
            </p>
            <p><strong>Correo:</strong> ${user?.email}</p>
            <p>
              <strong>Matrícula nacional:</strong> ${
                onboarding?.medicalRegistryNacional?.registryId
              }
            </p>
            <p>
              <strong>Matrícula provincial:</strong> ${
                onboarding?.medicalRegistryProvincial?.registryId
              }
            </p>
          </div>
          <div class="info-section">
            <h2>Especialidades</h2>
            ${onboarding?.newSpecialty
              .map(
                (e) => `
            <div class="list-item">${e.specialty.name}</div>
            `
              )
              .join("")}
          </div>
          <div class="info-section">
            <h2>Lugares de atención</h2>
            ${onboarding?.allAttendentPlace
              .map(
                (e) => `
            <div class="list-item">${e.center.name}</div>
            `
              )
              .join("")}
          </div>
<table width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td align="left">
      <a href="https://wa.me/${user.areaCode}${user?.cellphone}" 
         style="background-color: #70c247; color: white; padding: 15px 20px; border-radius: 10px; text-decoration: none; font-weight: 700; text-align: center;"
         class="button whatsapp-button">
        Contactar por WhatsApp
      </a>
    </td>
    <td align="right">
      <a href="${link}" 
         style="background-color: #487ffa; color: white; padding: 15px 20px; border-radius: 10px; text-decoration: none; font-weight: 700; text-align: center;"
         class="button verify-button">
        Verificar cuenta
      </a>
    </td>
  </tr>
</table>

        <div class="footer">
          <p>
            Si no solicitaste la información, puedes ignorar este correo.
            Solo las personas con acceso a tu email pueden verificar la cuenta.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
