import React from "react";

function RuleRow(props) {
  return (
    <div>
      <p>{JSON.stringify(props.rules, null, 2)}</p>
      {props.rules.map((rule, i) => {
        console.log("Wat: " + JSON.stringify(rule, null, 2));
        return (
          <table key={i} class="table-auto">
            111
            <p>{JSON.stringify(rule, null, 2)}</p>
            <thead>
              <tr>
                <th>asdf</th>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default RuleRow;
