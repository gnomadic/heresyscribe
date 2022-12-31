import React from "react";

function Header(props) {
  return (
    <div className="relative noprint">
      <div className="flex py-8 px-4 lg:px-8 justify-between items-center">
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Upload Battlescribe ROS roster
          </label>
          <input
            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none bg-gray-700 border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".ros"
            onChange={props.changeHandler}
          />
        </div>

        <div>
          {props.isFilePicked ? (
            <button
              className="block p-2 w-full text-sm text-gray-200 border rounded-lg cursor-pointer focus:outline-none bg-gray-500 border-gray-600"
              onClick={props.togglePrintMode}
            >
              Print Mode
            </button>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
