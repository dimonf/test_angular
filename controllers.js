var GenJournal = angular.module('genJournal', []);

function journalRouteConfig($routeProvider){
		$routeProvider.
			when('/', {
					controller: ListController,
					templateUrl: 'list.html'
			}).
			when('/view/:id',{
					controller: DetailController,
					templateUrl: 'detail.html'
			}).
			otherwise({
					redirectTo: '/'
			});
}

GenJournal.config(journalRouteConfig);

function ListController($scope, Items){
	$scope.items = Items.query();
}

function DetailController($scope, Items, $routeParams) {
	items = Items.query();
	$scope.item = items[$routeParams.id];
}

GenJournal.factory('Items', function() {
	//factory pattern: p.47
	var items = {};
	items.query = function() {
			var vals = [];
			for (i=0; i<10; i++) {
				var item = get_item();
				item.id = i;
				vals.push(item);
			}
			return(vals);
	};
	return items;
	//
	//generate sample data
	function roundAmount(amount){
		//get nicely formatted 2 digits after decimal point
			return (Math.round(amount * 100) / 100);
	};
	function getR(max_val){
			return Math.ceil(Math.random() * max_val);
	};
	function getR2(max_val){
	//get random two-digits after decimal point number
			return roundAmount(Math.random() * max_val);
	};

	var today = new Date().toLocaleDateString();

	function get_item(){
		return({
				date: today, 
				account: [getR(24),getR(9)].join('.'), 
				curr: 'EUR', 
				amount: getR2(100),
				details: 'some details'
		});
	};
});


