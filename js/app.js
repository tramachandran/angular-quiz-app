/* Handles the controller and quiz module properties */
var quizapp = angular.module('quizapp', ['ngRoute']);

//This handles the routing of views
quizapp.config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginctrl'
  }).when('/quiz', {
    templateUrl: 'views/quiz.html',
    controller: 'quizctrl'
  }).otherwise({
            redirectTo : '/login'
        });
  
});

// Application Controller handles the view for login, register and logout functionalities
quizapp.controller('quizappcontroller', ['$scope','$rootScope','$location',function($scope,$rootScope,$location) {
	$rootScope.authenticated = false;
	$rootScope.setLogin= function(){
		$rootScope.loginclick = true;
		$rootScope.registerclick =  false;
		$scope.$broadcast('ChangeType');
	};
	// loading the initial screen with login
	$rootScope.setLogin();
	$rootScope.setRegister= function(){
		$rootScope.loginclick = false;
		$rootScope.registerclick =  true;
		$scope.$broadcast('ChangeType');
	};
	// For logout we need to invalidate the user and login screen will be loaded.
	$scope.logout= function(){
		$rootScope.authenticated = false;
		$rootScope.userName = "";
		$location.path('/login');
	}
}]);

// controller handles the login and register actions and loading the quiz view
quizapp.controller('loginctrl', ['$scope','$rootScope','$location',function($scope,$rootScope,$location) {

	$scope.$on('ChangeType', function (event) {
	 $scope.type = ($rootScope.loginclick) ? "Login" : "Register";
	});
	$scope.type = ($rootScope.loginclick) ? "Login" : "Register";
	$scope.loginOrRegister = function(){
		$scope.loginError = "";
		var pwd = document.getElementById('password').value;
		var email = document.getElementById('email').value;
		if(formValid(email,pwd) ){
			if($scope.type == "Login"){
				if(login(email,pwd)){
					$rootScope.authenticated = true;
					$rootScope.userName = email;
					$location.path('/quiz');
				}else{  
					$scope.loginError = "Email/password combination not matching."
				}
			}
			else{
				if(register(email,pwd)){
					$rootScope.authenticated = true;
					$rootScope.userName = email;
					$location.path('/quiz');
				}else{
					$scope.loginError = "This user already exist in the system.please login"
				}
			}
		}
	};
	function formValid(email,pwd){
		if(pwd && email) return true;
		else return false;
	}
	function login(email,pwd){
		var savePwd = localStorage[email];
		if(pwd == savePwd ) return true;
		return false;
	}
	function register(email,pwd){
		
		if(!localStorage[email]){
			localStorage[email] = pwd;
			return true;
		}else{
			return false;
		}
	}
}]);