const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const db = require("./config/db.js")

MongoClient.connect(db.url, (err, database) => {
    axios({
        'method': 'get',
        'baseURL': "https://e3519ce8d2b72750210800f3ba7115f2:a87522cc2e2551e43549aceb52e5d141@securecod4.myshopify.com/admin/api/2020-01/customers.json",
        'headers':{
            "Content-Type":'application/json',
            "Authorization": 'Basic ZTM1MTljZThkMmI3Mjc1MDIxMDgwMGYzYmE3MTE1ZjI6YTg3NTIyY2MyZTI1NTFlNDM1NDlhY2ViNTJlNWQxNDE='
        }
    })
    .then(function (response) {
        let customers = []
        response.data.customers.forEach(element => {
            customers.push(element)
        });
        database.collection('customers').insertMany(customers)
    })
    .catch(function (error) {
        console.log(error);
    })
})
    