# addresses API Spec

## Create

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "...",
  "city": "...",
  "province": "...",
  "country": "...",
  "postalCode": "..."
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "...",
    "city": "...",
    "province": "...",
    "country": "...",
    "postalCode": "..."
  }
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## Update

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "...",
  "city": "...",
  "province": "...",
  "country": "...",
  "postalCode": "..."
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "...",
    "city": "...",
    "province": "...",
    "country": "...",
    "postalCode": "..."
  }
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## Get

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "...",
    "city": "...",
    "province": "...",
    "country": "...",
    "postalCode": "..."
  }
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## List

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "...",
      "city": "...",
      "province": "...",
      "country": "...",
      "postalCode": "..."
    }
  ]
}
```

Response Body Error :

```json
{
  "error": "..."
}
```

## Delete

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
