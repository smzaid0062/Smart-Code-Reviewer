<div align="center">

# 🚀 Smart Code Reviewer

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=22C55E&center=true&vCenter=true&width=600&lines=AI-Powered+Code+Analysis;Instant+Feedback+for+Developers;Built+with+React+%2B+Node.js+%2B+Groq;Fully+Automated+CI%2FCD+Pipeline" alt="Typing SVG" />

<br />

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white" alt="PM2" />
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-features">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-data-flow">Data Flow</a> •
  <a href="#-database-schema">Database</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment--cicd">Deployment</a>
</p>

</div>

---

## 📖 About The Project

**Smart Code Reviewer** is an AI-powered platform designed to help developers write better code faster. By leveraging advanced LLMs (via OpenRouter/Groq), it analyzes your code snippets, identifies potential bugs, suggests optimizations, and provides instant, actionable feedback.

Whether you are a beginner learning a new language or a senior developer refactoring a massive codebase, Smart Code Reviewer acts as your personal, 24/7 senior engineer.

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🤖 AI-Driven Analysis</h3>
      <p>Instantly reviews code snippets for bugs, security vulnerabilities, and performance bottlenecks using state-of-the-art LLMs (Nvidia Nemotron via OpenRouter).</p>
    </td>
    <td width="50%">
      <h3>⚡ Blazing Fast UI</h3>
      <p>Built with Vite and React, ensuring a snappy, responsive experience with real-time markdown streaming.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Beautiful Syntax Highlighting</h3>
      <p>Supports multiple programming languages with a sleek, dark-mode-first UI for comfortable late-night coding.</p>
    </td>
    <td width="50%">
      <h3>🔒 Secure & Scalable</h3>
      <p>JWT-based authentication, secure API routing, and a MongoDB backend designed for scalability.</p>
    </td>
  </tr>
</table>

---

## 🏗 System Architecture

The application is deployed on a highly optimized single-node AWS EC2 instance. Nginx acts as a reverse proxy, serving the compiled React frontend and routing API traffic to a PM2-managed Node.js backend.

```mermaid
graph TD
    Client((👨‍💻 User Browser))
    
    subgraph AWS_EC2 [AWS EC2 Instance - Ubuntu 24.04]
        Nginx[Nginx Reverse Proxy]
        Frontend[React + Vite Build /dist]
        Node[Node.js + Express Backend]
        PM2[PM2 Process Manager]
        
        Nginx -->|Route: /| Frontend
        Nginx -->|Route: /api/*| Node
        PM2 -.->|Monitors & Restarts| Node
    end
    
    subgraph External_Services [External Services]
        DB[(MongoDB Atlas)]
        AI[OpenRouter API <br/> Nvidia Nemotron]
    end
    
    Client -->|HTTP/HTTPS| Nginx
    Node <-->|Mongoose ODM| DB
    Node <-->|REST / JSON| AI
    
    style AWS_EC2 fill:#f9f9f9,stroke:#333,stroke-width:2px
    style External_Services fill:#e6f3ff,stroke:#333,stroke-width:2px
    style Nginx fill:#009639,color:#fff
    style Frontend fill:#61DAFB,color:#000
    style Node fill:#339933,color:#fff
    style PM2 fill:#2B037A,color:#fff