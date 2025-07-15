
# 📌 BreadButter - Fullstack Internship Assignment (Task 1)

This is the GitHub repository for **Task 1** of the **BreadButter Fullstack Internship Assignment**.  
I have successfully completed the core objective of building a fullstack matchmaking application with a REST API and a responsive React frontend.

---

## 🚀 Tech Stack Used

### 🖥️ Frontend
- **React (TypeScript)**
- **Axios** – for making HTTP requests
- **React Router** – for routing (if applicable)

### 🛠️ Backend
- **Node.js** + **Express**
- **CORS** – to enable cross-origin requests
- **Dotenv** – for environment variable management
- **FS** – for reading local JSON files
- **Nodemon** – for hot-reloading during development

---

## ⚙️ Setup Instructions

1. **Fork the repo** and clone it into your working directory.

2. Open **two terminals**:
   - In one, navigate to the `client` directory.
   - In the other, navigate to the `server` directory.

3. Run `npm i` in both terminals to install dependencies.

4. Create `.env` files in both `client` and `server` directories.

   - **Client `.env`**:
     ```env
     VITE_CLIENT_API=<your_backend_url>
     ```

   - **Server `.env`**:
     ```env
     PORT=<your_port_number>
     ```

5. Start the **backend**:
   ```bash
   npm run dev
   ```
   - Copy the backend's `localhost` URL and paste it into `VITE_CLIENT_API` in the client `.env`.

6. Start the **frontend**:
   ```bash
   npm run dev
   ```

7. You're done! 🎉 You can now use the local website to test talent-client matchmaking.

---

## 📦 Data Used

This project primarily uses one dataset:

### `TalentProfiles.json`
Contains creator data including:
- `name`: Creator’s full name
- `city`: Location of the creator
- `skills`: Array of skills offered
- `style_tags`: Tags describing the creator's style
- `portfolio[].tags`: Style tags used in specific portfolio projects

These fields are used to match against the client's input brief.

---

## 📊 Scoring Logic

The backend assigns scores to each creator based on how well they match the client’s brief. The scoring rules are:

| Criteria                            | Score                |
|-------------------------------------|-----------------------|
| Location match                      | +3                   |
| Budget match (within range)         | +2                   |
| Each matching skill                 | +2 per skill         |
| Each matching style (in tags/portfolio) | +1 per style match |

### 💡 Matching Process:
1. If the creator's `city` matches the client's selected location → **+3 points**.
2. If the client's budget falls within the creator’s expected budget range → **+2 points**.
3. For every skill in the client’s input that matches the creator’s `skills` array → **+2 points per match**.
4. For every style keyword that matches:
   - the creator's `style_tags`
   - or their `portfolio[].tags`
   → **+1 point per match**

The backend calculates scores for all creators using this logic and returns the **top 3 matches** along with a **breakdown of why they were selected**.

---

## 🧠 Improvements & Bonus Features (Optional)

Not implemented, but possible enhancements include:
- ✅ Thumbs up/down feedback per creator match (stored in `match_history.json`)
- ✅ Display past feedback for each creator
- ✅ Allow matching with remote creators
- ✅ Use fuzzy matching (e.g., sentence embeddings) for better style detection
