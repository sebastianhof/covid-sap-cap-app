using CovidService as service from '../../srv/covid-service';

annotate CovidService.DeathCases with {
    country @title:'Country';
	date @title:'Date';
}

annotate CovidService.DeathCases with @(

	UI: {
		SelectionFields: [ country, date ],
		
		HeaderInfo: {
			TypeName: 'Death Toll',
			Description: { Value: cases }
		},
	},


	UI: {
		LineItem: [
			{ Value: country, Label: 'Country' },
			{ Value: province, Label: 'Province/State' },
			{ Value: date, Label: 'Report Date' },
			{ Value: cases, Label: 'Death Toll' },
			{position: 20}
		]

	}	

);