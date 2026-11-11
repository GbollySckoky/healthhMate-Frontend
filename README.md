# Healthmate Digital Healthcare & Telemedicine Platform

**Connecting patients, healthcare professionals, and hospitals through a unified digital healthcare experience.**

Healthmate is a full-stack telemedicine platform designed to simplify access to healthcare by bringing appointment management, secure communication, virtual consultations, payments, and personal health tracking into one connected ecosystem.

The platform provides dedicated interfaces for patients, doctors, and hospital administrators, enabling each user group to manage healthcare interactions through role-specific workflows.

## Overview

Accessing healthcare can involve fragmented processes, from discovering medical professionals and arranging consultations to managing payments, communicating with doctors, and monitoring personal health information.

Healthmate explores how modern web technologies can bring these interactions together into a more accessible and coordinated digital experience.

The platform consists of three interconnected applications:

- **Patient Application:** Enables patients to discover healthcare providers, book consultations, communicate with doctors, make payments, and track health metrics.
- **Doctor Portal:** Supports healthcare professionals in managing consultations, patient interactions, prescriptions, and clinical notes.
- **Hospital Administration Dashboard:** Provides administrative workflows for managing doctors, appointments, and hospital-related operations.

## Core Features

### Patient Experience

**Doctor & Hospital Discovery**
- Browse available hospitals and healthcare professionals.
- Explore doctor profiles and consultation information.
- Discover highly rated doctors.

**Appointment & Consultation Management**
- Book medical consultations.
- Review upcoming and previous appointments.
- Track appointment status and consultation progress.

**Payments**
- Integrated payment processing using Paystack.
- Payment workflows connected to consultation bookings.

**Real-Time Communication**
- Patient-doctor messaging.
- Audio and video consultation functionality powered by Agora.
- Communication workflows connected to consultations.

**Personal Health Tracking**
- Blood pressure monitoring.
- Blood glucose tracking.
- Mood tracking.
- Sleep logging.

**Account Management**
- User authentication and email verification.
- Profile management.
- Notifications and support features.

### Doctor Experience

- Doctor authentication and role-based access.
- Appointment and consultation management.
- Patient communication workflows.
- Prescription management.
- Consultation notes.
- Video and audio consultation integration.

### Hospital Administration

- Hospital administration workflows.
- Doctor and hospital management.
- Appointment oversight.
- Role-specific administrative access.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Node.js, NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Real-Time Communication | Agora |
| Payments | Paystack |
| Email Services | Resend |
| Media Storage | Cloudinary |
| Background Processing | BullMQ |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Database Infrastructure | Supabase PostgreSQL |

## System Architecture

Healthmate follows a modular, API-driven architecture that separates client applications, backend business logic, data persistence, and external service integrations.

```text
                  HEALTHMATE PLATFORM
                          |
          +---------------+---------------+
          |               |               |
     Patient App     Doctor Portal    Hospital Admin
          |               |               |
          +---------------+---------------+
                          |
                    REST API Layer
                     NestJS Backend
                          |
          +---------------+---------------+
          |               |               |
    Authentication    Appointments    Communication
          |               |               |
          +---------------+---------------+
                          |
                  Prisma ORM
                          |
                  PostgreSQL
                          |
       +------------------+------------------+
       |          |           |              |
    Paystack    Agora       Resend       Cloudinary
    Payments    Calls       Emails       Media
```

## Engineering & Implementation

### Authentication and Authorization

Implemented authentication workflows with role-based authorization to support different levels of access across patient, doctor, and administrative interfaces.

### Backend Architecture

Developed a modular backend using NestJS, with dedicated modules for authentication, appointments, users, doctors, hospitals, payments, health tracking, and support.

### Database Design

Used PostgreSQL and Prisma to model application data and relationships, including users, doctors, hospitals, appointments, prescriptions, and consultation notes.

### Third-Party Integrations

Integrated external services to support key application capabilities:

- **Paystack:** Consultation payment processing.
- **Agora:** Real-time audio and video communication.
- **Resend:** Transactional email notifications.
- **Cloudinary:** Media storage and image uploads.

### Healthcare Workflow Integration

Designed interconnected workflows spanning appointment booking, payment processing, communication, consultation management, and health tracking.

## 🌐 Live Applications

Healthmate consists of three interconnected applications, each designed for a specific role within the healthcare ecosystem.

### 🧑‍💻 Patient Application

Enables patients to discover doctors and hospitals, book consultations, make payments, communicate with healthcare professionals, attend virtual consultations, and track personal health metrics.

🔗 **[Launch Patient Application](https://healthmaate.netlify.app/)**

### 👨‍⚕️ Doctor Portal

Provides healthcare professionals with a dedicated interface for managing appointments, communicating with patients, conducting virtual consultations, issuing prescriptions, and documenting consultation notes.

🔗 **[Launch Doctor Portal](https://doctor.healthmatepatient.com/)**

### 🏥 Hospital Administration Dashboard

Enables hospital administrators to manage doctors, oversee appointments, and coordinate hospital-related operations through a centralized administrative interface.

🔗 **[Launch Admin Dashboard](https://admin.healthmatepatient.com/)**

---

> **Note:** Healthmate is an evolving demonstration project. Please avoid submitting real patient records or sensitive medical information.

## Project Background

Healthmate was inspired by the challenges people experience when accessing healthcare services in Nigeria.

The goal was to explore how software could reduce friction across healthcare interactions while providing a connected experience for patients, doctors, and hospitals.

Read the development story:

[Why I Built Healthmate](https://gbolahancoker.substack.com/p/why-i-built-healthmate)

## Project Status

**Active Development Portfolio / Demonstration Project**

Healthmate continues to evolve as new features, integrations, and improvements are developed.

Some functionality may be incomplete or subject to change.

## Author

**Gbolahan Coker**

Full-Stack Software Developer specializing in React, Next.js, TypeScript, Node.js, NestJS, and PostgreSQL.

Focused on building scalable web applications, integrated business workflows, and intuitive digital experiences.

---

**Healthmate Making digital healthcare more connected and accessible.**
