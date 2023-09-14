import React from "react";

const CtxMenuItem = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className="w-full h-10 bg-transparent hover:bg-zinc-700/30 flex items-center gap-2 rounded-md
    transition-colors duration-150 cursor-pointer px-2"
    >
      {children}
    </div>
  );
};

export default CtxMenuItem;
