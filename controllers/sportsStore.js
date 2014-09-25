angular.module("sportsStore")
.constant("dataUrl", "http://localhost/angularjs/src/model/products.php")
.constant("orderUrl", "http://localhost/angularjs/src/model/orders.php")
.controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {

	$scope.data = {};

	$http.get(dataUrl)
		 .success(function (data) {
		 	$scope.data.products = data;
		 })
		 .error(function (error) {
		 	$scope.data.error = error;
		 });

	$scope.sendOrder = function (shippingDetails) {
		var order = angular.copy(shippingDetails);
		order.products = cart.getProducts();
		$http.post(orderUrl, order)
			 .success(function (data) {
			 	//alert(data);
			 	$scope.data.orderId = data;
			 	cart.getProducts().length = 0;
			 })
			 .error(function (error) {
			 	$scope.data.orderError = error;
			 })
			 .finally(function () {
			 	$location.path("/complete")
			 });
	}

});