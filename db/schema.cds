namespace cap.covid;
//type TotalCases : Integer;
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

/* entity AggregatedCovidCases as 
SELECT FROM ConfirmedCases as C
FULL OUTER JOIN RecoveredCases as R
ON C.country = R.country AND C.province = R.province AND C.date = R.date
FULL OUTER JOIN DeathCases as D
ON C.country = D.country AND C.province = D.province AND C.date = R.date {
  key C.ID: String,
  C.province as Province,
  C.country as Country,
  //SUM (C.cases) as Cases,
  C.date as ReportDate,
  C.cases as Confirmed,
  R.cases as Recovered,
  D.cases as Deaths 
}; */

entity AggregatedCovidCases as 
SELECT 
key x.ID as ID,
x.Recovered as Recovered, 
x.Deaths as Deaths, 
x.RProvince as Province, 
x.RCountry as Country, 
x.RDate as ReportDate, 
C.cases as Confirmed
//SUM(x.Recovered,x.Deaths,C.cases) as TotalCases : Integer
FROM
(SELECT
FROM RecoveredCases as R
INNER JOIN DeathCases as D
ON R.country = D.country AND R.province = D.province AND R.date = D.date{
  key R.ID: String,
  R.province as RProvince,
  R.country as RCountry,
  R.date as RDate,
  R.cases as Recovered,
  D.cases as Deaths
}) as x

INNER JOIN

(SELECT FROM ConfirmedCases)as C
ON
x.RCountry = C.country AND x.RProvince = C.province AND x.RDate = C.date;