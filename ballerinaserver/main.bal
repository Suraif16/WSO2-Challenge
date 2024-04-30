import ballerina/io;
import ballerina/http;
import ballerina/sql;
import ballerina/reflect;


public function main() returns error? {
    http:Client iTunes = check new("https://itunes.apple.com");
    json search = check iTunes->get("/search?term=jack+johnson&entity=album&attribute=allArtistTerm");
    io:println(search);
    io:println("Hello, World!");
}

type UserAuth record {
    string user_id;
    string password;
};

service /login on new http:Listener(8080) {

    resource function post login(http:Caller caller, http:Request req) returns error? {
        string username = check req.getFormParam("username");
        string password = check req.getFormParam("password");

        UserAuth|error userResult = check getUser(username, password);
        if (userResult is error) {
            // Return a JSON response with an error message
            http:Response response = new;
            response.statusCode = 401;
            response.setJsonPayload({ "success": false });
            var result = caller->respond(response);
            if (result is error) {
                io:println("Error sending response:", result);
            }
        } else {
            // Return a JSON response with a success message
            http:Response response = new;
            response.setJsonPayload({ "success": true });
            var result = caller->respond(response);
            if (result is error) {
                io:println("Error sending response:", result);
            }
        }
    }
}

function getUser(string username, string password) returns UserAuth|error {
    // Perform the logic to fetch user from database
    // Here, I'm mocking the database query
    UserAuth user = {user_id: "admin", password: "admin"};
    if (user.user_id == username && user.password == password) {
        return user;
    } else {
        return error("User not found");
    }
}