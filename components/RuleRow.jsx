import React, { useEffect, useState } from "react";

function RuleRow(props) {
  const oneclass = "bg-gray-50 dark:bg-gray-800";
  const darkclass = "bg-gray-900";
  const lightClass = "bg-gray-200";

  const [showTable, setShowTable] = useState(true);
  const [showRow, setShowRow] = useState({});

  useEffect(() => {
    let temp = {};

    props.allProfiles.map((profile, i) => {
      temp[i] = true;
    });
    setShowRow(temp);
    console.log(temp);
  }, [props.allProfiles]);

  return (
    <div
      className={
        "overflow-x-auto relative shadow-md sm:rounded-lg" +
        (showTable ? "" : " noprint")
      }
    >
      <table className="w-full text-sm text-center text-gray-400">
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
            <th className="text-base px-6">Rule</th>
            <th className="text-base px-6 bg-gray-900">Description</th>
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
                    />{" "}
                  </th>
                ) : (
                  <></>
                )}
                <th className="text-xs px-6">{profile.name}</th>
                <th className="text-left px-6 bg-gray-200 text-xs">
                  {profile.description}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RuleRow;
