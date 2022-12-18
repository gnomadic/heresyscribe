import React from "react";
import ProfileRow from "./ProfileRow";
import RuleRow from "./RuleRow";
import WargearRow from "./WargearRow";
import WeaponRow from "./WeaponRow";

function UnitCard(props) {
  return (
    <div className="mb-10 mx-10">
      <div className="flex justify-center">
        <div className="block rounded-lg shadow-lg bg-white  text-center">
          <div className="py-1 px-6 border-b border-gray-300 text-gray-900 uppercase text-lg">
            {props.model.displayName}
          </div>
          <div className="">
            <div className="text-gray-900 text-xl font-medium mb-2">
              <ProfileRow allProfiles={props.model.modelProfiles} />
            </div>

            {/* <div className="grid gap-4 grid-cols-2 grid-rows-1"> */}
            <div className="text-gray-900 text-xl font-medium mb-2">
              <WeaponRow allProfiles={props.model.weaponProfiles} />
            </div>
            <div className="text-gray-900 text-xl font-medium mb-2">
              <WargearRow allProfiles={props.model.wargearProfiles} />
            </div>
            {/* </div> */}

            <div className="text-gray-900 text-xl font-medium mb-2">
              <RuleRow allProfiles={props.model.rules} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitCard;
