import React from "react";

function Header(props) {
  return (
    <div>
      <nav className="relative">
        <div className="flex py-8 px-4 lg:px-8 justify-between items-center">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Battlescribe ROS roster
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept=".ros"
              onChange={props.changeHandler}
            />
          </div>

          <div>ok</div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
