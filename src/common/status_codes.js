module.exports = {
    "SUCCESS":{
        "status":0,
        "title":"Success",
        "message":"Success"
    },
    "FAILURE": {
        "status": 1,
        "title":"App Error",
        "message": "Internal Server Error. API failed"
    },
    "INVALID_DATE_RANGE": {
        "status": 1,
        "title":"Invalid Date Range",
        "message": "Date range should be between 0-365 days"
    },
    "NOT_FOUND": {
        "status": 404,
        "title":"Not Found",
        "message": "API Url not found on server"
    },
    "CITY_NOT_FOUND": {
        "status": 22,
        "title":"City Not Found",
        "message": "Please search for another city."
    },
    "REQUIRED_PARAMETER_MISSING" :{
        "status": 2,
        "title":"App Error",
        "message": "A required parameter is missing"
    },
    "DATE_FORMAT_ERROR" :{
        "status": 3,
        "title":"App Error",
        "message": "Incorrect date format"
    },
    "INVALID_VALUE" : {
        "status": 4,
        "title":"App Error",
        "message": "Invalid parameter value"
    },
    "INVALID_SORT_BY" : {
        "status":5,
        "title":"Invalid Sort Parameter",
        "message": "Please try other Sort Options"
    },
    // Oauth Errors
    "INVALID_ACCESS_TOKEN" : {
        "status":10,
        "title":"App Error",
        "message": "Invalid Access token."
    },
    "INVALID_FILTER_PARAMS":{
        "status": 14,
        "title":"App Error",
        "message": "Invalid Filter Params"
    },
    "SERVICE_UNAVAILABLE":{
        "status": 15,
        "title":"App Error",
        "message": "Service Unavailable"
    },
    "CHECKOUT_FAILED":{
        "status":17,
        "title":"Checkout Error",
        "message":"Error occurred during express checkout"
    },
    "NO_HOTEL_DETAILS":{
        "status":18,
        "title":"Unable to fetch details",
        "message":"We are unable to fetch the hotel details at the moment. Please try other hotels"
    },
    "OTA_TIMEOUT":{
        "status": 53,
        "title":"OTAs timed out",
        "message": "We tried really hard reaching our partners, but none of them are around. Please try again later."
    },
    "PARAMS_NOT_SUPPORTED":{
        "status": 54,
        "title":"Parameters not supported",
        "message": "Currently these parameters are not supported, please refine your search"
    },
    "INSUFFICIENT_DATA":{
        "status": 55,
        "title":"Insufficient Data",
        "message": "Existing data is stale"
    },
    "MAINTENANCE":{
        "status": 503,
        "title":"Under Maintenance",
        "message": "Hotels is temporarily down for maintenance. We expect to be back very soon. Thanks for your patience. "
    },
    "MAINTENANCE_IOS_OLD":{
        "status": 54,
        "title":"Please update your app",
        "message": "Hotel booking is live on App iOS app! Update your app to search and book hotels"
    },
    "USER_UNAUTHORIZED":{
        "status":403,
        "title":"Unauthorized",
        "message":"You dont have access to perform this action"
    },
    "PRICE_CHANGE":{
        "status":13,
        "title":"Price Change",
        "message":"Prices for the hotel have changed. Please try again after some time"
    },
    "DATA_NOT_AVAILABLE":{
        "status":99,
        "title":"Data Not Available",
        "message":"DATA_NOT_AVAILABLE"
    },
    "STATUS_SUMMARY":{
        "status":98,
        "title":"Status summary",
        "message":"STATUS_SUMMARY"
    },
    "ALERT_EXITS":{
        "status":100,
        "title":"Alert exists",
        "message":"This alert has already been registered"
    },
    "NO_PRIMARY_CONTACT":{
        "status":101,
        "title":"No primary contact",
        "message":"You have not set any primary contact"
    },
    "VERTICAL_NOT_SUPPORTED":{
        "status":102,
        "title":"Not Supported yet.",
        "message":"This API does not have support for the queried vertical"
    },
    "SOMETHING_WENT_WRONG_REGISTRATION":{
        "status":105,
        "title":"Aw Snap! Something went wrong",
        "message":"Sorry, we couldn't subscribe you to this alert due to some technical issue. Please retry after sometime."
    },
    "SOMETHING_WENT_WRONG_DEREGISTRATION":{
        "status":105,
        "title":"Aw Snap! Something went wrong",
        "message":"Sorry, we couldn't unsubscribe you to this alert due to some technical issue. Please retry after sometime."
    },
    "NO_PREFERENCES":{
        "status":106,
        "title":"No preferences saved for the user",
        "message":"You have not set any preference."
    }
}
