var parseString = require("xml2js").parseString;
// const { profileEnd } = require("console");
// var fs = require("fs");
// const { parse } = require("path");
// const { json } = require("stream/consumers");

export function loadXML(fileData, done) {
  // fs.readFile(__dirname + filename, function (err, data) {
  //   if (err) {
  //     throw err;
  //   }

  // var fileData = data.toString();

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
          currentForce.models.push(model);
        } else if (forceSelection.$.type === "unit") {
          //then check for units
          let unit = parseUnit(forceSelection);
          currentForce.models.push(unit);
        }
      });
      usefulData.push(currentForce);
    });

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
