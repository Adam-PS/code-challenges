(function() {
	//Create http service that returns promise for retreiving fare data.
	angular.module('septaFareApp')
		.factory('septaFareService', ['$http', function($http) {
			return {
				query: function() {
					return $http.get('/fares.json');
				}
			};
		}]);
}());