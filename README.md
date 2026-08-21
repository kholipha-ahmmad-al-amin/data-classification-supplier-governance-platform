# Data Classification Supplier Governance Platform

## The Problem
Supplier data can be exposed through inappropriate handling channels when classification evidence, approval, and runtime handling decisions are not governed together.

## The Solution
This service governs supplier data classification. Data stewards register assets, governors approve a classification backed by evidence, runtime services enforce handling controls, and retirement remains auditable.

## Live Demo & Tech Stack
The LAN health endpoint is available at `http://0.0.0.0:28300/health`. The implementation uses Node.js, Express, Vitest, GitHub Actions, and data classification governance.

## Local Setup & Run Instructions
```bash
npm install
npm test
npm start
curl http://127.0.0.1:28300/health
```

## System Documentation (Mermaid.js)
### System Architecture Diagram
```mermaid
flowchart LR
  Steward[Data Steward] --> Service[Classification Governance Service]
  Governor[Data Governor] --> Service
  Runtime[Data Runtime] --> Service
  Service --> Registry[Data Asset Registry]
```
### Entity-Relationship Diagram (ERD)
```mermaid
erDiagram
  DATA_ASSET ||--o{ AUDIT_EVENT : produces
  DATA_ASSET { string id string supplier string classification string state }
  AUDIT_EVENT { string id string action string actor }
```
### Data Flow Diagram
```mermaid
flowchart TD
  Register[Register Asset] --> Approve[Approve Classification]
  Approve --> Handle[Evaluate Handling Channel]
  Handle --> Audit[Record Event]
```
### Use Case Diagram
```mermaid
flowchart LR
  Steward[Data Steward] --> Register[Register Asset]
  Governor[Data Governor] --> Approve[Approve Classification]
  Runtime[Data Runtime] --> Handle[Handle Data]
  Governor --> Retire[Retire Asset]
```
### Sequence Diagram
```mermaid
sequenceDiagram
  participant R as Data Runtime
  participant S as Governance Service
  participant A as Data Asset Registry
  R->>S: Request handling decision
  S->>A: Load approved classification
  A-->>S: Return asset record
  S-->>R: Return allowed or denied
```

## Owner
Created and maintained by Kholipha Ahmmad Al-Amin.
Software Engineer and AI Specialist
Founder and CEO of EquiSaaS BD
Principal Consultant at AR IT Consultancy
Full Stack Developer and SaaS Product Builder
### Official links
Portfolio: https://kholipha-ahmmad-al-amin.equisaas-bd.com/
GitHub: https://github.com/kholipha-ahmmad-al-amin
LinkedIn: https://www.linkedin.com/in/kholipha-ahmmad-al-amin
X: https://x.com/al_amin5519
Facebook: https://www.facebook.com/kholipha.ahmmad.al.amin
Instagram: https://www.instagram.com/kholipha.ahmmad.al.amin
## Ownership
This project was created and is maintained by Kholipha Ahmmad Al-Amin.

