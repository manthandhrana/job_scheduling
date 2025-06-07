# 📅 Job Scheduling System (Without node-cron)

This is a Node.js-based job scheduling system that allows users to schedule tasks (like printing "Hello World") at hourly, daily, or weekly intervals **without using built-in cron libraries**.

---

## ✅ Features

- ⏰ Supports hourly, daily, and weekly schedules
- 💾 Jobs are stored in `jobStorage.json` for persistence
- 🔁 Custom scheduling logic using native JavaScript
- 📦 REST API to schedule jobs
- 📚 Swagger docs for API usage

---

## 🧑‍💻 Setup

To run this project locally, follow these steps:

1. **Clone & Install repository:**
```bash
git clone https://github.com/manthandhrana/job_scheduling.git
cd job_scheduling
npm install
```


2. **start the backend server**
    ```
    node ./index.js
    ```

3. **server running**
    ```
    Server Running On : http://localhost:3000
    Swagger UI : http://localhost:3000/api-docs
    ```

## How AgentDesk Look Like

#### Hourly Job :
![image](https://github.com/user-attachments/assets/4eb20b25-3c52-4c3b-b570-2a4d92e0c80e)
![image](https://github.com/user-attachments/assets/2ba43ffa-d415-4571-ad17-afa5d743613b)


#### Daily Job :
![image](https://github.com/user-attachments/assets/f6abb60a-7151-4ba3-9867-b788a86b508d)
![image](https://github.com/user-attachments/assets/3bfcacfa-c33c-4cdd-be12-8ed22d44a4af)



#### Weekly job :
![image](https://github.com/user-attachments/assets/d13c5f12-a99d-40a1-9900-49169e407af6)
![image](https://github.com/user-attachments/assets/8e65dc62-56ff-4f2a-ab93-c6d3cf4ef8f8)
