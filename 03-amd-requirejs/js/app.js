require.config({
    "baseUrl": "js",
    "paths": {
      "app": "app",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min"
    }
});

// Load the main app module to start the app
require(["main"]);