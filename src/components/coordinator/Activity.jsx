import React from 'react'
import { IoIosAdd } from "react-icons/io";

const Activity = () => {
  return (
    <div className="pt-16 pl-10">
      <a
        href="/create activity"
        className="flex flex-row items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <h4 className="flex items-center gap-2">
          <IoIosAdd className="text-blue-600 text-xl" />
          Add Activity
        </h4>
      </a>
    </div>
  );
}

export default Activity
