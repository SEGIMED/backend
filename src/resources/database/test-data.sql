INSERT INTO public.cat_measure_unit (id, name) VALUES (4, 'Kg');
INSERT INTO public.cat_measure_unit (id, name) VALUES (5, 'Cm');
INSERT INTO public.cat_measure_unit (id, name) VALUES (7, 'mmHg');
INSERT INTO public.cat_measure_unit (id, name) VALUES (8, '%');
INSERT INTO public.cat_measure_unit (id, name) VALUES (10, '°C');
INSERT INTO public.cat_measure_unit (id, name) VALUES (11, 'Kg/m²');
INSERT INTO public.cat_measure_unit (id, name) VALUES (9, 'rpm');
INSERT INTO public.cat_measure_unit (id, name) VALUES (6, 'bpm');
INSERT INTO public.cat_measure_unit (id, name) VALUES (12, 'I');
INSERT INTO public.cat_measure_unit (id, name) VALUES (13, 'II');
INSERT INTO public.cat_measure_unit (id, name) VALUES (14, 'III');
INSERT INTO public.cat_measure_unit (id, name) VALUES (15, 'IV');


INSERT INTO public.cat_anthropometric_measure_type (id, name, measure_unit) VALUES (4, 'Talla', 5);
INSERT INTO public.cat_anthropometric_measure_type (id, name, measure_unit) VALUES (5, 'Peso', 4);
INSERT INTO public.cat_anthropometric_measure_type (id, name, measure_unit) VALUES (6, 'Perímetro Abdominal', 5);
INSERT INTO public.cat_anthropometric_measure_type (id, name, measure_unit) VALUES (7, 'IMC', 11);

INSERT INTO public.cat_appointment_modality (id, name) VALUES (1, 'Presencial');
INSERT INTO public.cat_appointment_modality (id, name) VALUES (2, 'Virtual');

INSERT INTO public.cat_country (id, name, nationality) VALUES (1, 'Colombia', 'Colombiana');
INSERT INTO public.cat_country (id, name, nationality) VALUES (2, 'Argentina', 'Argentina');


INSERT INTO public.cat_province (id, name, country) VALUES (2, 'Provincia test', 2);


INSERT INTO public.cat_city (id, name, province) VALUES (758, 'Buenos Aires', 2);


INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (1, 'Hipertensión pulmonar primaria', null, 'I27.0 ');
INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (2, 'Otra hipertensión pulmonar secundaria', null, 'I27.2');
INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (3, 'Hipertensión pulmonar, no especificada', null, 'I27.20 ');
INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (4, 'Hipertensión arterial pulmonar secundaria', null, 'I27.21');
INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (5, 'Hipertensión pulmonar debida a enfermedad cardíaca izquierda', null, 'I27.22');
INSERT INTO public.cat_disease (id, name, description, disease_code) VALUES (6, 'Hipertensión Arterial', null, 'I10X');


INSERT INTO public.cat_id_type (id, name) VALUES (1, 'DNI');
INSERT INTO public.cat_id_type (id, name) VALUES (2, 'Pasaporte');


INSERT INTO public.cat_medical_background_type (id, name) VALUES (1, 'Patológicos');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (2, 'No Patológicos');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (3, 'Familiares');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (4, 'Pediátricos ');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (5, 'Alérgicos');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (6, 'Vacunación');
INSERT INTO public.cat_medical_background_type (id, name) VALUES (7, 'Farmacológicos');


INSERT INTO public.cat_medical_registration_type (id, name) VALUES (1, 'Provincial');
INSERT INTO public.cat_medical_registration_type (id, name) VALUES (2, 'Nacional');


INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (1, 'Cardiología', null);
INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (2, 'Medicina Interna', null);
INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (3, 'Medicina Familiar', null);
INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (4, 'Neumología', null);
INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (5, 'Cirugía de Tórax', null);
INSERT INTO public.cat_medical_specialty (id, name, description) VALUES (6, 'Cirugía Cardiovascular', null);


INSERT INTO public.cat_role (id, role_name) VALUES (1, 'Admin');
INSERT INTO public.cat_role (id, role_name) VALUES (2, 'Médico');
INSERT INTO public.cat_role (id, role_name) VALUES (3, 'Paciente');


INSERT INTO public.cat_scheduling_status (id, name, description) VALUES (1, 'Agendada', null);
INSERT INTO public.cat_scheduling_status (id, name, description) VALUES (2, 'Atendida', null);
INSERT INTO public.cat_scheduling_status (id, name, description) VALUES (3, 'Cancelada', null);
INSERT INTO public.cat_scheduling_status (id, name, description) VALUES (4, 'No atendida', null);


INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (1, 'Temperatura', 10);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (2, 'Presión Arterial Sistólica', 7);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (3, 'Presión Arterial Diastólica', 7);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (4, 'Presión Arterial Media', 7);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (5, 'Frecuencia Respiratoria', 9);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (6, 'Saturación de Oxígeno', 8);
INSERT INTO public.cat_vital_sign_measure_type (id, name, measure_unit) VALUES (7, 'Frecuencia Cardiaca', 6);


INSERT INTO public.cat_week_day (id, name) VALUES (1, 'Lunes');
INSERT INTO public.cat_week_day (id, name) VALUES (2, 'Martes');
INSERT INTO public.cat_week_day (id, name) VALUES (3, 'Miércoles');
INSERT INTO public.cat_week_day (id, name) VALUES (4, 'Jueves');
INSERT INTO public.cat_week_day (id, name) VALUES (5, 'Viernes');
INSERT INTO public.cat_week_day (id, name) VALUES (6, 'Sábado');
INSERT INTO public.cat_week_day (id, name) VALUES (7, 'Domingo');


INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (3, '12345', 1, 'PepitoMedico1', 'Perez', 'password', 2, true, null, null, '30017254', 'pepito@mail.com', null, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (4, '123456', 1, 'PepitoMedico2', 'Perez', 'password', 2, true, null, null, '30017255', 'pepito2@mail.com', null, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (5, '6789', 1, 'SaraPaciente', 'Ramos', 'password2', 3, true, null, null, '30012523', 'sara@mail.com', null, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (6, '678910', 1, 'MariaPaciente', 'Ramos', 'password2', 3, true, null, null, '8', 'maria@mail.com', null, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (8, '678911', 1, 'Maria2Paciente', 'Ramos', 'password2', 3, true, null, null, '9', 'maria2@mail.com', null, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (36, '123654', 1, 'Manu', 'pruebaApellido', '$2b$12$64uhslfaSRR81M3aNF6nYOZ/cUqETHVC8ndD72A1od8fnapgpCEE6', 1, null, null, null, '3108592', 'manudee@gmail.com', 1, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (37, '12365657987', 1, 'Emanuel', 'Dominguez', '$2b$12$RWu5D8eMlWho8zwthjp46ORbTYzuPOgBa.4Msvl9i0WOk8AELmxxW', 1, null, null, null, '3115592695', 'manudeev7@gmail.com', 1, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (41, '1214722022', 1, 'Gaby', 'Sándigo', '$2b$12$ox94WlbsoVxumzjPMvsgoe4JPxExKUG0vSJ3zCNruFpyLg9ELD.cy', 1, null, null, null, '3108498426', 'mgabrielasm0119@gmail.com', 1, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (50, '32356776', 1, 'Esteban', 'Aleart', '$2b$12$5xxfRbDWnPxsnL22sfZn9ORkbthIY5lZy2QL026Jh6pRTl.Z1rrwO', 2, null, null, null, '123413241234', 'esteban.aleart@gmail.com', 2, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (57, '789', 1, 'Leo', 'Guerrero', '$2b$12$1uq6av9IdwOgWcxT.l26IOIVqA..PgsGGCj.L8umXVCe6HSZgD8Ya', 3, null, null, null, '789', 'emailleo@gmail.com', 2, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (58, '101112', 1, 'Kevin', 'UI UX', '$2b$12$OC.gfQ8ba82GS2RF8ekIH.mPANEYTaIEg15OMCg0rwp/rWI5Emgyi', 3, null, null, null, '101112', 'emailkevin@gmail.com', 2, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (59, '131415', 1, 'Andre', 'APP', '$2b$12$eOgYrPON46yBsLIA0Vp5iO13w9.1yNmxy3PfWc1lzqGEIidWfX2qu', 3, null, null, null, '131415', 'emailandre@gmail.com', 2, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (52, '555222', 1, 'Leo', 'Guerrero', '$2b$12$G8XS/lkj0DLYcRb/7W22HuBVBriiV3qUGTi09AyZnIN4BLSB.6irm', 3, true, null, null, '555222', 'leoguerrero@gmail.com', 1, null);
INSERT INTO public."user" (id, id_number, id_type, name, lastname, password, role, verified, geolocation, avatar, cellphone, email, nationality, last_login) VALUES (51, '12365498798796514', 1, 'Nataly', 'Revelo', '$2b$12$3TavhkhkAJ7PjcZNyyC0t.5QadiMzESIiJTTb68H46pXoIfVBrUIC', 1, true, null, 'happy', '65463216984', 'natalyrevelo@unicauca.edu.co', 1, null);


INSERT INTO public.appointment_scheduling (id, patient, physician, medical_specialty, scheduled_start_timestamp, scheduled_end_timestamp, actual_end_timestamp, actual_start_timestamp, scheduling_status) VALUES (1, 5, 3, 1, '2024-05-07 17:58:53.904000 +00:00', '2024-05-07 18:20:01.254000 +00:00', null, null, 1);
INSERT INTO public.appointment_scheduling (id, patient, physician, medical_specialty, scheduled_start_timestamp, scheduled_end_timestamp, actual_end_timestamp, actual_start_timestamp, scheduling_status) VALUES (2, 5, 3, 1, '2024-05-03 17:58:53.904000 +00:00', '2024-05-03 18:20:01.254000 +00:00', null, null, 2);
INSERT INTO public.appointment_scheduling (id, patient, physician, medical_specialty, scheduled_start_timestamp, scheduled_end_timestamp, actual_end_timestamp, actual_start_timestamp, scheduling_status) VALUES (3, 6, 4, 3, '2024-05-08 18:00:26.422000 +00:00', '2024-05-08 18:20:38.392000 +00:00', null, null, 1);
INSERT INTO public.appointment_scheduling (id, patient, physician, medical_specialty, scheduled_start_timestamp, scheduled_end_timestamp, actual_end_timestamp, actual_start_timestamp, scheduling_status) VALUES (4, 8, 4, 3, '2024-05-09 18:00:30.509000 +00:00', '2024-05-09 18:20:43.904000 +00:00', null, null, 3);
INSERT INTO public.appointment_scheduling (id, patient, physician, medical_specialty, scheduled_start_timestamp, scheduled_end_timestamp, actual_end_timestamp, actual_start_timestamp, scheduling_status) VALUES (5, 51, 3, 2, '2024-05-16 04:18:08.000000 +00:00', '2024-05-16 04:20:48.617000 +00:00', '2024-05-16 04:18:08.000000 +00:00', '2024-05-16 04:20:48.617000 +00:00', 1);


INSERT INTO public.medical_event (id, physician_comments, scheduling) VALUES (1, 'Paciente Estable ', 1);
INSERT INTO public.medical_event (id, physician_comments, scheduling) VALUES (2, 'Se solicita Ecocardiograma ', 3);


INSERT INTO public.one_time_password (id, temporary_code, "user", creation_timestamp, redeemed_timestamp, expiration_timestamp) VALUES (37, '$2b$12$h9l8XMmwqROedKDMkRLl8eJKH/FuRzzGINAQO9dU3RhR9j0apydkK', 51, '2024-05-16 04:18:08.000000 +00:00', '2024-05-16 04:20:48.617000 +00:00', '2024-05-16 04:48:08.000000 +00:00');
INSERT INTO public.one_time_password (id, temporary_code, "user", creation_timestamp, redeemed_timestamp, expiration_timestamp) VALUES (38, '$2b$12$FJmblEO9KR4KG740qYGyp.5A2WT6HjnR6LyJMok7EJAaFiX6T7vd2', 52, '2024-05-21 23:46:45.000000 +00:00', null, '2024-05-22 00:16:45.000000 +00:00');


INSERT INTO public.patient_medical_background (id, disease, diagnostic, background_type, patient, description) VALUES (1, 6, null, 1, 8, null);
INSERT INTO public.patient_medical_background (id, disease, diagnostic, background_type, patient, description) VALUES (2, 6, null, 3, 8, 'Madre con HTA');


INSERT INTO public.physician_attendance_place (id, physician, google_maps_link, address_details, alias) VALUES (1, 3, 'http://este-link.com', 'mi casa', 'Hospital 13');


INSERT INTO public.physician_details (id, reviews_score, physician, number_of_reviews, expertise_level) VALUES (2, null, 4, null, null);
INSERT INTO public.physician_details (id, reviews_score, physician, number_of_reviews, expertise_level) VALUES (1, 4, 3, null, null);


INSERT INTO public.physician_medical_registry (id, physician, registry_id, registry_type) VALUES (2, 4, 'RM456231PJ', 1);
INSERT INTO public.physician_medical_registry (id, physician, registry_id, registry_type) VALUES (1, 3, 'RM456231PK', 2);


INSERT INTO public.sociodemographic_details (id, patient, birth_date, genre, educational_level, profession, civil_status, address, "health_care_plan ") VALUES (2, 8, '1980-02-02', 1, 1, 1, 1, 'cr 33 # 8-28', 1);


INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (1, 8, 36.5, '2024-05-21 23:15:39.339000 +00:00', 4, 1);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (2, 8, 126, '2024-05-21 23:15:39.339000 +00:00', 4, 2);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (3, 8, 88, '2024-05-21 23:15:39.339000 +00:00', 4, 3);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (4, 8, 20, '2024-05-21 23:15:39.339000 +00:00', 4, 5);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (5, 8, 94, '2024-05-21 23:15:39.339000 +00:00', 4, 6);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (6, 8, 88, '2024-05-21 23:15:39.339000 +00:00', 4, 7);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (7, 8, 140, '2024-02-21 23:15:39.339000 +00:00', 4, 2);
INSERT INTO public.vital_sign_details (id, patient, measure, measure_timestamp, measure_source, measure_type) VALUES (8, 8, 80, '2024-02-21 23:15:39.339000 +00:00', 5, 3);


INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (1, 8, 70, '2024-05-21 22:26:59.045000 +00:00', 4, 5);
INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (2, 8, 165, '2024-05-21 22:26:59.045000 +00:00', 4, 4);
INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (3, 8, 98, '2024-05-21 22:26:59.045000 +00:00', 4, 6);
INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (4, 8, 25.7, '2024-05-21 22:26:59.045000 +00:00', 4, 7);
INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (5, 8, 60, '2023-05-21 22:32:19.987000 +00:00', 4, 5);
INSERT INTO public.anthropometric_details (id, patient, measure, measure_date, measure_source, measure_type) VALUES (6, 8, 65, '2024-01-21 22:32:44.501000 +00:00', 4, 5);


