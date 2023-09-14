// Modules
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import {
  Airplay,
  AlignCenterVerticalSimple,
  AlignLeftSimple,
  AlignRightSimple,
  ArrowCounterClockwise,
  CircleNotch,
  Warning,
  X,
} from "@phosphor-icons/react";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  closeAllTabs,
  closeLeftTabs,
  closeOtherTabs,
  closeRightTabs,
  removeTab,
  setActiveTab,
  ValueType,
} from "../../redux/features/Tabs";
import CtxMenuItem from "./CtxMenuItem";
import { ArrowLeft2 } from "iconsax-react";

const WebTab = ({ details }: { details: ValueType }) => {
  let state = useAppSelector((state) => state.Tabs.value);
  let status =
    useAppSelector((state) => state.Tabs.value).find(
      (item) => item.id == details.id
    )?.status || undefined;
  useEffect(() => {
    console.log("Tab => ", status);
  }, [state]);
  const ReduxDispatch = useAppDispatch();
  const tab = useRef<HTMLDivElement>(null);
  const [ctxMenu, setCtxMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const onCTXMenu = (e: MouseEvent) => {
    console.log("rc");
    setCtxMenu({
      x: e.offsetX,
      y: e.offsetY,
    });
  };
  useEffect(() => {
    tab.current.addEventListener("contextmenu", onCTXMenu);
    return () => {
      tab?.current?.removeEventListener("contextmenu", onCTXMenu);
    };
  }, []);
  return (
    <motion.div
      ref={tab}
      onContextMenu={(e) => onCTXMenu}
      initial={{ x: -25, opacity: 0, width: "0%" }}
      animate={{ x: 0, opacity: 1, width: "100%" }}
      exit={{ x: -25, opacity: 0, width: "0%" }}
      transition={{
        type: "spring",
        damping: 20,
      }}
      className="relative h-full max-w-xs min-w-0
    flex justify-start items-center
    cursor-pointer gruop
    "
      onClick={() => {
        ReduxDispatch(setActiveTab(details.id));
        ctxMenu && setCtxMenu(null);
      }}
    >
      <AnimatePresence>
        {ctxMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -5,
              scale: 0.975,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 5,
              scale: 0.975,
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              left: ctxMenu.x,
              top: ctxMenu.y,
              transitionProperty: "left, top",
            }}
            className="absolute w-64 h-auto backdrop-blur-lg rounded-xl z-[99999]  
            ring-1 ring-zinc-700/30 ring-inset shadow-lg bg-zinc-900/90 duration-300
            flex flex-col gap-2 p-4
            "
          >
            <CtxMenuItem>
              <ArrowCounterClockwise size="1.5rem" />
              <span>Reload</span>
            </CtxMenuItem>
            <CtxMenuItem>
              <ArrowLeft2 size="1.5rem" color="#fff" variant="Bold" />
              <span>Back</span>
            </CtxMenuItem>
            <CtxMenuItem>
              <ArrowLeft2
                size="1.5rem"
                color="#fff"
                variant="Bold"
                className="rotate-180"
              />
              <span>Forward</span>
            </CtxMenuItem>
            <span className="w-full h-[1px] bg-zinc-700" />
            <CtxMenuItem
              onClick={() => {
                ReduxDispatch(closeRightTabs(details.id));
              }}
            >
              <AlignRightSimple size={"1.5rem"} />
              <span>Close Right Tabs</span>
            </CtxMenuItem>

            <CtxMenuItem
              onClick={() => {
                ReduxDispatch(closeLeftTabs(details.id));
              }}
            >
              <AlignLeftSimple size={"1.5rem"} />
              <span>Close Left Tabs</span>
            </CtxMenuItem>

            <CtxMenuItem
              onClick={() => {
                ReduxDispatch(closeOtherTabs(details.id));
              }}
            >
              <AlignCenterVerticalSimple size={"1.5rem"} />
              <span>Close All Other Tabs</span>
            </CtxMenuItem>

            <CtxMenuItem
              onClick={() => {
                ReduxDispatch(closeAllTabs());
              }}
            >
              <X size={"1.5rem"} />
              <span>Close All Tabs</span>
            </CtxMenuItem>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`relative flex justify-start items-center h-10 w-full gap-2 px-4 mr-2 rounded-md whitespace-nowrap overflow-hidden
        transition-colors duration-200 ${
          details.isActive
            ? "bg-zinc-700/50 hover:bg-zinc-700/50"
            : "bg-zinc-800/75 hover:bg-zinc-800"
        }
    `}
      >
        {status == "Loading" ? (
          <CircleNotch size={"1.25rem"} className="animate-spin" />
        ) : status == "Failed" ? (
          <Warning size={"1.25rem"} />
        ) : (
          <Airplay size={"1.25rem"} />
        )}
        <span className="relative flex justify-start items-center overflow-hidden w-full">
          {details.title}
          <span className="absolute h-full min-w-0 w-16 right-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-zinc-800" />
        </span>
        <span
          onClick={(event) => {
            event.stopPropagation();
            ReduxDispatch(removeTab(details.id));
          }}
          className="absolute h-full w-10 min-w-0 right-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-zinc-800
      flex justify-center items-center group
      "
        >
          <X
            size={"1.25rem"}
            className="p-1 rounded-md cursor-pointer transition-colors duration-200 box-content text-white/90 group-hover:bg-zinc-700"
          />
        </span>
      </div>
    </motion.div>
  );
};

export default WebTab;
