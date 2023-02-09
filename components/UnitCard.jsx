import React, { useState } from "react";
import ProfileRow from "./ProfileRow";
import RuleRow from "./RuleRow";
import VehicleRow from "./VehicleRow";
import WargearRow from "./WargearRow";
import WeaponRow from "./WeaponRow";

function UnitCard(props) {
  const [model, setModel] = useState(props.model);

  return (
    <div className="flex mb-10 break-inside-avoid ">
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
        <div className="block text-center bg-white rounded-lg shadow-lg">
          <div className="px-6 py-1 text-lg text-gray-900 uppercase border-b border-gray-300">
            {model.displayName}
          </div>
          <div className="">
            {model.modelProfiles.length > 0 ? (
              <div className="mb-2 text-xl font-medium text-gray-900">
                <ProfileRow
                  allProfiles={model.modelProfiles}
                  printMode={props.printMode}
                />
              </div>
            ) : (
              <></>
            )}

            {model.vehicleProfiles.length > 0 ? (
              <div className="mb-2 text-xl font-medium text-gray-900">
                <VehicleRow
                  allProfiles={model.vehicleProfiles}
                  printMode={props.printMode}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="mb-2 text-xl font-medium text-gray-900">
              <WeaponRow
                allProfiles={model.weaponProfiles}
                printMode={props.printMode}
              />
            </div>
            <div className="mb-2 text-xl font-medium text-gray-900">
              <WargearRow
                allProfiles={model.wargearProfiles}
                printMode={props.printMode}
              />
            </div>
            {/* </div> */}

            <div className="mb-2 text-xl font-medium text-gray-900">
              <RuleRow allProfiles={model.rules} printMode={props.printMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitCard;
