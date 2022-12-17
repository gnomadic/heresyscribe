import React from "react";

function ProfileRow(props) {
  return (
    <div>
      <p>{JSON.stringify(props.profile, null, 2)}</p>
      {props.profile.map((profile, i) => {
        console.log("Wat: " + JSON.stringify(profile, null, 2));
        return (
          <table key={i} class="table-auto">
            111
            <p>{JSON.stringify(profile, null, 2)}</p>
            <thead>
              <tr>
                <th>{profile.name}</th>
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

export default ProfileRow;
