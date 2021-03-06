(function() {
	function SeptaFareFormController(septaFareService) {
		var self = this;

		self.info = {};
		self.zones = [];

		//Object to track current fare info based on form inputs.
		self.fare = {
			zone: -1,
			type: '',
			location: '',
			trips: 0,
			total: undefined
		};

		//Array of fare usage time types.
		self.types = {
			'Weekday': 'weekday',
			'Evening / Weekend': 'evening_weekend',
			'Anytime': 'anytime'
		};

		//Fetch fare data using promise from Septa fare service.
		septaFareService.query().then(function(d) {
			self.info = d.data.info;
			self.zones = d.data.zones;
		});

		//Calculate current fare cost based on form inputs.
		self.calculateFare = function() {
			var faresIndex,
			fareObj = self.fare;
			zoneIndex = parseInt(fareObj.zone - 1);

			//Find the index of the correct fare data using the type and location input values.
			switch (fareObj.type) {
				case 'weekday':
					fareObj.location === 'advance_purchase' ? faresIndex = 0 : faresIndex = 1;
					break;
				case 'evening_weekend':
					fareObj.location === 'advance_purchase' ? faresIndex = 2 : faresIndex = 3;
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
				if(findex === -1 || zindex < 0 || fareObj.location.length < 1 ||
						fareObj.trips < 1 ) {
					fareObj.total = (0).toFixed(2);
					return;
				}

				var totalQuantity,
				tripsInt = parseInt(fareObj.trips),
				fareDataObj= self.zones[zindex].fares[findex];

				/*console.log(tripsInt);
				console.log(fareDataObj);*/

				if(fareDataObj.trips === 10) {
					//Ensure that anytime tickets are sold in packs of 10.
					tripsInt > 10 ? totalQuantity = Math.floor(tripsInt / 10) : totalQuantity = 1;
				} else {
					totalQuantity = tripsInt || 0;
				}

				fareObj.total = (totalQuantity * fareDataObj.price).toFixed(2);

			})(zoneIndex, faresIndex);
		};

		//Calcuate trip fare when controller is initialized.
		self.$onInit = self.calculateFare;
		
	}

	angular.module('septaFareApp')
		.component('septaFareForm', {
			templateUrl: 'septaFareForm.html',
			controller: SeptaFareFormController
		});
}());