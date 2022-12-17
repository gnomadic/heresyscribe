import React from "react";

function Header(props) {
  return (
    <div className="relative">
      <div className="flex py-8 px-4 lg:px-8 justify-between items-center">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload Battlescribe ROS roster
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".ros"
            onChange={props.changeHandler}
          />
        </div>

        <div>~</div>
      </div>
    </div>
  );
}

export default Header;
