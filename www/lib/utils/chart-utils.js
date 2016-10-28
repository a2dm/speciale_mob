angular.module('chart.utils', [])

.factory('$chartUtils', function() {	
  
	return {
		
		columnChart : function(xAxisLabel, yAxisLabel) {
			return {
			          options: {
			              chart: {
			                  type: 'column'
			              },
			              plotOptions: {
						    series: {
						    	stacking: 'normal'
						      }
						  },
			              tooltip: {
			                pointFormat: '<span>{series.name}</span>: <b>{point.y}</b>'
			              },
			              yAxis: {
				          	title: {
				            	text: yAxisLabel
				            }
				          }
			          },
			          series: [],
			          title: {
			              text: ''
			          },
			          xAxis: {
			          	title: {
                			text: xAxisLabel
            			},
			            categories: [],
			          },
			          credits: {
			            enabled: false
			          },
			          loading: true,
			          size: {}
		      		};
		}

	}

})