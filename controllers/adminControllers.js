angular.module("sportsStoreAdmin")
.constant("authUrl", "http://localhost/angularjs/src/model/login.php")
.constant("ordersUrl", "http://localhost/angularjs/src/model/orders.php")
.controller("authCtrl", function ($scope, $http, $location, authUrl) {

	$scope.authenticate = function (user, pass) {
		$http.post(authUrl, { username: user, password: pass }, { withCredentials: true })
		.success(function (data) {
			$location.path("/main")
		}).error(function (error) {
			$scope.authenticationError = error;
		});
	}

})
.controller("mainCtrl", function ($scope) {

	$scope.screens = ["Products", "Orders"];
	$scope.current = $scope.screens[0];

	$scope.setScreen = function (index) {
		$scope.current = $scope.screens[index];
	};

	$scope.getScreen = function () {
		return $scope.current == "Products" ? "/angularjs/views/adminProducts.html" : "/angularjs/views/adminOrders.html";
 	}

})
.controller("ordersCtrl", function ($scope, $http, ordersUrl) {

	$http.get(ordersUrl, {withCredentials: true})
		 .success(function (data) {
		 	$scope.orders = data;
		 })
		 .error(function (error) {
		 	$scope.error = error;
		 });

	$scope.selectedOrder;

	$scope.selectOrder = function (order) {
		$scope.selectedOrder = order;
		/*$scope.selectedOrder.products = JSON.parse($scope.selectedOrder.products);*/
		alert($scope.selectedOrder.products);
	};

	$scope.calcTotal = function (order) {
		var total = 0;
		for (var i = 0; i < order.products.length; i++) {
			total += order.products[i].count * order.products[i].price;
		}
		return total;
	}

});