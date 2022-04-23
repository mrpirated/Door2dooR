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
        }
        ```
    - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
3. /api/admin/addStation
    - request
        ``` javascript
        "headers":{
            "authorization":"Bearer "+token
        },
        "body":{
           "code":string,
           "name":string,
           "pincode":string
        }
        ```
    - response
        ```javascript
        {
            "success":boolean,
            "message":string,
        }
        ```
    - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
4.  /api/admin/addTrain
    - request
        ``` javascript
        "headers":{
            "authorization":"Bearer "+token
        },
        "body":{
           "num":string,
           "name":string,
           "days":string,
           "schedule":[
              "code":string,
                "arrival":string (time),
                "departure":string (time),
                "pos":int,
                "day":int
           ]

        }
        ```
    - response
        ```javascript
        {
            "success":boolean,
            "message":string,
        }
        ```
    - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
5. /api/admin/addAirport
    - request
        ``` javascript
        "headers":{
            "authorization":"Bearer "+token
        },
        "body":{
           "code":string,
           "name":string,
           "pincode":string
        }
        ```
    - response
        ```javascript
        {
            "success":boolean,
            "message":string,
        }
        ```
    - error
        ```javascript
        {
            "success":boolean,
            "message": string
        }
        ```
