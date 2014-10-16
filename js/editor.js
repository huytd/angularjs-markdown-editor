var app = angular.module("markdownEditor", ['ngSanitize']);
app.controller("markdownEditorController", ["$scope", function ($scope) {
    document.getElementById("post-title").focus();

    $scope.editor = {
    	src: '',
    	parsed: ''
    };

    $scope.textChange = function() {
    	$scope.editor.parsed = marked($scope.editor.src);
    };

    $scope.onPublish = function() {
    	alert("Write your own publish script here!");
    };

    $scope.onEditor = function(param) {
    	var sel = $scope.getSelection();
    	switch(param) {
    		case "bold":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("**" + sel.text + "**", sel.start, sel.end);
    			} else {
    				// add new
    				$scope.insertPlacehodler("**bold**", 2, 2);
    			}
    			break;
    		case "italic":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("_" + sel.text + "_", sel.start, sel.end);
    			} else {
    				// add new
    				$scope.insertPlacehodler("_italic_", 1, 1);
    			}
    			break;
    		case "underline":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("<u>" + sel.text + "</u>", sel.start, sel.end);
    			} else {
    				// add new
    				$scope.insertPlacehodler("<u>underline</u>", 3, 4);
    			}
    			break;
    		case "list":
				sel.target.value += "\n";
				$scope.insertPlacehodler("- First item", 2, 0);
    			break;
    		case "list-2":
				sel.target.value += "\n";
				$scope.insertPlacehodler("1. First numbered item", 3, 0);
    			break;
    		case "header":
				sel.target.value += "\n";
				$scope.insertPlacehodler("# Header", 2, 0);
    			break;
    		case "url":
    			
    			var iUrl = prompt("Enter URL here:");
    			if (iUrl == "") {
    				iUrl = "http://codedaily.vn";
    			}
    			sel.target.value += "\n";
    			// insert new
    			var aUrl = "[text](" + iUrl + ")";
    			$scope.insertPlacehodler(aUrl, 1, iUrl.length + 3 );

    			break;
    		case "img":
    			
    			var iUrl = prompt("Enter image URL here:");
    			if (iUrl == "") {
    				iUrl = "http://codedaily.vn";
    			}
    			sel.target.value += "\n";
    			// insert new
    			var aUrl = "![image text](" + iUrl + ")";
    			$scope.insertPlacehodler(aUrl, 2, iUrl.length + 3 );

    			break;
    		case "code":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("`" + sel.text + "`", sel.start, sel.end);
    			} else {
    				// add new
    				sel.target.value += "\n";
    				$scope.insertPlacehodler("<pre class='brush: language'>code here</pre>", 19, 17);
    			}
    			break;
    		case "horline":
    			sel.target.value += "\n---";
    			sel.target.focus();
    			break;
    		case "quote":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("> " + sel.text, sel.start, sel.end);
    			} else {
    				// add new
    				$scope.insertPlacehodler("> quote", 2, 0);
    			}
    			break;
    		case "strikethrough":
    			if ($scope.hasSelection()) {
    				// enhance
    				$scope.insertText("~~" + sel.text + "~~", sel.start, sel.end);
    			} else {
    				// add new
    				$scope.insertPlacehodler("~~strikethrough~~", 2, 2);
    			}
    			break;
    	}
    };

    $scope.hasSelection = function() {
    	var ta = document.getElementById("mark-editor");
    	if (ta.selectionStart == ta.textLength) {
    		return false;
    	}
    	return true;
    };

    $scope.getSelection = function() {
    	var ta = document.getElementById("mark-editor");

    	return {
    		target: ta,
    		start: ta.selectionStart,
    		end: ta.selectionEnd,
    		text: ta.value.substring(ta.selectionStart, ta.selectionEnd)
    	};
    };

    $scope.insertPlacehodler = function(text, padLeft, padRight) {
    	var ta = document.getElementById("mark-editor");
    	ta.focus();
    	ta.value += text;
    	ta.selectionStart = ta.textLength - text.length + padLeft;
    	ta.selectionEnd = ta.textLength - padRight;

    };

    $scope.insertText = function(text, start, end) {
    	var ta = document.getElementById("mark-editor");
    	ta.focus();
    	var leftText = ta.value.substring(0, start);
    	var rightText = ta.value.substring(end);
    	ta.value = leftText + text + rightText;
    };

}]);