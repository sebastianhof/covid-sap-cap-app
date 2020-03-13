/* annotate CovidService.ConfirmedCases with {

	//province @title:'Province';
    country @title:'Country';
    //cases @title:'Cases';
	date @title:'Date';

}

//annotate CovidCasesService.ConfirmedCases with @UI.SelectionFields: [country];
// Annotation for Confimed Cases UI
annotate CovidService.ConfirmedCases with @(

	UI: {
		SelectionFields: [ country, date ],
		LineItem: [
			{ Value: country, Label: 'Country' },
			{ Value: province, Label: 'Province/State' },
			{ Value: cases, Label: 'Number of Cases' },
			{ Value: date, Label: 'Report Date' }
		],
		HeaderInfo: {
			TypeName: 'ConfirmedCases',
			TypeNamePlural: 'Confirmed Cases',
			Description: { Value: cases }
		},
        GeoLocationType: {
            Latitude: {Value: latitude},
            Longitude: {Value: longitude},
            Location: {Value: province}
        }
        
	}

); */

annotate CovidService.AggregatedCovidCases with {

	//province @title:'Province';
    Country @title:'Country';
    //cases @title:'Cases';
	ReportDate @title:'Date';

}

annotate CovidService.AggregatedCovidCases with @(

	UI: {
		SelectionFields: [ Country, ReportDate ],
		chart: [
		{title: 'Corona Cases per Country'},
		{description: 'Line-chart displaying the Cases as per Country'},
		{chartType: #BAR},
		{dimensions: [ 'Country' ]},	
		{measures: [ 'Confirmed', 'Recovered','Deaths']},
		{position:10}		
		],
		LineItem: [
			{ Value: Country, Label: 'Country' },
			{ Value: Province, Label: 'Province/State' },
			//{ Value: Cases, Label: 'Total Cases' },
			{ Value: ReportDate, Label: 'Report Date' },
			{ Value: Confirmed, Label: 'Confirmed Cases' },
			{ Value: Recovered, Label: 'Recovered Cases' },
			{ Value: Deaths, Label: 'Deaths Cases' },
			{position: 20}
		],
		HeaderInfo: {
			TypeName: 'ConfirmedCases',
			TypeNamePlural: 'Confirmed Cases',
			Description: { Value: cases }
		},
/*         GeoLocationType: {
            Latitude: {Value: latitude},
            Longitude: {Value: longitude},
            Location: {Value: province}
        } */
        
	}

);