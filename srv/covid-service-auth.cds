using { CovidService } from './covid-service';
annotate CovidService with @(requires: 'authenticated-user');
 
annotate CovidService with @(restrict: [
  { grant: ['READ'], to: 'Viewer' },
]);