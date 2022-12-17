import React from "react";
import ProfileRow from "./ProfileRow";
import RuleRow from "./RuleRow";

function UnitCard(props) {
  return (
    <div className="">
      <p className="card-title">- {props.model.displayName}</p>
      <p></p>
      <p>--- Model Profiles</p>
      {props.model.modelProfiles.map((profile, i) => {
        return (
          <div key={i}>
            <h1 className="text-3xl font-bold underline">
              ----- {profile.name}
            </h1>
            <table key={i} class="table-auto">
              <thead>
                <tr>
                  {profile.stats.map((stat, i) => {
                    return <th key={i}>{stat.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {profile.stats.map((stat, i) => {
                    return <th key={i}>{stat.value}</th>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <p></p>
      <p>--- Rules</p>
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.model.rules.map((rule, i) => {
              return (
                <tr key={i}>
                  <th>{rule.name}</th>
                  <th>{rule.description}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p></p>

      <p>--- Weapon Profiles</p>
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th>name</th>
              {props.model.weaponProfiles[0].stats.map((stat, i) => {
                return <th key={i}>{stat.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {props.model.weaponProfiles.map((profile, i) => {
              return (
                <tr key={i}>
                  <th>{profile.name}</th>
                  {profile.stats.map((stat, i) => {
                    return <th key={i}>{stat.value}</th>;
                  })}
                </tr>
              );
            })}
            <tr>
              {props.model.weaponProfiles.map((stat, i) => {
                return <th key={i}>{stat.value}</th>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
      {/* {props.model.weaponProfiles.map((rule, i) => {
        return (
          <div key={i}>
            <p>----- {rule.name}</p>
          </div>
        );
      })} */}
      <p></p>
      <p></p>
      <p>--- wargear Profiles</p>
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th>name</th>
              {props.model.wargearProfiles[0].stats.map((stat, i) => {
                return <th key={i}>{stat.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {props.model.wargearProfiles.map((profile, i) => {
              return (
                <tr key={i}>
                  <th>{profile.name}</th>
                  {profile.stats.map((stat, i) => {
                    return <th key={i}>{stat.value}</th>;
                  })}
                </tr>
              );
            })}
            <tr>
              {props.model.wargearProfiles.map((stat, i) => {
                return <th key={i}>{stat.value}</th>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
      {/* {props.model.wargearProfiles.map((rule, i) => {
        return (
          <div key={i}>
            <p>----- {rule.name}</p>
          </div>
        );
      })} */}
      {/* <p>-----</p>
      <p>{JSON.stringify(props.model, null, 2)}</p> */}
      {/* <p>{props.model.displayName}</p> */}
      {/* {props.model.profile ? (
        <ProfileRow profile={props.model.profile} />
      ) : (
        <p>no profile</p>
      )}

      {props.model.rules ? (
        <RuleRow rules={props.model.rules} />
      ) : (
        <p>no rules</p>
      )} */}
      {/* <p>{JSON.stringify(props.model, null, 2)}</p> */}
    </div>
  );
}

export default UnitCard;
