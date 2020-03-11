namespace cap.covid.project;

using cuid from '@sap/cds/common';


entity covid: cuid {
   province : String;
   country  : String;
   latitude : Double;
   longitude : Double;
   cases: Integer;
   date: Date;
}

entity DeathCases : covid {

}

entity RecoveredCases : covid {

}

entity ConfirmedCases : covid {

}