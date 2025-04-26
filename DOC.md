# Project Report 📝

## API Choices

1. REST Countries API

* Endpoint: https://restcountries.com/v3.1

##### Why chosen:

* Free tier with comprehensive country data
* No API key required
* Supports filtering by region/name

2. Firebase Services
   Authentication: Email/password auth flow

* Firestore: Stores user favorites with realtime updates

##### Advantages:

* Serverless architecture
* Built-in security rules
* Free tier sufficient for small projects

## 🧗 Challenges & Solutions

1. Hook Order Violation

##### Issue:

* React error when conditional hooks rendered inconsistently

###### Before (error)

```javascript
if (loading) return <Loading/>;
useEffect(() => {
}, []);
```

###### After (fixed)

```javascript
useEffect(() => {
}, []);
if (loading) return <Loading/>;
```       

<hr>

2. Firebase Security Rules

##### Issue:

* Users could read/write all documents

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /favorites/{userId}/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

<hr>

3. Vite Environment Variables

##### Issue:

* Environment variables not loading in production

* Solution:

`Used import.meta.env prefix`

* Added .env to .gitignore

`Created .env.example for documentation`