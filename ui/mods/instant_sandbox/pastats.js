define([], function() {
  if (window['paStatsGlobal'] == undefined) {
    return {
      setLobby: function(lobbyId) {},
      setSystem: function(system) {},
      setArmies: function(armies) {},
      setPlayer: function(index) {},
    }
  }

  console.log('Instant Sandbox: using PAStats setup') 

  var rgb = function(triple) {
    if (triple == undefined) return ""
    return "rgb("+triple[0]+","+triple[1]+","+triple[2]+")"
  }

  return {
    setLobby: function(lobbyId) {
      localStorage['lobbyId'] = encode(lobbyId);
      localStorage[paStatsGlobal.isRankedGameKey] = encode(false);
    },
    setSystem: function(system) {
      localStorage['pa_stats_loaded_planet_json'] = JSON.stringify(system);
    },
    setArmies: function(armies) {
      var teams = []
      armies.forEach(function(army, index) {
        teams.push({
          index: index,
          players: army.ai ? [{displayName: 'AI'}] : [],
          primaryColor: '',
          secondaryColor: ''
        })
      })
      localStorage[paStatsGlobal.pa_stats_session_teams] = encode(teams);
    },
    setPlayer: function(index, player) {
      localStorage[paStatsGlobal.pa_stats_session_team_index] = encode(index);

      var teams = decode(localStorage[paStatsGlobal.pa_stats_session_teams])
      teams[index].primaryColor = rgb(player.color[0])
      teams[index].secondaryColor = rgb(player.color[1])
      teams[index].players = [{displayName: player.name}],
      //console.log(teams)
      localStorage[paStatsGlobal.pa_stats_session_teams] = encode(teams);
    },
  }
})
