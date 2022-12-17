import React from "react";
import ProfileRow from "./ProfileRow";
import RuleRow from "./RuleRow";
import WargearRow from "./WargearRow";
import WeaponRow from "./WeaponRow";

function UnitCard(props) {
  return (
    <div className="mb-10">
      <div class="flex justify-center">
        <div class="block rounded-lg shadow-lg bg-white  text-center">
          <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold">
            {props.model.displayName}
          </div>
          <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">
              <ProfileRow allProfiles={props.model.modelProfiles} />
            </h5>

            <h5 class="text-gray-900 text-xl font-medium mb-2">
              <WeaponRow allProfiles={props.model.weaponProfiles} />
            </h5>
            <h5 class="text-gray-900 text-xl font-medium mb-2">
              <WargearRow allProfiles={props.model.wargearProfiles} />
            </h5>

            <h5 class="text-gray-900 text-xl font-medium mb-2">
              <RuleRow allProfiles={props.model.rules} />
            </h5>

            <p class="text-gray-700 text-base mb-4">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <button
              type="button"
              class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Button
            </button>
          </div>
          <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
            2 days ago
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitCard;
