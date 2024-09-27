import React from "react";

const NewProject = ({ handleNewCreation }) => {
  return (
    <button
      onClick={handleNewCreation}
      className="border border-[#949494] rounded-full min-w-[15vw] bg-black px-3 py-2 text-[#949494] flex items-center opacity-40 hover:opacity-100 hover:border-[#FF2D92] duration-150 cursor-default"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={12}
          height={12}
          fill="none"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 1v10M1 6h10"
          />
        </svg>
      </span>
      <span className="ml-2 mr-2 text-sm">New Project</span>
      <div className="flex ml-auto gap-2">
        <span>
          <img src="/cmd.png" alt="command" />
        </span>
        <span>
          <img src="/N.png" alt="command" />
        </span>
      </div>
    </button>
  );
};

export default NewProject;
