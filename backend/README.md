# API DOCUMENTATION


### Auth Routes

1. /api/login (POST)
   - request
        ```javascript
        "body":{
            "type":string,
            "email": string,
            "password": string
        }
        ```
   - response
        ```javascript
        {
            "success":boolean,
            "message":string,
            "data": {
                "token":string,
                "user":{
                    "_id":0, // user_id,  admin_id depending on type
                    "first_name":string,
                    "last_name":string,
                    "dob":string,
                    "gender":string,
                    "address":string,
                    "email":string,
                    "password":string,
                    "phone":string
                }
            }
        }
        ```
   - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
2. /api/signup (POST)
   - request
        ``` javascript
        "body":{
            "type":string,
            "phone":string,
            "otp":string, // if this field is not present then otp will be sent on the phone number, call the api again with otp field
            "email":string,
            "password":string,
            "name":string,
        }
        ```
    - response
        ```javascript
        {
            "success":boolean,
            "message":string,
            "token":string, // user will be logged in after signup
            "user":{
                "_id":number, // patient_id, doctor_id, admin_id depending on type
                "name":string,
                "email":string,
                "password":string,
                "phone":string
            }
        }
        ```
    - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
