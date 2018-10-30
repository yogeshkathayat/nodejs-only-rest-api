const http = require('http');


//create a server object:
http.createServer(async (req, res) => {

    let url = req.url;
    let method = req.method;



    /***************************************
    ****************************************
    *********** ALL GET METHODS  ***********
    ****************************************
    ****************************************/
    if (method == 'GET') {

        /*
        * GET a user /get-user
        */
        if (url === '/get-user') {
            res.setHeader('Content-Type', 'application/json');// http header
            let responseObj = {
                code: 200,
                message: "User found",
                data: { name: "alex" }
            }
            res.write(JSON.stringify(responseObj), JSON); //write a response
            res.end(); //end the response
        }


        /*
        * GET list of users /users
        */
        else if (url === '/get-users') {
            res.setHeader('Content-Type', 'application/json');// http header
            let responseObj = {
                code: 200,
                message: "Users list found",
                data: [{ name: "alex" }, { name: "jhon" }]
            }
            res.write(JSON.stringify(responseObj), JSON); //write a response
            res.end(); //end the response
        }

        /*
        * if url not found
        */
        else {
            res.setHeader('Content-Type', 'application/json');// http header
            let responseObj = {
                code: 400,
                message: "Url not found",
                data: []
            }
            res.write(JSON.stringify(responseObj), JSON); //write a response
            res.end(); //end the response
        }

    }





    /***************************************
    ****************************************
    *********** ALL POST METHODS  **********
    ****************************************
    ****************************************/
    else if (method == 'POST') {

        /*
        * POST add a user /add-user
        */
        if (url === '/add-user') {
            res.setHeader('Content-Type', 'application/json');// http header
            let data = await getRequestBodyData(req);
            data = JSON.parse(data);
            let responseObj = {
                code: 200,
                message: "User created",
                data: data
            }
            res.write(JSON.stringify(responseObj), JSON); //write a response
            res.end(); //end the response
        }


        /*
        * if url not found
        */
        else {
            res.setHeader('Content-Type', 'application/json');// http header
            let responseObj = {
                code: 400,
                message: "Url not found",
                data: []
            }
            res.write(JSON.stringify(responseObj), JSON); //write a response
            res.end(); //end the response
        }
    }



    /***************************************
    ****************************************
    *********** ALL PUT METHODS  ***********
    ****************************************
    ****************************************/
    else if (method == 'PUT') {

    }




    /***************************************
    ****************************************
    *********** ALL DELETE METHODS  ********
    ****************************************
    ****************************************/
    else if (method == 'DELETE') {

    }




    /***************************************
    ****************************************
    *********** OTHER METHODS  *************
    ****************************************
    ****************************************/
    else {

    }


}).listen(3000, () => {
    console.log("server start at port 3000"); //the server object listens on port 3000
});


/*
* function to get request body data in POST request
*/

getRequestBodyData = (req) => {
    const contentType = 'application/json';
    return new Promise((resolve, reject) => {
        if (req.headers['content-type'] === contentType) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        }
        else {
            resolve(null);
        }
    });
}