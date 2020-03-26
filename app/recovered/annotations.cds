using CovidService as service from '../../srv/covid-service';

annotate CovidService.RecoveredCases with {
    country @title:'Country';
	date @title:'Date';
}

annotate CovidService.RecoveredCases with @(

	UI: {
		SelectionFields: [ country, date ],
		
		HeaderInfo: {
			TypeName: 'Recovered Case',
            TypeNamePlural: 'Recovered Cases',
			Description: { Value: cases }
		},
	},


	UI: {
		LineItem: [
			{ Value: country, Label: 'Country' },
			{ Value: province, Label: 'Province/State' },
			{ Value: date, Label: 'Report Date' },
			{ Value: cases, Label: 'Recovered Cases' },
			{position: 20}
		]

	}	

);