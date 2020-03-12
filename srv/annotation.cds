annotate CovidService.ConfirmedCases with {
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

);