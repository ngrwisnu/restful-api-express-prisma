# User API Specs

## Register User

Endpoint : POST /api/users

Request body :

```json
{
  "username": "john",
  "password": "...",
  "name": "John Doe"
}
```

Response body Success :

```json
{
  "data": {
    "username": "john",
    "name": "John Doe"
  }
}
```

Response body Error :

```json
{
  "errors": "..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "john",
  "password": "..."
}
```

Request Body Success :

```json
{
  "data": {
    "token": "..."
  }
}
```

Request Body Error :

```json
{
  "error": "..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "John Doe", //optional
  "password": "new password" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "john",
    "name": "John Doe"
  }
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "john",
    "name": "John Doe"
  }
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## Logout User

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "error": "..."
}
```
