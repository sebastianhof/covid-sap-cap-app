namespace cap.covid.project;

using cuid from '@sap/cds/common';


type covid{
   ID : Integer;
   province : String;
   country  : String;
   latitude : Double;
   longitude : Double;
}

entity Deaths : cuid {
  covid_deaths : covid;
}

entity Recovered : cuid {
  covid_recovered : covid;
}

entity Confirmed : cuid {
  covid_confirmed : covid;
}