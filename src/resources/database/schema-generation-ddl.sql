create sequence role_id_seq
    as integer;

alter sequence role_id_seq owner to postgres;

create sequence id_type_id_seq
    as integer;

alter sequence id_type_id_seq owner to postgres;

create sequence measure_unit_id_seq;

alter sequence measure_unit_id_seq owner to postgres;

create sequence scheduling_appointment_id_seq
    as integer;

alter sequence scheduling_appointment_id_seq owner to postgres;

create sequence measure_type_id_seq;

alter sequence measure_type_id_seq owner to postgres;

create sequence scheduling_status_id_seq;

alter sequence scheduling_status_id_seq owner to postgres;

create sequence cat_medicine_id_seq;

alter sequence cat_medicine_id_seq owner to postgres;

create sequence cat_countries_id_seq;

alter sequence cat_countries_id_seq owner to postgres;

create sequence "Requests_id_seq"
    as integer;

alter sequence "Requests_id_seq" owner to postgres;

create sequence medical_procedure_precription_id_seq;

alter sequence medical_procedure_precription_id_seq owner to postgres;

create sequence cat_decease_id_seq;

alter sequence cat_decease_id_seq owner to postgres;

create sequence diagnostic_test_examination_prescription_id_seq;

alter sequence diagnostic_test_examination_prescription_id_seq owner to postgres;

create sequence cat_physical_subsystems_id_seq;

alter sequence cat_physical_subsystems_id_seq owner to postgres;

create sequence patient_diagnostic_diagnostic_notes_seq
    as integer;

alter sequence patient_diagnostic_diagnostic_notes_seq owner to postgres;

create sequence physician_review_id_seq;

alter sequence physician_review_id_seq owner to postgres;

create sequence patient_review_id_seq;

alter sequence patient_review_id_seq owner to postgres;

create sequence login_record_id_seq;

alter sequence login_record_id_seq owner to postgres;

create sequence cat_physician_expertice_level_id_seq;

alter sequence cat_physician_expertice_level_id_seq owner to postgres;

create sequence alarm_event_id_seq;

alter sequence alarm_event_id_seq owner to postgres;

create sequence cat_pain_areas_id_seq;

alter sequence cat_pain_areas_id_seq owner to postgres;

create sequence pain_map_id_seq;

alter sequence pain_map_id_seq owner to postgres;

create table cat_role
(
    id        integer default nextval('role_id_seq'::regclass) not null
        constraint role_pkey
            primary key,
    role_name varchar(20)
        constraint role_name_uk
            unique
);

alter table cat_role
    owner to postgres;

alter sequence role_id_seq owned by cat_role.id;

create table cat_id_type
(
    id   integer default nextval('id_type_id_seq'::regclass) not null
        constraint id_type_pkey
            primary key,
    name varchar(20)                                         not null
        constraint id_type_name_uk
            unique
);

alter table cat_id_type
    owner to postgres;

alter sequence id_type_id_seq owned by cat_id_type.id;

create table cat_measure_unit
(
    id   bigint default nextval('measure_unit_id_seq'::regclass) not null
        constraint cat_measure_unit_pk
            primary key,
    name varchar(255)                                            not null
        constraint cat_measure_unit_name_uk
            unique
);

alter table cat_measure_unit
    owner to postgres;

alter sequence measure_unit_id_seq owned by cat_measure_unit.id;

create table cat_anthropometric_measure_type
(
    id           bigint default nextval('measure_type_id_seq'::regclass) not null
        constraint cat_anthropometric_measure_type_pk
            primary key,
    name         varchar(255)                                            not null
        constraint name_uk
            unique,
    measure_unit bigint                                                  not null
        constraint measure_unit_fkey
            references cat_measure_unit
            on update cascade
);

alter table cat_anthropometric_measure_type
    owner to postgres;

alter sequence measure_type_id_seq owned by cat_anthropometric_measure_type.id;

create table cat_vital_sign_measure_type
(
    id           bigserial
        constraint cat_vital_sign_measure_type_pk
            primary key,
    name         varchar(255) not null
        constraint cat_vital_sign_measure_type_name_uk
            unique,
    measure_unit integer      not null
        references cat_measure_unit
            on update cascade
);

alter table cat_vital_sign_measure_type
    owner to postgres;

create table cat_medical_specialty
(
    id          bigserial
        constraint cat_medical_specialty_pk
            primary key,
    name        varchar(255) not null
        constraint "cat_medical_specialty_name-uk"
            unique,
    description text
);

alter table cat_medical_specialty
    owner to postgres;

create table cat_scheduling_status
(
    id          bigint default nextval('scheduling_status_id_seq'::regclass) not null
        constraint scheduling_status_pk
            primary key,
    name        varchar(255)                                                 not null
        constraint cat_scheduling_status_name_uk
            unique,
    description text
);

alter table cat_scheduling_status
    owner to postgres;

alter sequence scheduling_status_id_seq owned by cat_scheduling_status.id;

create table cat_diagnostic_test_type
(
    id          bigserial
        constraint cat_diagnostic_test_type_pk
            primary key,
    name        varchar(255) not null
        constraint cat_diagnostic_test_type_name_uk
            unique,
    description text
);

alter table cat_diagnostic_test_type
    owner to postgres;

create table cat_drug_presentation
(
    id   bigserial
        constraint cat_medicine_presentation_pk
            primary key,
    name varchar(255) not null
        constraint cat_medicine_presentation_name_uk
            unique
);

alter table cat_drug_presentation
    owner to postgres;

create table cat_drug
(
    id           bigint default nextval('cat_medicine_id_seq'::regclass) not null
        constraint cat_medicine_pk
            primary key,
    name         varchar                                                 not null
        constraint cat_medicine_name_uk
            unique,
    composition  text,
    presentation integer                                                 not null
        constraint cat_medicine_presentation_fkey
            references cat_drug_presentation
            on update cascade,
    default_dose varchar(255),
    laboratory   varchar(255)
);

alter table cat_drug
    owner to postgres;

alter sequence cat_medicine_id_seq owned by cat_drug.id;

create table cat_chat_status
(
    id          bigserial
        constraint cat_chat_status_pk
            primary key,
    status_name varchar(255) not null
        constraint cat_chat_status_name
            unique
);

alter table cat_chat_status
    owner to postgres;

create table chat
(
    id                 bigserial
        constraint chat_pk
            primary key,
    chat_name          varchar(255),
    creation_timestamp timestamp with time zone not null,
    status             integer                  not null
        references cat_chat_status
            on update cascade,
    closure_timestamp  timestamp with time zone
);

alter table chat
    owner to postgres;

create table cat_week_day
(
    id   serial
        constraint cat_week_day_pk
            primary key,
    name varchar(255) not null
        constraint cat_week_day_name_uk
            unique
);

alter table cat_week_day
    owner to postgres;

create table cat_appointment_modality
(
    id   serial
        constraint cat_appointment_modality_pk
            primary key,
    name varchar(255) not null
        constraint name_appointment_modality_uk
            unique
);

alter table cat_appointment_modality
    owner to postgres;

create table cat_country
(
    id          bigint default nextval('cat_countries_id_seq'::regclass) not null
        constraint cat_country_pk
            primary key,
    name        varchar(255)                                             not null
        constraint country_name_uk
            unique,
    nationality varchar(255)                                             not null
);

alter table cat_country
    owner to postgres;

alter sequence cat_countries_id_seq owned by cat_country.id;

create table cat_medical_registration_type
(
    id   bigserial
        constraint cat_medical_registration_type_pk
            primary key,
    name varchar(255) not null
        constraint registration_type_name_uk
            unique
);

alter table cat_medical_registration_type
    owner to postgres;

create table cat_province
(
    id      bigserial
        constraint cat_province_pk
            primary key,
    name    varchar not null,
    country integer not null
        constraint cat_country_fk
            references cat_country
);

alter table cat_province
    owner to postgres;

create table cat_city
(
    id       bigserial
        constraint cat_city_pk
            primary key,
    name     varchar(255) not null,
    province integer      not null
        constraint cat_province_fk
            references cat_province,
    constraint city_name_province_uk
        unique (name, province)
);

alter table cat_city
    owner to postgres;

create unique index city_name_uk
    on cat_city (name);

create table "user"
(
    id               serial
        primary key,
    id_number        varchar(255) not null
        unique,
    id_type          integer      not null
        references cat_id_type
            on update cascade,
    name             varchar(255) not null,
    lastname         text         not null,
    password         varchar(255) not null,
    role             integer      not null
        references cat_role
            on update cascade,
    verified         boolean,
    avatar           text,
    cellphone        varchar(255) not null
        unique,
    email            varchar(255) not null
        unique,
    nationality      integer
                                  references cat_country
                                      on update cascade on delete set null,
    last_login       timestamp,
    current_location integer
        constraint user_current_location_city_fk
            references cat_city,
    geolocation      numeric[]
);

alter table "user"
    owner to postgres;

create table request_patient_contact
(
    id                 integer default nextval('"Requests_id_seq"'::regclass) not null
        primary key,
    requesting_user_id integer                                                not null
        references "user",
    title              varchar(50)                                            not null,
    content            varchar(300)                                           not null,
    resolved           boolean                                                not null,
    created_at         timestamp with time zone                               not null
);

alter table request_patient_contact
    owner to postgres;

alter sequence "Requests_id_seq" owned by request_patient_contact.id;

create table anthropometric_details
(
    id             bigserial
        constraint anthropometric_details_pk
            primary key,
    patient        integer
                           references "user"
                               on update cascade on delete set null,
    measure        numeric not null,
    measure_date   timestamp with time zone,
    measure_source integer
                           references "user"
                               on update cascade on delete set null,
    measure_type   integer
                           references cat_anthropometric_measure_type
                               on update cascade on delete set null
);

alter table anthropometric_details
    owner to postgres;

create table vital_sign_details
(
    id                bigserial
        constraint vital_sign_details_pk
            primary key,
    patient           integer                  not null
        references "user"
            on update cascade,
    measure           numeric                  not null,
    measure_timestamp timestamp with time zone not null,
    measure_source    integer                  not null
        references "user"
            on update cascade on delete set null,
    measure_type      integer                  not null
        references cat_vital_sign_measure_type
            on update cascade
);

alter table vital_sign_details
    owner to postgres;

create table physician_specialty
(
    id                serial
        constraint physician_specialty_pk
            primary key,
    physician         integer not null
        references "user"
            on update cascade,
    medical_specialty integer not null
        references cat_medical_specialty
            on update cascade
);

alter table physician_specialty
    owner to postgres;

create table chat_message
(
    id                bigserial
        constraint chat_message_pk
            primary key,
    content           text                     not null,
    sender            integer                  not null
        references "user"
            on update cascade,
    recipient         integer                  not null
        references "user"
            on update cascade,
    message_timestamp timestamp with time zone not null,
    chat              integer                  not null
        references chat
            on update cascade
);

alter table chat_message
    owner to postgres;

create table chat_user
(
    id     bigserial
        constraint chat_user_pk
            primary key,
    chat   integer not null
        references chat
            on update cascade,
    "user" integer not null
        references "user"
            on update cascade
);

alter table chat_user
    owner to postgres;

create table one_time_password
(
    id                   bigserial
        constraint one_time_password_pk
            primary key,
    temporary_code       varchar(255)             not null,
    "user"               integer                  not null
        references "user"
            on update cascade,
    creation_timestamp   timestamp with time zone not null,
    redeemed_timestamp   timestamp with time zone,
    expiration_timestamp timestamp with time zone not null
);

alter table one_time_password
    owner to postgres;

create table physician_attendance_place
(
    id               bigserial
        constraint physician_attendance_place_pk
            primary key,
    physician        integer      not null
        references "user"
            on update cascade,
    google_maps_link text,
    address_details  text         not null,
    alias            varchar(255) not null
);

alter table physician_attendance_place
    owner to postgres;

create table physician_agenda_configuration
(
    id                     bigserial
        constraint physician_agenda_configuration_pk
            primary key,
    physician              integer not null
        references "user"
            on update cascade,
    start_date             date    not null,
    end_date               date    not null,
    include_holidays       boolean not null,
    week_day               integer not null
        references cat_week_day
            on update cascade,
    specialty              integer not null
        references cat_medical_specialty
            on update cascade,
    modality               integer not null
        references cat_appointment_modality
            on update cascade,
    attendance_place       integer not null
        references physician_attendance_place,
    reminder_patient_notes text,
    enablement_reminder    boolean not null,
    appointment_duration   time    not null
);

alter table physician_agenda_configuration
    owner to postgres;

create table physician_medical_registry
(
    id            serial
        constraint physician_medical_registry_pk
            primary key,
    physician     integer      not null
        references "user"
            on update cascade,
    registry_id   varchar(255) not null
        constraint registry_id_uk
            unique,
    registry_type integer      not null
        references cat_medical_registration_type
            on update cascade
);

alter table physician_medical_registry
    owner to postgres;

create table cat_medical_procedure_type
(
    id   bigserial
        constraint cat_medical_procedure_type_pk
            primary key,
    name varchar not null
);

alter table cat_medical_procedure_type
    owner to postgres;

create table cat_medical_procedure
(
    id             bigserial
        constraint cat_medical_procedure_pk
            primary key,
    procedure_type integer not null
        constraint procedure_type_fk
            references cat_medical_procedure_type,
    name           text    not null
        constraint cat_medical_procedure_name_uk
            unique,
    description    text,
    procedure_code varchar
);

alter table cat_medical_procedure
    owner to postgres;

create table cat_therapy
(
    id          bigserial
        constraint cat_therapy_pk
            primary key,
    name        varchar not null
        constraint cat_therapy_name_uk
            unique,
    description text
);

alter table cat_therapy
    owner to postgres;

create table cat_disease
(
    id           bigint default nextval('cat_decease_id_seq'::regclass) not null
        constraint cat_disease_pk
            primary key,
    name         varchar                                                not null,
    description  text,
    disease_code varchar
);

alter table cat_disease
    owner to postgres;

alter sequence cat_decease_id_seq owned by cat_disease.id;

create table cat_medical_background_type
(
    id   bigserial
        constraint cat_medical_background_type_pk
            primary key,
    name text not null
);

alter table cat_medical_background_type
    owner to postgres;

create table cat_genre
(
    id   bigserial
        constraint cat_genre_pk
            primary key,
    name varchar not null
);

alter table cat_genre
    owner to postgres;

create table cat_educational_level
(
    id   bigserial
        constraint cat_educational_level_pk
            primary key,
    name varchar
);

alter table cat_educational_level
    owner to postgres;

create table cat_civil_status
(
    id   bigserial
        constraint cat_civil_status_pk
            primary key,
    name varchar
);

alter table cat_civil_status
    owner to postgres;

create table cat_health_care_plan
(
    id   bigserial
        constraint cat_health_care_plan_pk
            primary key,
    name varchar
);

alter table cat_health_care_plan
    owner to postgres;

create table sociodemographic_details
(
    id                      bigserial
        constraint sociodemographic_details_pk
            primary key,
    patient                 integer
        constraint sociodemographic_details_patient_uk
            unique
                                    references "user"
                                        on update cascade on delete set null,
    birth_date              date    not null,
    genre                   integer not null
        constraint genre_fk
            references cat_genre,
    educational_level       integer not null
        constraint educational_level_fk
            references cat_educational_level,
    profession              varchar,
    civil_status            integer
        constraint civil_status_fk
            references cat_civil_status,
    address                 text,
    "health_care_plan "     integer not null
        constraint health_care_plan_fk
            references cat_health_care_plan,
    emergency_contact_phone varchar,
    date_of_death_report    date
);

alter table sociodemographic_details
    owner to postgres;

create table cat_physical_subsystem
(
    id   bigint default nextval('cat_physical_subsystems_id_seq'::regclass) not null
        constraint cat_physical_subsystem_pk
            primary key,
    name varchar                                                            not null
        constraint cat_physical_subsystems_uk
            unique
);

alter table cat_physical_subsystem
    owner to postgres;

alter sequence cat_physical_subsystems_id_seq owned by cat_physical_subsystem.id;

create table physician_review
(
    id           integer default nextval('physician_review_id_seq'::regclass) not null
        primary key,
    review_score numeric                                                      not null,
    physician_id integer                                                      not null
        constraint physician_review_physician_id_fk
            references "user"
            on update cascade,
    created_at   date                                                         not null,
    patient_id   integer                                                      not null
        constraint physician_review_patient_id_fk
            references "user"
            on update cascade,
    archived     boolean default false                                        not null,
    comments     text
);

alter table physician_review
    owner to postgres;

create table patient_review
(
    id           integer default nextval('patient_review_id_seq'::regclass) not null
        primary key,
    review_score integer[]                                                  not null,
    physician_id integer                                                    not null
        constraint patient_review_physician_id_fk
            references "user",
    patient_id   integer                                                    not null
        constraint patient_review_patient_id_fk
            references "user",
    created_at   date                                                       not null,
    archived     boolean default false                                      not null,
    comments     text
);

alter table patient_review
    owner to postgres;

alter sequence patient_review_id_seq owned by patient_review.id;

create table cat_health_centers
(
    id          integer not null,
    name        text    not null,
    geolocation numeric[],
    primary key (id, name)
);

alter table cat_health_centers
    owner to postgres;

create table login_record
(
    id      integer default nextval('login_record_id_seq'::regclass) not null
        primary key,
    user_id integer
        constraint login_record_user_id_fk
            references "user",
    record  timestamp
);

alter table login_record
    owner to postgres;

create table cat_physician_expertise_level
(
    name        varchar,
    description text,
    id          bigint default nextval('cat_physician_expertice_level_id_seq'::regclass) not null
        constraint cat_physician_expertise_level_pk
            primary key
);

alter table cat_physician_expertise_level
    owner to postgres;

alter sequence cat_physician_expertice_level_id_seq owned by cat_physician_expertise_level.id;

create table physician_details
(
    id                bigserial
        constraint physician_details_pk
            primary key,
    reviews_score     numeric,
    physician         integer not null
        constraint physician_details_physician_uk
            unique
        references "user"
            on update cascade,
    number_of_reviews integer,
    expertise_level   integer
        constraint physician_details_expertise_fk
            references cat_physician_expertise_level,
    favorite_patients numeric[]
);

alter table physician_details
    owner to postgres;

create table alarm_event
(
    id                         integer default nextval('alarm_event_id_seq'::regclass) not null
        primary key,
    pain_areas                 text[],
    pain_details               text,
    cardiac_frequency          integer,
    blood_pressure             integer[],
    respiratory_rate           integer,
    temperature                numeric,
    "sat_O2"                   integer,
    weight                     numeric,
    shortness_of_breath        text,
    mood                       text,
    type_of_pain               text,
    chest_pain_scale           integer,
    headache_pain_area         text,
    hedache_scale              integer,
    state_of_conscience        text,
    urine_level                text,
    sleep_quality              integer,
    eat                        integer,
    housing_conditions         text,
    fatigue                    integer,
    type_of_pain_or_difficulty integer
);

alter table alarm_event
    owner to postgres;

alter sequence alarm_event_id_seq owned by alarm_event.id;

create table cat_pain_areas
(
    id              integer default nextval('cat_pain_areas_id_seq'::regclass) not null
        primary key,
    name_on_library text,
    name            text
);

alter table cat_pain_areas
    owner to postgres;

alter sequence cat_pain_areas_id_seq owned by cat_pain_areas.id;

create table cat_lack_of_air_type
(
    id   integer not null
        primary key,
    name text    not null
);

alter table cat_lack_of_air_type
    owner to postgres;

create table cat_chest_pain_type
(
    id   integer not null
        primary key,
    name text    not null
);

alter table cat_chest_pain_type
    owner to postgres;

create table cat_type_of_consciousness_state
(
    id   integer not null
        primary key,
    name text    not null
);

alter table cat_type_of_consciousness_state
    owner to postgres;

create table cat_urine_level
(
    id   integer not null
        primary key,
    name text    not null
);

alter table cat_urine_level
    owner to postgres;

create table cat_housing_condition
(
    id   integer not null
        primary key,
    name text    not null
);

alter table cat_housing_condition
    owner to postgres;

create table type_of_pain_or_difficulty
(
    id               integer not null
        primary key,
    alarm_event      integer not null
        constraint alarm_event_id_fk
            references alarm_event
            on update cascade,
    orthopnea        boolean,
    leg_or_arm_edema boolean,
    chest_pain       boolean,
    headache         boolean
);

alter table type_of_pain_or_difficulty
    owner to postgres;

alter table alarm_event
    add foreign key (type_of_pain_or_difficulty) references type_of_pain_or_difficulty;

create table alarm_event_cat_pain_areas
(
    alarm_event_id   integer not null
        constraint alarm_event_id_pk
            references alarm_event
            on update cascade on delete cascade,
    cat_pain_area_id integer not null
        constraint cat_pain_areas_id_pk
            references cat_pain_areas
            on update cascade on delete cascade,
    primary key (alarm_event_id, cat_pain_area_id)
);

alter table alarm_event_cat_pain_areas
    owner to postgres;

create table cat_cardiovascular_risk
(
    id          bigserial
        constraint cat_cardiovascular_risk_pk
            primary key,
    name        varchar,
    description text
);

alter table cat_cardiovascular_risk
    owner to postgres;

create table cat_heart_failure_classification
(
    id          bigserial
        constraint cat_heart_failure_classification_pk
            primary key,
    name        varchar,
    description text
);

alter table cat_heart_failure_classification
    owner to postgres;

create table cat_pulmonary_arterial_hypertension_risk
(
    id          bigserial
        constraint cat_pulmonary_arterial_hypertension_risk_pk
            primary key,
    name        varchar,
    description text
);

alter table cat_pulmonary_arterial_hypertension_risk
    owner to postgres;

create table patient_cardiovascular_risk
(
    id                 bigserial
        constraint patient_cardiovascular_risk_pk
            primary key,
    patient            integer   not null
        constraint patient_fk
            references "user",
    register_timestamp timestamp not null,
    physician          integer   not null
        constraint physician_fk
            references "user",
    risk               integer   not null
        constraint cardiovascular_risk_fk
            references cat_cardiovascular_risk
);

alter table patient_cardiovascular_risk
    owner to postgres;

create table patient_heart_failure_classification
(
    id                           bigserial
        constraint heart_failure_classification_pk
            primary key,
    patient                      integer   not null
        constraint patient_fk
            references "user",
    heart_failure_classification integer   not null
        constraint heart_failure_classification_fk
            references cat_heart_failure_classification,
    physician                    integer   not null
        constraint physician_fk
            references "user",
    register_timestamp           timestamp not null
);

alter table patient_heart_failure_classification
    owner to postgres;

create table patient_pulmonary_hypertension_risk
(
    id                          bigserial
        constraint patient_pulmonary_hypertension_risk_pk
            primary key,
    patient                     integer   not null
        constraint patient_fk
            references "user",
    pulmonary_hypertension_risk integer   not null
        constraint pulmonary_hypertension_risk_fk
            references cat_pulmonary_arterial_hypertension_risk,
    physician                   integer   not null
        constraint physician_fk
            references "user",
    register_timestamp          timestamp not null
);

alter table patient_pulmonary_hypertension_risk
    owner to postgres;

create table cat_type_of_medical_consultation
(
    id   integer not null
        primary key,
    name text
);

alter table cat_type_of_medical_consultation
    owner to postgres;

create table appointment_scheduling
(
    id                           integer default nextval('scheduling_appointment_id_seq'::regclass) not null
        constraint scheduling_appointment_pkey
            primary key,
    patient                      integer                                                            not null
        references "user"
            on update cascade,
    physician                    integer                                                            not null
        references "user"
            on update cascade,
    medical_specialty            integer                                                            not null
        references cat_medical_specialty
            on update cascade,
    scheduled_start_timestamp    timestamp with time zone                                           not null,
    scheduled_end_timestamp      timestamp with time zone                                           not null,
    actual_end_timestamp         timestamp with time zone,
    actual_start_timestamp       timestamp with time zone,
    scheduling_status            integer                                                            not null
        references cat_scheduling_status
            on update cascade,
    type_of_medical_consultation integer                                                            not null
        constraint appointment_scheduling_cat_type_of_medical_cnsultation__fkey
            references cat_type_of_medical_consultation
            on update cascade,
    reason_for_consultation      text                                                               not null,
    health_center                text
);

alter table appointment_scheduling
    owner to postgres;

alter sequence scheduling_appointment_id_seq owned by appointment_scheduling.id;

create unique index scheduling_appointment_id_key
    on appointment_scheduling (id);

create table medical_event
(
    id                         bigserial
        constraint medical_event_pk
            primary key,
    physician_comments         text    not null,
    scheduling                 integer not null
        constraint medical_event_scheduling_uk
            unique
        references appointment_scheduling
            on update cascade,
    chief_complaint            varchar,
    history_of_present_illness text,
    review_of_systems          text,
    "treatment_plan "          text,
    pending_diagnostic_test    text
);

alter table medical_event
    owner to postgres;

create table diagnostic_test
(
    id                     bigserial
        constraint diagnostic_test_pk
            primary key,
    test_type              integer   not null
        references cat_diagnostic_test_type
            on update cascade,
    results_interpretation text,
    file_url               varchar(255),
    registered_timestamp   timestamp not null,
    patient                integer   not null
        references "user"
            on update cascade,
    scheduling             integer
                                     references appointment_scheduling
                                         on update cascade on delete set null,
    medical_event          integer
        constraint medical_event_fk
            references medical_event,
    practiced_timestamp    timestamp
);

alter table diagnostic_test
    owner to postgres;

create table drug_prescription
(
    id                     bigserial
        constraint drug_prescription_pk
            primary key,
    medical_event          integer   not null
        references medical_event
            on update cascade,
    patient                integer   not null
        references "user"
            on update cascade,
    prescribed_physician   integer   not null
        references "user"
            on update cascade on delete set null,
    prescription_timestamp timestamp not null,
    drug                   integer   not null
        constraint drug_fk
            references cat_drug,
    prescribed_dose        varchar   not null
);

alter table drug_prescription
    owner to postgres;

create table diagnostic_test_prescription
(
    id                     bigint default nextval('diagnostic_test_examination_prescription_id_seq'::regclass) not null
        constraint diagnostic_test_prescription_pk
            primary key,
    diagnostic_test        integer                                                                             not null
        constraint diagnostic_test_fkey
            references diagnostic_test
            on update cascade,
    prescribed_physician   integer                                                                             not null
        constraint prescribed_physician_fk
            references "user",
    patient                integer                                                                             not null
        constraint patient_fk
            references "user",
    prescription_timestamp timestamp                                                                           not null,
    medical_event          integer                                                                             not null
        constraint medical_event_fk
            references medical_event
);

alter table diagnostic_test_prescription
    owner to postgres;

alter sequence diagnostic_test_examination_prescription_id_seq owned by diagnostic_test_prescription.id;

create table medical_procedure_prescription
(
    id                     bigint default nextval('medical_procedure_precription_id_seq'::regclass) not null
        constraint medical_procedure_prescription_pk
            primary key,
    medical_procedure      integer                                                                  not null
        constraint medical_procedure_fk
            references cat_medical_procedure,
    medical_event          integer                                                                  not null
        constraint medical_event_fk
            references medical_event,
    patient                integer                                                                  not null
        constraint patient_fk
            references "user",
    prescribed_physician   integer                                                                  not null
        constraint prescribed_physician_fk
            references "user",
    prescription_timestamp timestamp                                                                not null
);

alter table medical_procedure_prescription
    owner to postgres;

alter sequence medical_procedure_precription_id_seq owned by medical_procedure_prescription.id;

create table therapy_prescription
(
    id                   bigserial
        constraint therapy_prescription_pk
            primary key,
    patient              integer   not null
        constraint patient_fk
            references "user",
    prescribed_physician integer   not null
        constraint prescribed_physician_fk
            references "user",
    medical_event        integer   not null
        constraint medical_event_fk
            references medical_event,
    timestamp            timestamp not null,
    quantity             integer   not null,
    therapy              integer   not null
        constraint therapy_fk
            references cat_therapy
);

alter table therapy_prescription
    owner to postgres;

create table medical_indications
(
    id                   bigserial
        constraint medical_indications_pk
            primary key,
    description          text      not null,
    patient              integer   not null
        constraint patient_fk
            references "user",
    prescribed_physician integer   not null
        constraint prescribed_physician_fk
            references "user",
    medical_event        integer   not null
        constraint medical_event_fk
            references medical_event,
    timestamp            timestamp not null
);

alter table medical_indications
    owner to postgres;

create table patient_diagnostic
(
    id               bigserial
        constraint patient_diagnostic_pk
            primary key,
    patient          integer   not null
        constraint patient_fk
            references "user",
    diagnosed_by     integer   not null
        constraint diagnosed_by_fk
            references "user",
    medical_event    integer   not null
        constraint medical_event_fk
            references medical_event,
    timestamp        timestamp not null,
    disease          integer   not null
        constraint disease_fk
            references cat_disease,
    diagnostic_notes text
);

alter table patient_diagnostic
    owner to postgres;

alter sequence patient_diagnostic_diagnostic_notes_seq owned by patient_diagnostic.diagnostic_notes;

create table patient_medical_background
(
    id              bigserial
        constraint patient_medical_background_pk
            primary key,
    disease         integer not null
        constraint disease_fk
            references cat_disease,
    diagnostic      integer
        constraint diagnostic_fk
            references patient_diagnostic,
    background_type integer not null
        constraint background_type_fk
            references cat_medical_background_type,
    patient         integer not null
        constraint patient_fk
            references "user",
    description     text
);

alter table patient_medical_background
    owner to postgres;

create table medical_referral
(
    id            bigserial
        constraint medical_referral_pk
            primary key,
    specialty     integer   not null
        constraint specialty_fk
            references cat_medical_specialty,
    patient       integer   not null
        constraint patient_fk
            references "user",
    description   text,
    prescribed_by integer   not null
        constraint prescribed_by_fk
            references "user",
    medical_event integer   not null
        constraint medical_event_fk
            references medical_event,
    timestamp     timestamp not null
);

alter table medical_referral
    owner to postgres;

create table patient_physical_examination
(
    id                 bigserial
        constraint patient_physical_examination_pk
            primary key,
    physical_subsystem integer not null
        constraint physical_subsystem_fk
            references cat_physical_subsystem,
    description        text    not null,
    medical_event      integer not null
        constraint patient_physical_examination_fk
            references medical_event
);

alter table patient_physical_examination
    owner to postgres;

create table cat_pain_duration
(
    id   bigserial
        constraint cat_pain_duration_pk
            primary key,
    name varchar not null
        constraint pain_duration_name_uk
            unique
);

alter table cat_pain_duration
    owner to postgres;

create table cat_pain_scale
(
    id   bigserial
        constraint cat_pain_scale_pk
            primary key,
    name integer not null
        constraint pain_scale_name_uk
            unique
);

alter table cat_pain_scale
    owner to postgres;

create table cat_pain_type
(
    id   bigserial
        constraint cat_pain_type_pk
            primary key,
    name varchar not null
        constraint pain_type_name_uk
            unique
);

alter table cat_pain_type
    owner to postgres;

create table cat_pain_frequency
(
    id   bigserial
        constraint cat_pain_frequency_pk
            primary key,
    name varchar not null
        constraint pain_frequency_name_uk
            unique
);

alter table cat_pain_frequency
    owner to postgres;

create table patient_pain_map
(
    id                   bigint default nextval('pain_map_id_seq'::regclass) not null
        constraint patient_pain_map_pk
            primary key,
    pain_duration        integer                                             not null
        constraint pain_duration_fk
            references cat_pain_duration,
    pain_scale           integer                                             not null
        constraint pain_scale_fk
            references cat_pain_scale,
    pain_type            integer                                             not null
        constraint pain_type_fk
            references cat_pain_type,
    pain_area            integer                                             not null
        constraint pain_area_fk
            references cat_pain_areas,
    pain_frequency       integer                                             not null
        constraint pain_frequency_fk
            references cat_pain_frequency,
    pain_notes           text,
    is_taking_analgesic  boolean                                             not null,
    does_analgesic_works boolean,
    is_worst_pain_ever   boolean                                             not null,
    pain_owner           integer                                             not null
        constraint pain_owner_fk
            references "user",
    pain_recorder        integer                                             not null
        constraint pain_recorder_fk
            references "user",
    timestamp            timestamp                                           not null,
    scheduling           integer
        constraint scheduling_fk
            references appointment_scheduling,
    medical_event        integer
        constraint medical_event_fk
            references medical_event
);

alter table patient_pain_map
    owner to postgres;

alter sequence pain_map_id_seq owned by patient_pain_map.id;

