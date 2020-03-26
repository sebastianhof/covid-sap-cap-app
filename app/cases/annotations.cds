using CovidService as service from '../../srv/covid-service';

annotate CovidService.AggregatedCovidCases with {
    Country @title:'Country';
	ReportDate @title:'Date';
}

annotate CovidService.AggregatedCovidCases with @(
		UI: {
		chart: [
		{title: 'Corona Cases per Country'},
		{description: 'Line-chart displaying the Cases as per Country'},
		{chartType: #BAR},
		{dimensions: [ 'Country' ]},	
		{measures: [ 'Confirmed', 'Recovered','Deaths']},
		{dimensionAttributes: [{
        dimension: 'Country',
        role: #CATALOG}],
		measureAttributes: [{
        measure: 'Confirmed',
        role: #CATALOG
    }]},
		{qualifier: 'CoronaCasesQualifier'}	
		]

	}
	
);


annotate CovidService.AggregatedCovidCases with @(

	UI: {
		SelectionFields: [ Country, ReportDate ],
		
		HeaderInfo: {
			TypeName: 'ConfirmedCases',
			TypeNamePlural: 'Cases',
			Description: { Value: cases }
		},
	},


	UI: {
		LineItem: [
			{ Value: Country, Label: 'Country' },
			{ Value: Province, Label: 'Province/State' },
			{ Value: ReportDate, Label: 'Report Date' },
			{ Value: Confirmed, Label: 'Confirmed Cases' },
			{ Value: Recovered, Label: 'Recovered Cases' },
			{ Value: Deaths, Label: 'Deaths Cases' },
			{position: 20}
		]

	}	

);