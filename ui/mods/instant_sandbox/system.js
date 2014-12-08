define(['instant_sandbox/planet'], function(planet) {
  "use strict";

  var userSystems = ko.observableArray([]).extend({ db: { local_name: 'systems', db_name: 'misc' }});

  var systemWithName = function(name) {
    for (var i = 0;i < userSystems().length;i++) {
      if (userSystems()[i].name == name) {
        return userSystems()[i]
      }
    }
    return null
  }

  var waitForPlanetToLoad = function (planet_spec) {
    var deferred = $.Deferred();

    UberUtility.waitForAttributeLoad(planet_spec, 'csg_key', 'planetCSG', constants.PLANET_CSG_DATABASE).then(function (first) {
      UberUtility.waitForAttributeLoad(first, 'metal_spots_key', 'metal_spots', constants.PLANET_METAL_SPOTS_DATABASE).then(function (second) {
        UberUtility.waitForAttributeLoad(second, 'landing_zones_key', 'landing_zones', constants.PLANET_LANDING_ZONES_DATABASE).then(function (third) {
          deferred.resolve(third);
        });;
      });
    });

    return deferred.promise();
  };

  var waitForSystemToLoad = function (system) {
    var deferred = $.Deferred();
    var array = _.map(system.planets, waitForPlanetToLoad);

    UberUtility.waitForAll(array).then(function (results) {
      system.planets = results;

      deferred.resolve(system);
    });

    return deferred.promise();
  };


  return {
    convertClientToServer: function(system) {
      system.planets.forEach(planet.convertClientToServer)
    },
    convertServerToClient: function(system) {
      system.planets.forEach(planet.convertServerToClient)
    },
    loadSystem: function(name) {
      var system = systemWithName(name)
      if (system) {
        return waitForSystemToLoad(system)
      } else {
        return $.Deferred().reject().promise()
      }
    }
  }
})
