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
      notz: "="
    },
    restrict: 'E',
    templateUrl: 'templates/datetimezone.tpl.html',
    link: function(scope) {

      scope.timezones = moment.tz.names();
      scope.timezone = {};

      scope.datemodel = {};

      if(scope.defaulttimezone) {
        scope.timezone.selected = scope.defaulttimezone;
      } else {
        scope.timezone.selected = 'Europe/Berlin';
      }

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
        if(newVal) {
          var mydate = scope.tzdate.clone();
          mydate.date(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.month(scope.datemodel.month);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.month', function(newVal) {
        if(newVal) {
          var mymonth = newVal;
          var mydate = scope.tzdate.clone();
          mydate.month(mymonth);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.year', function(newVal) {
        if(newVal) {
          var mydate = scope.tzdate.clone();
          mydate.year(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.hour', function(newVal) {
        if(newVal !== undefined) {
          var myhour = newVal;
          var mydate = scope.tzdate.clone();
          mydate.hour(myhour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('datemodel.minute', function(newVal) {
        if(newVal !== undefined) {
          var mydate = scope.tzdate.clone();
          mydate.minute(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('timezone.selected', function(newVal) {
        if(newVal && scope.tzdate) {
          var mydate = scope.tzdate.clone();
          mydate.tz(newVal);
          mydate.hour(scope.datemodel.hour);
          mydate.minute(scope.datemodel.minute);
          mydate.date(scope.datemodel.day);
          mydate.month(scope.datemodel.month);
          mydate.year(scope.datemodel.year);
          scope.tzdate = mydate;
        }
      });

      scope.$watch('tzdate', function(newVal) {
        if(newVal !== undefined) {
          if(newVal && newVal.toString()) {
            if(scope.initial) {
              scope.datemodel.hour = newVal.hour();
              scope.datemodel.minute = newVal.minute();
              scope.datemodel.day = newVal.date();
              scope.datemodel.month = newVal.month();
              scope.datemodel.year = newVal.year();
              scope.initial = false;
            }

            if(scope.model) {
              scope.model = new Date(newVal.toISOString());
            }
          }
        }
      });

      scope.$watch('model', function(newVal) {
        if(!scope.tzdate) {
          scope.initial = true;
          var newmom;
          if(newVal) {
            newmom = moment(newVal);
          } else {
            newmom = moment(new Date());
          }

          if(scope.timezone &&scope.timezone.selected) {
            scope.tzdate = newmom.tz(scope.timezone.selected);
          } else if(scope.defaulttimezone) {
            scope.tzdate = newmom.tz(scope.defaulttimezone);
          }
        }
      });
    }
  };
});
