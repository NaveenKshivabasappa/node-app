module.exports = {
    "isProduction": false,
    "db":{
    	"mongodb": {
                "db_name":"locationdb",
                "username":"appUser",
                "password":"DbU69W7T4Fa4Uhe",
                "coll_name":{
                    "user_profile":"user_info"
                },
                "servers":[{
                    "host":"ds125273.mlab.com",
                    "port":"25273"
                    }],
                "replica_set":"",
                "db_options": {
                	"useNewUrlParser":true,
                	"connectTimeoutMS": 30000
                }
            }
    }
}