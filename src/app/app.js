angular.module( 'ngDatetimezone', [
  'ui.bootstrap',
  'ngDatetime-templates-app',
  'ngDatetime-templates-common',
  'ui.select',
  'ngSanitize'
])
.directive('dateTimeZone', function() {
  return {
    scope: {
      model: "=widgetmodel",
      defaulttimezone: "=",
      dateonly: "=",
      timeonly: "=",
      notz: "=",
      tzmodel: "="
    },
    restrict: 'E',
    templateUrl: 'templates/datetimezone.tpl.html',
    link: function(scope) {

      scope.checkDate = new Date();

      scope.timezones = moment.tz.names();
      scope.timezone = {};

      scope.datemodel = {};

      scope.$watch('defaulttimezone', function(newVal) {
        if(scope.defaulttimezone && !scope.timezone.selected) {
          scope.timezone.selected = scope.defaulttimezone;
        } else if(!scope.timezone.selected){
          scope.timezone.selected = 'Europe/Berlin';
        }
      });
      scope.enabled = {};
      scope.enabled.time = true;
      scope.enabled.date = true;
      scope.enabled.tz = true;

      if(scope.dateonly) {
        scope.enabled.time = false;
        scope.enabled.date = true;
        scope.enabled.tz = true;
      }

      if(scope.timeonly) {
        scope.enabled.date = false;
        scope.enabled.time = true;
        scope.enabled.tz = true;
      }

      if(scope.notz) {
        scope.enabled.tz = false;
      }

      scope.$watch('datemodel.day', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var mydate = scope.tzdate.clone();
          mydate.date(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.month(scope.datemodel.month-1);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.month', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var mymonth = newVal;
          var mydate = scope.tzdate.clone();
          mydate.month(mymonth-1);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.year', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var mydate = scope.tzdate.clone();
          mydate.year(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month-1);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.hour', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var myhour = newVal;
          var mydate = scope.tzdate.clone();
          mydate.hour(myhour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month-1);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.minute', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var mydate = scope.tzdate.clone();
          mydate.minute(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month-1);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('timezone.selected', function(newVal) {
        if(newVal !== undefined && scope.tzdate) {
          var mydate = scope.tzdate.clone();
          mydate.tz(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month-1);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('tzdate', function(newVal) {
        if(newVal !== undefined) {
          if(newVal && newVal.toString()) {
            if(scope.model) {
              var d = new Date(newVal.toString());
              scope.checkDate = d;
              scope.model = d;
            }
          }
        }
      });

      scope.$watch('model', function(newVal) {
        if(newVal && scope.checkDate.toString() != newVal.toString()) {
          if(newVal) {
            newmom = moment(newVal);
          } else {
            newmom = moment(new Date());
          }

          if(scope.tzmodel) {
            scope.timezone.selected = scope.tzmodel;
          }


          var newtzdate;
          if(scope.timezone &&scope.timezone.selected) {
            newtzdate = newmom.tz(scope.timezone.selected);
          } else if(scope.defaulttimezone) {
            newtzdate = newmom.tz(scope.defaulttimezone);
          }

          scope.datemodel.hour = newtzdate.hour();
          scope.datemodel.minute = newtzdate.minute();
          scope.datemodel.day = newtzdate.date();
          scope.datemodel.month = newtzdate.month() +1;
          scope.datemodel.year = newtzdate.year();

          scope.tzdate = newtzdate;

        }
      });
    }
  };
});
