let profile = {
  displayName: "Profile Name",
  stats: [{ name: "stat name", value: "stat value" }],
};

let rule = {
  displayName: "Rule Name",
  rules: [
    {
      name: "Rule Name",
      description: "",
    },
  ],
};

export function flattenJSON(fileData, done) {
  let flatForces = [];

  fileData.forEach((force) => {
    let flatForce = {
      displayName: force.displayName,
      globalRules: [],
      units: [],
    };

    force.units.forEach((unit) => {
      let flatUnit = {
        displayName: unit.displayName,
        rules: [],
        upgrades: [],
        profiles: [],
        weapons: [],
      };
      unit.upgrades.forEach((upgrade) => {
        // flatUnit.upgrades.push(upgrade);
      });
    });

    flatForces.push(flatForce);
  });

  return flatForces;
}
