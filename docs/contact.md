# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "phone": "131312312"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@email.com",
        "phone": "131312312",
    }
}
```

Response Body Error:

```json
{
  "error": "..."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

````json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "phone": "131312312"
}

Response Body Success :

```json
{
    "data": {
        "id": 1
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@email.com",
        "phone": "131312312",
    }
}
````

Response Body Error:

```json
{
  "error": "..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data": {
        "id": 1
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@email.com",
        "phone": "131312312",
    }
}
```

Response Body Error:

```json
{
  "error": "..."
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by `firstName` or `lastName`, optional
- email : Search by `email`, optional
- phone : Search by `phone`, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data": {
        "result": [
        {
            "id": 1
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@email.com",
            "phone": "131312312",
        },
        {
            "id": 2
            "firstName": "Ema",
            "lastName": "Doe",
            "email": "ema@email.com",
            "phone": "12123434",
        }
        ],
        "paging": {
            "page": 1,
            "totalPage": 3,
            "totalItem": 30
        }
    }
}
```

Response Body Error:

```json
{
  "error": "..."
}
```

## Delete Contact

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error:

```json
{
  "error": "..."
}
```
