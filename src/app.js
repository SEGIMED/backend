import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import swaggerOptions from "./swaggerOptions.js";
import swaggerUI from "swagger-ui-express";
import { validateJWT } from "./utils/JWTInterceptor.js";
import contextService from "request-context";

import {
  patientRouter,
  getPatientsRouter,
  physicianRouter,
  getPatientsFilterRouter,
  userRouter,
  requestUserContactRouter,
  catalogsRouter,
  medicalEventRouter,
  schedulingRouter,
  vitalSignsRouter,
  anthropometricDetailsRouter,
  medicalBackgroundsRouter,
  diagnosticTestRouter,
  statisticsRouter,
  drugPrescriptionRouter,
  procedurePrescriptionRouter,
  medicalReferralRouter,
  therapyPrescriptionRouter,
  medicalIndicationsRouter,
  sociodemographicDetailsRouter,
  alarmRouter,
  preConsultationRouter,
  backgroundsRouter,
  createScheduleRouter,
} from "./routes/routes.js";

const corsOptions = {
  origin: "*", // Asegúrate de que este origen coincida con el de tu aplicación cliente
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Encabezados permitidos
  credentials: true, // Si estás utilizando cookies o autenticación basada en sesiones
  optionsSuccessStatus: 200, // Para navegadores más antiguos que no soportan 204
};

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(corsOptions));
app.use(json());
app.use(contextService.middleware("request"));
app.use(validateJWT);

//*Settings
app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//*Routes

app.use("/api", patientRouter);
app.use("/api", getPatientsRouter);
app.use("/api", physicianRouter);
app.use("/api", getPatientsFilterRouter);
app.use("/api", userRouter);
app.use("/api", catalogsRouter);
app.use("/api", requestUserContactRouter);
app.use("/api", schedulingRouter);
app.use("/api", medicalEventRouter);
app.use("/api", vitalSignsRouter);
app.use("/api", anthropometricDetailsRouter);
app.use("/api", medicalBackgroundsRouter);
app.use("/api", statisticsRouter);
app.use("/api", diagnosticTestRouter);
app.use("/api", drugPrescriptionRouter);
app.use("/api", procedurePrescriptionRouter);
app.use("/api", medicalReferralRouter);
app.use("/api", therapyPrescriptionRouter);
app.use("/api", medicalIndicationsRouter);
app.use("/api", sociodemographicDetailsRouter);
app.use("/api", alarmRouter);
app.use("/api", preConsultationRouter);
app.use("/api", backgroundsRouter);
app.use("/api", createScheduleRouter);

app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerOptions));

export default app;
