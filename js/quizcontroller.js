quizapp.controller('quizctrl',['$scope','quizFactory',function($scope,quizFactory){
	$scope.init = function() {
		$scope.id = 0;
		$scope.score = 0;
		$scope.quizend = false;
		$scope.quizProgress = true;
		$scope.buttonSubmit = false;
		// To store all the result of each question.
		$scope.result = [];
		$scope.retrieveQuestion();
	};
	$scope.quizLength = quizFactory.getQuestionsLength();
	$scope.retrieveQuestion = function() {
		var ques = quizFactory.getQuestion($scope.id);
		if(ques) {
			$scope.question = ques.question;
			$scope.options = ques.options;
			$scope.answer = ques.answer;
		} else {
			$scope.quizend = true;
		}
	};
	$scope.nextQuestion = function() {
		$scope.checkAnswer();
		var data = {
			question:$scope.question,//for question
			correctAns:$scope.correctAns,//for color
			givenAnswer : $scope.givenAnswer,//
			CorrectAnswer: $scope.CorrectAnswer
		};
		$scope.result.push(data);
		$scope.id++;
		$scope.retrieveQuestion();
		if($scope.quizLength == $scope.id+1)
			$scope.buttonSubmit = true;
	}
	$scope.checkAnswer = function() {
		var ans;
		var checkedBoxes = getCheckedBoxes();
		if(!checkedBoxes) ans = "";
		else ans = checkedBoxes[0].value;
		$scope.CorrectAnswer = $scope.options[$scope.answer];
		$scope.givenAnswer = ans;
		if(ans == $scope.options[$scope.answer]) {
			$scope.score++;
			$scope.correctAns = true;
		} else {
			$scope.correctAns = false;
		}
	};
	$scope.init();
	function getCheckedBoxes(chkboxName) {
	  var checkboxes = document.getElementsByName('answer');
	  var checkboxesChecked = [];
	  for (var i=0; i<checkboxes.length; i++) {
		 if (checkboxes[i].checked) {
			checkboxesChecked.push(checkboxes[i]);
		 }
	  }
	  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
	}
}]);

quizapp.factory('quizFactory', function() {
	var questions = [
		{
			question: "1. Which is not an advantage of using a closure?",
			options: ["Prevent pollution of global scope", "Encapsulation", "Private properties and methods", "Allow conditional use of ‘strict mode’"],
			answer: 2
		},
		{
			question: "2. To create a columned list of twoline email subjects and dates for a masterdetail view,which are the most semantically correct?",
			options: ["<div>+<span>", "<tr>+<td>", "<ul>+<li>", "<p>+<br>","none of these","all of these"],
			answer: 0
		},
		{
			question: "3. To pass an array of strings to a function, you should not use...",
			options: ["fn.apply(this, stringsArray)", "fn.call(this, stringsArray)", "fn.bind(this, stringsArray)"],
			answer: 2
		},
		{
			question: "4. Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?",
			options: ["getElementById('outer').children[0]", "getElementsByClassName('inner')[0]"],
			answer: 0
		},
		{	
			question: "5. angular.module(‘myModule’,[]).service(‘myService’,(function() {\n"+
						"var message = “Message one!”\n"+
						"var getMessage = function() {\n"+
						"return this.message\n"+
						"} this.message =“Message two!;”\n"+
						"this.getMessage = function() { return message }\n"+
						"return function() {\n"+
						"return {\n"+
						"getMessage: getMessage,\n"+
						"message: “Message three!”\n"+
						"}\n"+
						"}\n"+
						"})())\n"+
						"Which message will be returned by injecting this service and executing “myService.getMessage()”",
			options: ["1", "2", "3"],
			answer: 1
		}
	];
 
	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		},
		getQuestionsLength: function() {
			return questions.length;
		}
	};
});