import React from "react";

function WeaponRow(props) {
  const darkclass = "bg-gray-900 ";
  const lightClass = "bg-gray-200 ";

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="py-3 px-6">Weapon</th>
            {props.allProfiles[0].stats.map((stat, i) => {
              return (
                <th
                  scope="col"
                  key={i}
                  className={
                    "text-center py-3 px-6 " + (i % 2 === 0 ? darkclass : "")
                  }
                >
                  {stat.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.allProfiles.map((profile, i) => {
            return (
              <tr key={i} className="border-t border-gray-700">
                <th className="py-3 px-6">{profile.name}</th>
                {profile.stats.map((stat, i) => {
                  return (
                    <th
                      scope="row"
                      className={
                        "py-3 px-6 " +
                        (i % 2 === 0 ? lightClass : "") +
                        (stat.name === "Type" ? " text-left " : " text-center ")
                      }
                      key={i}
                    >
                      {stat.value}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WeaponRow;
