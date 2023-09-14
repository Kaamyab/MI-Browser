import { Plus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React from "react";

const AddTabButton = ({ ...rest }) => {
  return (
    <motion.div
      transition={{ type: "spring" }}
      {...rest}
      className="h-10 aspect-square rounded-md
  bg-zinc-800/50 hover:bg-zinc-800 transition-colors duration-200
  flex justify-center items-center cursor-pointer
  "
    >
      <Plus size={"1.25rem"} />
    </motion.div>
  );
};

export default AddTabButton;
