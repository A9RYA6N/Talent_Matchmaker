# 📌 BreadButter Assignment – Task 1: Talent Matchmaker API

## 🧭 Introduction

BreadButter Assignment Task 1 involves designing and implementing a matchmaking API that connects client project briefs with the most relevant creator profiles from a given dataset. The goal is to simulate a talent discovery system where clients can input their preferences—such as location, budget, skills, and style—and receive a list of the top three best-matched creators.

The system is centered around a single `/match` endpoint which processes the client brief, applies a scoring algorithm against available talent profiles, and returns structured results in a ranked format, complete with a breakdown of the match reasoning.

---

## 🔌 Endpoints

### 1. `POST /match`

#### a. 📥 Input

The endpoint accepts JSON-formatted data with the following structure:

```json
{
  "location": "string",
  "budget": number,
  "skills": ["string"],
  "style": ["string"]
}
```

- **location**: Name of the city for the project (e.g., `"Goa"`)
- **budget**: Numeric value representing the client's available budget
- **skills**: Array of required skills (e.g., `["Fashion Shoots", "Weddings"]`)
- **style**: Array of preferred visual styles (e.g., `["vibrant", "minimal"]`)

#### b. 📤 Output

The response contains a JSON object with the following structure:

```json
{
  "success": boolean,
  "data": [
    {
      "name": "string",
      "score": number,
      "reason": {
        "c": number,
        "s": number,
        "t": number,
        "b": number
      }
    }
  ],
  "message": "string"
}
```

- **success**: Indicates if the matchmaking operation was successful (`true` or `false`).
- **data**: Array of the top 3 best-matched talents, ranked by score. Each object includes:
  - `name`: Creator's name
  - `score`: Computed score based on input criteria
  - `reason`: Breakdown of score components:
    - `c`: Location match (+3)
    - `b`: Budget match (+2)
    - `s`: Skill matches (+2 per skill)
    - `t`: Style matches (+1 per match)
- **message**: Human-readable message (e.g., `"Talents got"` or error message)

#### ✅ Successful Call Example (HTTP 200)

```json
{
  "success": true,
  "data": [
    {
      "name": "Brandy Mcbride",
      "score": 11,
      "reason": { "c": 1, "s": 1, "t": 4, "b": 1 }
    },
    {
      "name": "Rachel Powell",
      "score": 9,
      "reason": { "c": 1, "s": 1, "t": 2, "b": 1 }
    },
    {
      "name": "John Watson",
      "score": 9,
      "reason": { "c": 1, "s": 1, "t": 2, "b": 1 }
    }
  ],
  "message": "Talents got"
}
```

#### ❌ Unsuccessful Call Example (HTTP 500)

```json
{
  "success": false,
  "message": "Internal server error: TypeError: Cannot read properties of undefined (reading 'forEach')"
}
```

---

## ✅ Conclusion

The `/match` endpoint is the foundation of the Talent Matchmaker system. It provides an effective and transparent way to connect client briefs with suitable creators using a rules-based scoring mechanism. With structured inputs and outputs, the API is easy to integrate into a frontend application and supports future enhancements such as feedback handling or fuzzy matching.