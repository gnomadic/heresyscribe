var parseString = require("xml2js").parseString;
// const { profileEnd } = require("console");
// var fs = require("fs");
// const { parse } = require("path");
// const { json } = require("stream/consumers");
var JSZip = require("jszip");

export async function unarchive(f, done) {
  JSZip.loadAsync(f).then(
    function (zip) {
      zip.forEach(async function (relativePath, zipEntry) {
        Object.keys(zip.files).forEach(function (filename) {
          zip.files[filename].async("string").then(function (fileData) {
            done(fileData);
          });
        });
      });
    },
    function (e) {
      console.log(f.name + ": " + e.message);
    }
  );
}

export function prepXML(fileData, done) {
  loadXML(fileData, (json) => {
    let flat = flattenJSON(json);

    done(flat);
  });
}

function flattenJSON(fileData) {
  let flatForces = [];

  for (const force of fileData) {
    // console.log("Force");
    // console.log("well " + Object.keys(force));
    // console.log(JSON.stringify(force.models, null, 2));
    let flatForce = {
      displayName: force.displayName,
      globalRules: [],
      units: [],
    };

    for (const unit of force.units) {
      let flatUnit = {
        displayName: unit.displayName,
        rules: [],
        allProfiles: [],
        weaponProfiles: [],
        modelProfiles: [],
        wargearProfiles: [],
      };

      // look for rules everywhere LOL
      for (const upgrade of unit.upgrades) {
        flattenRules(upgrade, flatUnit);
        upgrade.upgrades?.forEach((up) => {
          flattenRules(up, flatUnit);
        });
      }
      flattenRules(unit, flatUnit);
      unit.model?.forEach((model) => {
        flattenRules(model, flatUnit);
        model.upgrades?.forEach((upgrade) => {
          flattenRules(upgrade, flatUnit);
          upgrade.upgrades?.forEach((up) => {
            flattenRules(up, flatUnit);
          });
        });
      });
      // end rules

      //look got profiles everywhere
      for (const upgrade of unit.upgrades) {
        flattenProfiles(upgrade, flatUnit);
        upgrade.upgrades?.forEach((up) => {
          flattenProfiles(up, flatUnit);
        });
      }
      flattenProfiles(unit, flatUnit);
      unit.model?.forEach((model) => {
        flattenProfiles(model, flatUnit);
        model.upgrades?.forEach((upgrade) => {
          flattenProfiles(upgrade, flatUnit);
          upgrade.upgrades?.forEach((up) => {
            flattenProfiles(up, flatUnit);
          });
        });
      });
      for (const model of unit.model) {
        model.upgrades?.forEach((upgrade) => {
          flattenProfiles(upgrade, flatUnit);
        });
      }
      //end profiles

      // let profileSet = new Set();
      // flatUnit.allProfiles.forEach((profile) => {
      //   profileSet.add(profile.name);
      // });

      //remove dupe profiles
      flatUnit.allProfiles = flatUnit.allProfiles.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          flatUnit.allProfiles.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });

      //remove dupe rules
      flatUnit.rules = flatUnit.rules.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          flatUnit.rules.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });

      // console.log("profileSet", profileSet);

      // flatUnit.allProfiles =
      // const names = flatUnit.allProfiles.map((o) => o.name);
      // console.log("names", names);
      // const filtered = flatUnit.allProfiles.filter(
      //   ({ id }, index) => !names.includes(id, index + 1)
      // );
      // console.log("filtered", filtered);

      // const filtered = flatUnit.allProfiles.filter(
      //   ({ id }, index) => !ids.includes(id, index + 1)
      // );

      //split up profiles based arbitrary things
      flatUnit.allProfiles.forEach((profile) => {
        // if (profile.stats[0].name === "Unit Type") {
        //      if (profile.stats[0].value === "Vehicle") {
        //    flatUnit.vehi
        //      } else {
        //   flatUnit.modelProfiles.push(profile);
        //      }
        // }
        if (profile.stats[0].name === "Unit Type") {
          //also remove unit type, it's long and not really useful?
          profile.stats = profile.stats.filter(
            (item) => item.name !== "Unit Type"
          );

          flatUnit.modelProfiles.push(profile);
        } else if (profile.stats.length === 4) {
          flatUnit.weaponProfiles.push(profile);
        } else if (profile.stats.length === 1) {
          flatUnit.wargearProfiles.push(profile);
        }
      });
      delete flatUnit.allProfiles;

      //end split up profiles

      flatForce.units.push(flatUnit);
    }

    flatForces.push(flatForce);
  }

  return flatForces;
}

function flattenRules(selection, parent) {
  selection.rules?.forEach((rule) => {
    let newRule = {
      name: rule.name,
      description: rule.description[0],
    };
    parent.rules.push(newRule);
  });
}

function flattenProfiles(selection, parent) {
  selection.profile?.forEach((profile) => {
    let newProfile = {
      name: profile.name,
      stats: profile.stats,
    };
    parent.allProfiles.push(newProfile);
  });
}

function flattenWeapons(selection, parent) {}

function flattenWarGear(selection, parent) {}

//--------------------------------

function loadXML(fileData, done) {
  let usefulData = [];
  parseString(fileData, function (err, result) {
    var forces = result.roster.forces[0].force;

    //load up all forces
    forces.forEach((force) => {
      //each force has selections - which are upgrades, models, or units
      let currentForce = {
        displayName: force.$.catalogueName,
        models: [],
        units: [],
        upgrades: [],
      };
      //iterate through a given forces selections, which are one of the three types
      force.selections[0].selection.forEach((forceSelection) => {
        if (forceSelection.$.type === "upgrade") {
          //first check for upgrades
          let upgrade = parseUpgrade(forceSelection);
          currentForce.upgrades.push(upgrade);
        } else if (forceSelection.$.type === "model") {
          //then check for models
          let model = parseModel(forceSelection);
          currentForce.units.push(model);
        } else if (forceSelection.$.type === "unit") {
          //then check for units
          let unit = parseUnit(forceSelection);
          currentForce.units.push(unit);
        }
      });
      usefulData.push(currentForce);
    });
    // console.log(JSON.stringify(usefulData, null, 2));

    done(usefulData);
  });
  // });
}

function parseUpgrade(selection) {
  //   console.log(JSON.stringify(selection, null, 2));
  //   console.log(Object.keys(selection));
  let upgrade = {
    displayName: selection.$.name,
    rules: [],
    upgrades: [],
    selections: [],
    profile: [],
  };

  //   console.log("----");
  //   console.log(Object.keys(selection));
  if (selection.rules !== undefined) {
    selection.rules.forEach((rule) => {
      let curRule = parseRule(rule);
      curRule.forEach((element) => {
        upgrade.rules.push(element);
      });
    });
  }
  if (selection.profiles !== undefined) {
    selection.profiles.forEach((profile) => {
      let curProfile = parseProfile(profile);
      curProfile.forEach((element) => {
        upgrade.profile.push(element);
      });
    });
  }
  if (selection.selections !== undefined) {
    selection.selections.forEach((grandchild) => {
      let wat = parseSelections(grandchild);
      //   console.log("xxxxx");
      //   console.log("wat t: " + JSON.stringify(wat, null, 2));
      //   console.log("xxxxx");

      wat.upgrades.forEach((up) => {
        upgrade.upgrades.push(up);
      });
      //   upgrade.upgrades.concat(wat.upgrades);
      //   upgrade.selections.concat(wat);

      //   console.log("wat: " + Object.keys(grandchild.selection));
      //   console.log("wat: " + Object.keys(grandchild));
      //   if (grandchild.selection.$.type === "upgrade") {
      //     let upgrade = parseUpgrade(grandchild);
      //     upgrade.upgrades.push(model);
      //   }
    });
  }

  //   console.log(JSON.stringify(upgrade, null, 2));

  return upgrade;
}

function parseModel(selection) {
  let model = {
    displayName: selection.$.name,
    rules: [],
    upgrades: [],
    wargear: [],
    profile: [],
    model: [],
    flatRules: [],
  };

  //   console.log(Object.keys(selection));

  //   console.log(selection.profiles);
  if (selection.profiles !== undefined) {
    selection.profiles.forEach((profile) => {
      // console.log("model profile");
      let modelProfile = parseProfile(profile);
      modelProfile.forEach((element) => {
        model.profile.push(element);
      });
    });
  }

  if (selection.rules !== undefined) {
    // console.log("model rule");
    selection.rules.forEach((rule) => {
      //   console.log("model rules");
      let modelRules = parseRule(rule);
      modelRules.forEach((element) => {
        model.rules.push(element);
      });
      //   model.rules.concat(parseRule(rule));
    });
  }

  if (selection.selections !== undefined) {
    selection.selections.forEach((child) => {
      // console.log(Object.keys(child.selection));
      if (child["model"] !== undefined) {
        // console.log("model root found");
      }

      child.selection.forEach((grandchild) => {
        if (grandchild.$.type === "upgrade") {
          // console.log("upgrade");
          model.upgrades.push(parseUpgrade(grandchild));
        } else if (grandchild.$.type === "model") {
          // console.log("model");
          model.model.push(parseModel(grandchild));
        } else if (grandchild.$.type === "unit") {
          // console.log("unit");
        } else if (grandchild.$.type === "wargear") {
          // console.log("wargear");
        }
        //   child.profiles.forEach((profile) => {
        //     console.log("profile");
        //   });

        //   console.log(Object.keys(grandchild));
      });
      // console.log(JSON.stringify(child, null, 2));
      // console.log("wat");
    });
  }

  //   console.log(JSON.stringify(model, null, 2));
  return model;
}

function parseUnit(selection) {
  let unit = {
    displayName: selection.$.name,
    rules: [],
    upgrades: [],
    wargear: [],
    profile: [],
    model: [],
  };

  if (selection.rules !== undefined) {
    selection.rules.forEach((rule) => {
      //   console.log("model rules");
      let unitRules = parseRule(rule);
      unitRules.forEach((element) => {
        unit.rules.push(element);
      });
    });
  }

  // console.log("unit keys: " + Object.keys(selection));
  // console.log("sel keys: " + Object.keys(selection.selections));

  selection.selections.forEach((child) => {
    // console.log("child keys: " + Object.keys(child));
    child.selection.forEach((grandchild) => {
      if (grandchild.$.type === "upgrade") {
        // console.log("upgrade");
        unit.upgrades.push(parseUpgrade(grandchild));
      } else if (grandchild.$.type === "model") {
        // console.log("model");
        unit.model.push(parseModel(grandchild));
      } else if (grandchild.$.type === "unit") {
        // console.log("unit");
      } else if (grandchild.$.type === "wargear") {
        // console.log("wargear");
      }
    });
  });
  //     if (child.$.type === "model") {
  //       let childModels = parseModel(child);
  //     } else if (child.$.type === "upgrade") {
  //       parseUpgrade(child);
  //     }
  //   });

  return unit;
}

function parseSelections(rootSelection) {
  let selection = {
    // displayName: rootSelection.$.name,
    upgrades: [],
    model: [],
    units: [],
    wargear: [],
  };
  rootSelection.selection.forEach((grandchild) => {
    if (grandchild.$.type === "upgrade") {
      // console.log("upgrade");
      selection.upgrades.push(parseUpgrade(grandchild));
    } else if (grandchild.$.type === "model") {
      // console.log("model");
      selection.model.push(parseModel(grandchild));
    } else if (grandchild.$.type === "unit") {
      // console.log("unit");
    } else if (grandchild.$.type === "wargear") {
      // console.log("wargear");
    }
    //   child.profiles.forEach((profile) => {
    //     console.log("profile");
    //   });

    //   console.log(Object.keys(grandchild));
  });
  return selection;
}

function parseRule(selection) {
  let selected = [];
  selection.rule.forEach((rule) => {
    let curRule = {
      name: rule.$.name,
      models: [],
      upgrades: [],
      description: rule.description,
    };
    selected.push(curRule);
  });

  //   console.log(selected);
  return selected;
}

function parseProfile(selection) {
  let selected = [];
  selection.profile.forEach((profile) => {
    // console.log("profile: " + profile.$.name);

    let curProfile = {
      name: profile.$.name,
      stats: [],
    };
    // console.log("profile: " + Object.keys(profile));
    profile.characteristics.forEach((characteristic) => {
      characteristic.characteristic.forEach((geez) => {
        // console.log("characteristic: " + Object.keys(geez));
        // console.log(geez.$.name + ": " + geez._);
        curProfile.stats.push({
          name: geez.$.name,
          value: geez._,
        });
      });
      //   console.log(
      //     "characteristic: " + Object.keys(characteristic.characteristic)
      //   );
    });
    selected.push(curProfile);
  });

  //   console.log(selected);
  return selected;
}
