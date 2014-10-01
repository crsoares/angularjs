angular.module("exampleApp", ["increment", "ngResource"])
.constant("baseUrl", "http://localhost/angularjs/src/model/products.php")
.controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {
	$scope.displayMode = "list";
	$scope.currentProduct = null;

	//$scope.productsResource = $resource(baseUrl + "?id=:id", { id: "@id" });
	$scope.productsResource = $resource(baseUrl + "?id=:id", { id: "@id" }, { create: { method: "POST" }, save: { method: "PUT" } });

	/*$scope.listProducts = function () {
		$http.get(baseUrl).success(function (data) {
			$scope.products = data;
		});
	}*/

	$scope.listProducts = function () {
		$scope.products = $scope.productsResource.query();
	}

	/*$scope.deleteProduct = function (product) {
		$http({
			method: "DELETE",
			url: baseUrl + "?id=" + product.id
		}).success(function (data) {
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	}*/

	$scope.deleteProduct = function (product) {
		product.$delete().then(function () {
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
		$scope.displayMode = "list";
	}

	/*$scope.createProduct = function (product) {
		$http.post(baseUrl, product).success(function (newProduct) {
			$scope.products.push(newProduct);
			$scope.displayMode = "list";
		});
	}*/

	$scope.createProduct = function (product) {
		new $scope.productsResource(product).$create().then(function(newProduct) {
			$scope.products.push(newProduct);
			$scope.displayMode = "list";
		});
	}

	/*$scope.updateProduct = function (product) {
		$http({
			url: baseUrl,
			method: "PUT",
			data: product
		}).success(function (modifiedProduct) {
			for (var i = 0; i < $scope.products.length; i++) {
				if ($scope.products[i].id == modifiedProduct.id) {
					$scope.products[i] = modifiedProduct;
					break;
				}
			}
			$scope.displayMode = "list";
		});
	}*/

	$scope.updateProduct = function (product) {
		product.$save();
		$scope.displayMode = "list";
	}

	/*$scope.editOrCreateProduct = function (product) {
		$scope.currentProduct = product ? angular.copy(product) : {};
		$scope.displayMode = "edit";
	}*/

	$scope.editOrCreateProduct = function (product) {
		$scope.currentProduct = product ? product : {};
		$scope.displayMode = "edit";
	}

	/*$scope.saveEdit = function (product) {
		if (angular.isDefined(product.id)) {
			$scope.updateProduct(product);
		} else {
			$scope.createProduct(product);
		}
	}*/

	$scope.saveEdit = function (product) {
		if (angular.isDefined(product.id)) {
			$scope.updateProduct(product);
		} else {
			$scope.createProduct(product);
		}
	}

	/*$scope.cancelEdit = function () {
		$scope.currentProduct = {};
		$scope.displayMode = "list";
	}*/

	$scope.cancelEdit = function () {
		if ($scope.currentProduct && $scope.currentProduct.$get) {
			$scope.currentProduct.$get();
		}
		$scope.currentProduct = {};
		$scope.displayMode = "list";
	}

	$scope.listProducts();
});