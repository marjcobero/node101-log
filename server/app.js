// express server
const express = require('express');
const fs = require('fs');
const app = express();
const csvjson = require('csvjson');

app.use((req, res, next) => {
// write your logging code here
    const date = new Date();
    // Agent, time, method, resource, version, status
    const agent = req.headers["user-agent"];
    const time = timeData.toISOString();
    const method = req.method;
    const resource = req.url;
    const version = 'HTTP/${req.httpVersion}'
    const status = res.statusCode
    const info = '\n${agent},${time},${method},${resource},${version},${status}'
    
    fs.appendFile('log.csv', info, (err) => {
        if(err) throw err;
    })
    
    res.locals.user = info;
    next()
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
    console.log(res.locals.user);
    res.send("OK");
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    fs.readFile('log.csv', 'utf-8', (err, info) => {
        console.log('logdata: ', info)
        if(err) throw err;
        const jsonLog = csvjson.toObject(info);
        res.send(jsonLog);
    });
    
});

module.exports = app;
