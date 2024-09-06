export const physicianOrderHtml = (link) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Ya tenés tu órden médica</title>
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
        text-align: center; /* Centra el texto dentro del botón */
        font-size: 16px;
        width: 120px; /* Ancho fijo de 120px */
        padding: 15px 0; /* Ajuste de padding para el ancho fijo */
        display: inline-block; /* Asegura que el margen funcione */
        text-decoration: none;
        border-radius: 10px;
        background: #487ffa;
        color: white;
        font-weight: 700;
        margin: 0 10px; /* Espacio de 20px entre botones (10px en cada lado) */
      }
      .footer {
        padding: 40px 0;
        font-size: 14px;
        color: #808080;
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
      .button-container {
        text-align: center; /* Asegura que los botones estén centrados en el contenedor */
        margin-bottom: 20px;
      }
      .button:visited {
        color: #ffffff; /* Mantiene el color del texto después de visitar el enlace */
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
        }
        .content h1 {
          font-size: 28px;
        }
        .button {
          padding: 10px 0; /* Ajusta el padding para el ancho fijo en móviles */
          width: 100%; /* Los botones ocuparán todo el ancho en móviles */
          max-width: 120px; /* Ancho máximo de 120px */
          margin: 0 0 10px 0; /* Ajusta el margen en móviles */
        }
        .button-container {
          flex-direction: column; /* Cambia la dirección a columna en móviles */
          gap: 10px; /* Ajusta el espacio entre botones en móviles */
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
                <h1>Ya tenés tu órden médica</h1>
                <p>Podes visualizarla o descargarla presionando debajo</p>
              </td>
            </tr>

            <tr>
              <td>
                <div class="button-container">
                  <a
                    href="${link}"
                    class="button"
                    style="
                      padding: 15px 20px;
                      border-radius: 10px;
                      text-decoration: none;
                      background: #487ffa;
                      color: white;
                      font-weight: 700;
                    "
                  >
                    Visualizar
                  </a>
                  <a
                    href="${link}"
                    download="orden.pdf"
                    class="button"
                    style="
                      padding: 15px 20px;
                      border-radius: 10px;
                      text-decoration: none;
                      background: #487ffa;
                      color: white;
                      font-weight: 700;
                    "
                  >
                    Descargar
                  </a>
                </div>
              </td>
            </tr>

            <tr>
              <td class="footer">
                <p>
                  Si no te redirecciona presionando algún botón, podes
                  visualizarla haciendo
                  <a href="https://app.segimed.com">click acá</a> o descargarla
                  presionando <a href="https://app.segimed.com">acá</a>.
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
