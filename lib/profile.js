/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  // TODO: Fix all this
  
  var profile = {};
  profile.id = String(json.sub || json.id);
  profile.displayName = json.name;
  
  if (json.given_name || json.family_name) {
    profile.name = {
      givenName: json.given_name,
      familyName: json.family_name
    }
  }
  
  profile.username = json.preferred_username; //json.login;
  profile.profileUrl = json.html_url;
  if (json.email) {
    profile.emails = [{ value: json.email }];
  }
  
  
  if (!profile.displayName && profile.name) {
    profile.displayName = profile.name.givenName + ' ' + profile.name.familyName;
  }
  
  return profile;
};
