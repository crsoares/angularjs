angular.module("sportsStore")
.controller("sportsStoreCtrl", function ($scope) {

	$scope.data = {
		products: [
			{ name: "Product #1", description: "Um produto", category: "Category #1", price: 100 },
			{ name: "Product #2", description: "Um produto", category: "Category #1", price: 110 },
			{ name: "Product #3", description: "Um produto", category: "Category #2", price: 210 },
			{ name: "Product #4", description: "Um produto", category: "Category #3", price: 201 }]
	}

});