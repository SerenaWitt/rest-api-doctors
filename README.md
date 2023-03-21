# Introduction

Rest-Api-Doctors was built from the ground-up to learn Rest API and use Postman.

## Use Cases

The use case for this API is to gather information for a given patient name, so that you can retrieve their ID number and all their visits, as well as their doctors.

## Authorization

All API requests require the use of a generated API key. You can find your API key, or generate a new one, by navigating to the /settings endpoint.

Alternatively, you may append the `api_key=[API_KEY]` as a GET parameter to authorize yourself to the API. But note that this is likely to leave traces in things like your history, if accessing the API through a browser.


### GET ALL DOCTORS
```http
GET /api/v1/doctors
```
Response
```javascript
[
    {
        "id": "int",
        "name": "string",
        "specialty": "string"
    }
]
```

### GET A DOCTOR BY ID #
```http
GET /api/v1/doctors/:id?id=1)
```
Response
```javascript
{
    "id": 1,
    "name": "Jeff Anderson",
    "specialty": "Cardiologist"
}
```

### CREATE A NEW DOCTOR
```http
POST /api/v1/doctors
```
Response
```javascript
{
    "id": 4,
    "name": "Doctor Who",
    "specialty": "Dermatologist"
}
```

### GET ALL PATIENTS
```http
GET /api/v1/patients
```
Response
```javascript
[
    {
        "id": "int",
        "name": "string"
    }
]
```

### GET PATIENT BY ID #
```http
GET /api/v1/patients/Alan Mckenzie?identifier=2
```
Response
```javascript
{
    "id": "int",
    "name": "string"
}
```

### GET VISITS BY PATIENT ID, DOCTOR ID, PATIENT NAME or DOCTOR NAME
```http
GET /api/v1/visits?patientid=1&doctorid=1&doctorname=Jeff Anderson&patientname=Alan Mckenzie
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `patientid` | `int` | **Required**. Your API key |
| `doctorid` | `int` | **Required**. Your API key |
| `doctorname` | `string` | **Required**. Your API key |
| `patientname` | `string` | **Required**. Your API key |

Response
```javascript
[
    {
        "doctorName": "string",
        "doctorSpecialty": "string",
        "visitDate": "string",
        "patientName": "string"
    }
]
```

### CREATE A NEW PATIENT
```http
POST /api/v1/patients
```
Response
```javascript
{
    "id": "int",
    "name": "string"
}
```

## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, it returns a JSON response error


## Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
