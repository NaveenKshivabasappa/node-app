module.exports = {
    "isProduction": false,
    "db":{
        "mongodb": {
                "db_name":"test",
                "coll_name":{
                    "user_profile":"user_info"
                },
                "servers":[{
                    "host":"127.0.0.1",
                    "port":"27017"
                    }],
                "replica_set":"rs0",
                "db_options": {
                    "useNewUrlParser":true,
                    "connectTimeoutMS": 30000
                }
            }
    }
}