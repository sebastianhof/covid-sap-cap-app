namespace cap.covid;

using { cuid } from '@sap/cds/common';

entity ConfirmedCases {
  Key ID: String;
  province : String;
  country  : String;
  latitude : Double;
  longitude : Double;
  cases: Integer;
  date: Date;
}

entity DeathCases {
  Key ID: String;
  province : String;
  country  : String;
  latitude : Double;
  longitude : Double;
  cases: Integer;
  date: Date;
}

entity RecoveredCases {
  Key ID: String;
  province : String;
  country  : String;
  latitude : Double;
  longitude : Double;
  cases: Integer;
  date: Date;
}