import ballerina/io;
import ballerina/http;

// Function to get user information from the database
type UserAuth record {
    string user_id;
    string password;
};

function getUser(string username, string password) returns UserAuth|error {
    // Perform the logic to fetch user from the database
    // Here, I'm mocking the database query
    UserAuth user = {user_id: "admin", password: "admin"};
    if (user.user_id == username && user.password == password) {
        return user;
    } else {
        return error("User not found");
    }
}

public function main() returns error? {
    // Create an HTTP client to make requests to the iTunes API
    http:Client iTunes = check new http:Client("https://itunes.apple.com");

    // Make a GET request to search for albums by Jack Johnson
    http:Response response = check iTunes->get("/search?term=jack+johnson&entity=album&attribute=allArtistTerm");

    // Print the response received from the iTunes API
    io:println(response);

    // Print a simple message
    io:println("Hello, World!");

    return ();
}

// Define an HTTP service for user login
service /login on new http:Listener(8080) {

    resource function post login(http:Caller caller, http:Request req) returns error? {
        // Get the username and password from the request form parameters
        map<string> formParams = check req.getFormParams();
        string? username = formParams["username"];
        string? password = formParams["password"];

        // Check if username and password are provided
        if (username == null || password == null) {
            // Return a JSON response with an error message
            http:Response response = new;
            response.statusCode = 400;
            response.setJsonPayload({ "error": "Username and password are required" });
            var result = caller->respond(response);
            if (result is error) {
                io:println("Error sending response:", result);
            }
            return ();
        }

        // Get the user information from the database
        UserAuth|error userResult = check getUser(username, password);
        if (userResult is error) {
            // Return a JSON response with an error message
            http:Response response = new;
            response.statusCode = 401;
            response.setJsonPayload({ "error": "Invalid username or password" });
            var result = caller->respond(response);
            if (result is error) {
                io:println("Error sending response:", result);
            }
        } else {
            // Return a JSON response with a success message
            UserAuth user = userResult;
            http:Response response = new;
            response.setJsonPayload({ "success": true, "user_id": user.user_id });
            var result = caller->respond(response);
            if (result is error) {
                io:println("Error sending response:", result);
            }
        }
        return ();
    }
}
