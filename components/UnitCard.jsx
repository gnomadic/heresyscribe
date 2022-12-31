import React, { useState } from "react";
import ProfileRow from "./ProfileRow";
import RuleRow from "./RuleRow";
import WargearRow from "./WargearRow";
import WeaponRow from "./WeaponRow";

function UnitCard(props) {
  const [model, setModel] = useState(props.model);

  return (
    <div className="mb-10 mx-10 flex">
      {props.printMode ? (
        <div className="px-5 pt-2 printbox noprint">
          <input
            type="checkbox"
            className="default:ring-2"
            defaultChecked={true}
            onChange={() => {
              setModel({ ...model, checked: !model.checked });
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div
        className={"flex justify-center" + (model.checked ? "" : " noprint")}
      >
        <div className="block rounded-lg shadow-lg bg-white  text-center">
          <div className="py-1 px-6 border-b border-gray-300 text-gray-900 uppercase text-lg">
            {model.displayName}
          </div>
          <div className="">
            <div className="text-gray-900 text-xl font-medium mb-2">
              <ProfileRow
                allProfiles={model.modelProfiles}
                printMode={props.printMode}
              />
            </div>

            <div className="text-gray-900 text-xl font-medium mb-2">
              <WeaponRow
                allProfiles={model.weaponProfiles}
                printMode={props.printMode}
              />
            </div>
            <div className="text-gray-900 text-xl font-medium mb-2">
              <WargearRow
                allProfiles={model.wargearProfiles}
                printMode={props.printMode}
              />
            </div>
            {/* </div> */}

            <div className="text-gray-900 text-xl font-medium mb-2">
              <RuleRow allProfiles={model.rules} printMode={props.printMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitCard;
