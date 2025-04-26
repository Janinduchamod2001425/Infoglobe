# Backend Setup

* Create a folder called "backend" in the root
* Initialize Node

```bash
npm init -y
```

* Install dependencies for the Backend

```bash
npm i firebase express dotenv jsonwebtoken bcryptjs cors cookie-parser body-parser
```

* Install Nodemon

```bash
npm i nodemon -D
```

<hr>

# API Endpoints

## Signup user

* **POST** `/api/auth/signup`
    * Request Body
      ```json
      {
        "name": "string",
        "email": "string",
        "password": "string",
        "confirmPassword": "string"
      }
      ```
    * Response
      ```json
      {
        "message": "User created successfully"
      }
      ```

    * Error Response
      ```json
      {
        "error": "User already exists"
      }
      ```

## Login user

* **POST** `/api/auth/login`
    * Request Body
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
    * Response
      ```json
      {
        "message": "User logged in successfully",
        "token": "string"
      }
      ```

    * Error Response
      ```json
      {
        "error": "Invalid credentials"
      }
      ```

## User Logout

* **POST** `/api/auth/logout`
    * Response
      ```json
      {
        "message": "User logged out successfully"
      }
      ```

    * Error Response
      ```json
      {
        "error": "User not logged in"
      }
      ```

## Get User Profile

* **GET** `/api/auth/profile/:id`
    * Response
      ```json
      {
        "user": {
          "name": "string",
          "email": "string"
        }
      }
      ```

    * Error Response
      ```json
      {
        "error": "User not logged in"
      }
      ```



