(function() {
	function (septaFareService) {
		var self = this;

		self.formData = {};

		//Object to track current fare info based on form inputs.
		self.fare = {
			zone: '',
			type: '',
			location: '',
			trips: '',
			total: ''
		};

		//Array of fare usage time types.
		self.types = [
			{ name: 'Weekday', value: 'weekday' },
			{ name: 'Evening / Weekend', value: 'evening_weekend' },
			{ name: 'Anytime', value: 'anytime' }
		];

		//Fetch fare data using promise from Septa fare service.
		septaFareService.query().then(function(d) {
			self.formData = {
				info: d.data.info,
				zones: d.data.zones
			};
		});

		//Calculate current fare cost based on form inputs.
		self.calculateFare = function() {
			var faresIndex,
			var zoneIndex = parseInt(fare.zone - 1);

			//Find the index of the correct fare data using the type and location input values.
			switch (fare.type) {
				case 'weekday':
					fare.location = 'advance_purchase' ? faresIndex = 0 : faresIndex = 1;
					break;
				case 'evening_weekend':
					fare.location = 'advance_purchase' ? faresIndex = 2 : faresIndex = 3;
					break;
				case 'anytime':
					faresIndex = 4;
					break;
				default:
					faresIndex = -1;
			}

			//calcuate and set the total fare in the fare object.
			(function(zindex, findex) {
				//In the case that the form inputs are empty set the value of the fare to zero.
				if(index === -1) {
					fare.total = 0;
				}

				var totalQuantity;
				var tripsInt = parseInt(fare.trips);
				var fareDataObj= formData.zones[zindex].fares[findex]

				if(fareDataObj.trips === 10) {
					//Ensure that anytime tickets are sold in packs of 10.
					tripsInt > 10 ? totalQuantity = Math.floor(tripsInt / 10) : totalQuantity = 1;
				} else {
					totalQuantity = tripsInt;
				}

				fare.total = (totalQuantity * fareDataObj.price).toFixed(2);

			})(zoneIndex, faresIndex);
		};
	}

	angular.module('septaFareApp', [])
		.component('septaFareFormComponent', {
			templateUrl: '/septaFareForm.html',
			controller: SeptaFareFormController
		});
}());