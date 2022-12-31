import React, { useEffect, useState } from "react";

function WeaponRow(props) {
  const darkclass = "bg-gray-900 ";
  const lightClass = "bg-gray-200 ";

  const [showTable, setShowTable] = useState(true);
  const [showRow, setShowRow] = useState({});

  useEffect(() => {
    let temp = {};

    props.allProfiles.map((profile, i) => {
      temp[i] = true;
    });
    setShowRow(temp);
  }, [props.allProfiles]);

  return (
    <div
      className={
        "overflow-x-auto relative shadow-md sm:rounded-lg" +
        (showTable ? "" : " noprint")
      }
    >
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            {props.printMode ? (
              <th className="text-base px-6 noprint">
                <input
                  type="checkbox"
                  className="default:ring-2"
                  defaultChecked={true}
                  onChange={() => {
                    setShowTable(!showTable);
                  }}
                />
              </th>
            ) : (
              <></>
            )}

            <th className="px-6 text-base">Weapon</th>
            {props.allProfiles[0].stats.map((stat, i) => {
              return (
                <th
                  scope="col"
                  key={i}
                  className={
                    "text-center px-6 text-base " +
                    (i % 2 === 0 ? darkclass : "")
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
              <tr
                key={i}
                className={
                  "border-t border-gray-700" + (showRow[i] ? "" : " noprint")
                }
              >
                {props.printMode ? (
                  <th className="text-base px-6 printbox noprint">
                    <input
                      type="checkbox"
                      className="default:ring-2"
                      defaultChecked={true}
                      onChange={() => {
                        setShowRow({ ...showRow, [i]: !showRow[i] });
                      }}
                    />
                  </th>
                ) : (
                  <></>
                )}

                <th className="px-6">{profile.name}</th>
                {profile.stats.map((stat, i) => {
                  return (
                    <th
                      scope="row"
                      className={
                        "px-6 " +
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
