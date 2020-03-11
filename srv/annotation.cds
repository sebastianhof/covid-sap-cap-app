annotate CovidCasesService.ConfirmedCases with {
	//province @title:'Province';
    country @title:'Country';
    //cases @title:'Cases';

}

//annotate CovidCasesService.ConfirmedCases with @UI.SelectionFields: [country];
// Annotation for Confimed Cases UI
annotate CovidCasesService.ConfirmedCases with @(

	UI: {
		SelectionFields: [ country ],
		LineItem: [
			{ Value: province, Label: 'Province/State' },
			{ Value: cases, Label: 'Number of Cases' },
			{ Value: date, Label: 'Recent Date' }
		],
		HeaderInfo: {
			TypeName: 'ConfirmedCases',
			TypeNamePlural: 'Confirmed Cases',
			Description: { Value: cases }
		}
        
	}

);