"use strict";

const execSync = require('child_process').execSync;

// функция для взаимодействия с операционной системой
function cmdQuery(s) {
    // задание кодировки
    const options = {
        encoding: 'utf8'
    };
    const cmd = s.toString();
    const answer = execSync(cmd, options);
    return answer.toString();
}

let express = require('express');
let app = express();

// описание заголовков, которые будут отправляться клиенту
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});


let port = 5007;
app.listen(port);

// выводим информацию об успешном запуске сервера
console.log("     ");
console.log("Server works on port " + port);
console.log("----------------------------------");
console.log("     ");

// функция для загрузки тела POST-запроса
function bodyControl (request, response) {
    return new Promise((resolve, reject) => {
        // массив для хранения частей тела POST-запроса
        let buffer = [];

        request.on('data', (data) => {
            buffer.push(data);
        }).on('end', () => {
            const bodyString = buffer.join("");

            let bodyObj = undefined;

            // флаг наличия ошибки
            let errorFlag = false;

            try {
                // пытаемся преобразовать тело POST запроса в объект
                bodyObj = JSON.parse(bodyString);
            } catch(err) {
                // в случае ошибки задаём флаг наличия ошибки
                errorFlag = true;
            }

            if(errorFlag === false) {
                resolve({
                    request: request,
                    response: response,
                    bodyObj: bodyObj,
                });
            } else {
                reject(new Error("Error of parsing JSON"));
            }
        });
    });
}

app.post('/add/', function (request, response) {
    console.log("POST");
    bodyControl(request, response)
        .then((params) => {
            const data = JSON.stringify(params.bodyObj);
            const result = cmdQuery("node invoke.js addToBase '" + data + "'");
            console.log(result);
            response.end(result.toString());
        }, (error) => {
            response.end(JSON.stringify({
                result: "JSON_ERROR"
            }));
        });
});

app.get('/', function (request, response) {
    console.log("GET");
    const result = cmdQuery("node invoke.js getAllBase database");
    console.log(result);
    response.end(result.toString());
});

