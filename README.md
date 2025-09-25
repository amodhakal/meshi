# [Meshi](https://www.meshi.place)

## 1. Introduction: Vision & Mission

**Vision:** To build an intelligent platform that empowers 3D artists by providing not just a portfolio, but a powerful tool for technical analysis and improvement.

---

## 2. The Strategic Tech Stack

| Component                 | Technology                                          | Rationale                                                                    |
| :------------------------ | :-------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Backend API**           | **Java 21+ / Spring Boot 3+**                       | Enterprise standard, signals maturity, robust ecosystem.                     |
| **Frontend**              | **React / Next.js**                                 | Best-in-class for performant, SEO-friendly web applications.                 |
| **Database**              | **PostgreSQL**                                      | Powerful, reliable, and industry-standard relational database.               |
| **File Storage**          | **AWS S3**                                          | Scalable, durable object storage for raw and processed assets.               |
| **Deployment**            | **Docker / AWS Elastic Beanstalk**                  | Proves modern DevOps skills without the full complexity of Kubernetes.       |
| **Messaging**             | **AWS SNS (Simple Notification Service)**           | Decouples services in the processing pipeline, enables event-driven design.  |
| **Processing**            | **Polyglot AWS Lambda (Python, Java, C#, Go, ...)** | Demonstrates broad language proficiency and serverless architecture mastery. |
| **AI / Machine Learning** | **Google AI Platform (Gemini API)**                 | Provides the Generative AI engine for the core technical analysis feature.   |
| **Local Dev**             | **Docker Compose**                                  | For a clean, reproducible, one-command local environment.                    |

---

## 3. Features: The Focused MVP

### Core Features (The Foundation)

These are the non-negotiable elements that make the platform functional.

- **Secure User Authentication:** Users can create an account, log in with a JWT-based session, and manage their profile.
- **3D Model Uploader:** A robust, browser-based upload system using pre-signed S3 URLs to handle large files efficiently without overloading the backend server.
- **Automated Processing Pipeline:** A fully automated, event-driven backend system (using S3 triggers, SNS, and polyglot Lambdas) that converts uploaded models to web-optimized formats (`.glb`) and generates 2D thumbnails (`.webp`).
- **High-Fidelity 3D Viewer:** A performant, interactive 3D viewer built with Three.js and `react-three-fiber` on the model detail pages, featuring intuitive camera controls and professional lighting.
- **Public Artist Portfolios:** Clean, shareable profile pages (`meshi.place/[username]`) that display a grid of the artist's work.
- **Secure Contact System:** An intermediated contact form that allows viewers to message artists without exposing their private email addresses, using a transactional email service (like AWS SES) to relay messages.

### The Differentiator (The "Checkmate" AI Feature)

This is the single, high-impact feature that makes `meshi.place` unique and technically profound, powered by the Google Gemini API.

- **AI-Powered Technical Analysis & Critique:**
  - **Data Extraction:** The Python/Blender processing pipeline will be enhanced to perform a technical audit of each uploaded model, extracting hard data points:
    - Polygon Count (Tris)
    - Vertex Count
    - Material & Texture Count
    - Texture Resolutions (e.g., [4096, 2048])
    - Checks for common technical issues (e.g., non-manifold geometry).
  - **Data Persistence:** This structured technical data will be saved to a dedicated table in the PostgreSQL database, linked to the model.
  - **AI Synthesis:** A dedicated "Technical Analysis" tab on the model viewer page will trigger an API call. This call sends the stored technical data to the **Google Gemini API** with a specialized prompt. The AI then generates a professional, constructive critique, providing the artist with actionable feedback they would typically only receive from a senior artist in a studio environment. This report is displayed to the model's owner, serving as a private "technical mentor."
