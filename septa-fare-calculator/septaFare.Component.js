(function() {
	function (septaFareService) {
		var ctrl = this;
		
		//Fetch fare data using promise from Septa fare service.
		septaFareService.query().then(function(d) {
			ctrl.fareData = d.data;
		});
	}

	angular.module('septaFareApp', [])
		.component('septaFareFormComponent', {
			bindings: {},
			templateUrl: '/septaFareForm.html',
			controller: SeptaFareFormController
		});
}());