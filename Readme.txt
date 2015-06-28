Quiz Application:

This application is designed with two angularjs views login.html and quiz.html with basic view index.html
The js files used are angular.min.js, angular.route.min.js, app.js and quizcontroller.js.
The application uses the factory method for providing the quiz questions.
This application is designed with single standalone css file with basic styles(quizapp.css).

Folders
1)css
		--- quizapp.css
2)js
		--- app.js and quizcontroller.js
3)views
		--- login.html and quiz.html

Running the application

The application runs along with any web server either apache tomcat or IIS. 
The quiz_app_solution folder need to be placed inside the webapps folder.
You can load the application by http://localhost:8080/angular_js_solution/index.html this link once your configuration is done(system and port may change according to your configuration).
Once the application is loaded in any browser with index.html you can get the login view, for first time you can register an user by clicking the "Register" link. 
Basic form validation is done both on login and registration and registers details is stored in "localStorage" for later use. 
Once user registration is done you we see the quiz screen, you can start answering the questions by clicking the "Continue" button. 
Finally you can "submit" the quiz on last question. 
Once you submitted you can see the results with the percentage you scored.

The application is tested on IE11, chrome and firefox.