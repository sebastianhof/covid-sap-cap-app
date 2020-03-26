using CovidService as service from '../../srv/covid-service';

annotate CovidService.ConfirmedCases with {
    country @title:'Country';
	date @title:'Date';
}

annotate CovidService.ConfirmedCases with @(

	UI: {
		SelectionFields: [ country, date ],
		
		HeaderInfo: {
			TypeName: 'Confirmed Case',
            TypeNamePlural: 'Confirmed Cases',
			Description: { Value: cases }
		},
	},


	UI: {
		LineItem: [
			{ Value: country, Label: 'Country' },
			{ Value: province, Label: 'Province/State' },
			{ Value: date, Label: 'Report Date' },
			{ Value: cases, Label: 'Confirmed Cases' },
			{position: 20}
		]

	}	

);