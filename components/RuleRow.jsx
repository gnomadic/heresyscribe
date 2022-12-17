import React from "react";

function RuleRow(props) {
  const oneclass = "bg-gray-50 dark:bg-gray-800";

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th>Rule</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.allProfiles.map((profile, i) => {
            return (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th>{profile.name}</th>
                <th>{profile.description}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RuleRow;
