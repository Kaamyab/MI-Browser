// Modules
import React, {
  MouseEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Redux
import { useAppSelector } from "../redux/hooks";
import { m, motion } from "framer-motion";
import { ContextMenuEvent } from "electron";
import { ArrowLeft2, ArrowLeft3, Code } from "iconsax-react";
import CtxMenuItem from "./low-level/CtxMenuItem";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { ValueType } from "../redux/features/Tabs";

const WebView = ({ tab }: { tab: ValueType }) => {
  const url = "https://google.com";
  const webView = useRef<Electron.WebviewTag>(null);

  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);

  const onFinishLoad = (e: Electron.Event) => {
    // alert("Finished Loading");
  };
  const onContextMenu = (e: Electron.ContextMenuEvent) => {
    console.log(e);
    setCtxMenu({
      x: e.params.x,
      y: e.params.y,
    });
  };

  const onContextMenuClose = () => {
    if (ctxMenu) {
      setCtxMenu(null);
    }
  };

  const onURLLoad = useMemo(() => {
    webView?.current?.loadURL(tab.url);
    console.log("url loaded");
  }, [tab.url]);

  console.log("Re-Rendered");

  useEffect(() => {
    webView?.current?.addEventListener("did-finish-load", onFinishLoad);
    webView?.current?.addEventListener("context-menu", onContextMenu);
    console.log("component re-rendered");
    return () => {
      webView?.current?.removeEventListener("context-menu", onContextMenu);
    };
  }, []);

  return (
    <>
      <webview
        key={tab.id}
        ref={webView}
        plugins
        nodeintegration
        webpreferences="allowRunningInsecureContent"
        allowpopups={true}
        src={tab.url}
        className={`w-auto h-auto min-h-[calc(100vh-8rem)] rounded-lg overflow-hidden select-all
        ${tab.isActive ? "" : "hidden"}
        `}
      ></webview>
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
            duration: 0.3,
          }}
          style={{
            left: ctxMenu.x + "px",
            top: ctxMenu.y + "px",
          }}
          dir="ltr"
          className="absolute m-0 z-[999999] w-64 h-auto bg-zinc-900/90 saturate-150 
          backdrop-blur-md rounded-xl p-4 ring-1 ring-zinc-700/40 shadow-lg flex flex-col gap-2"
        >
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
          <CtxMenuItem>
            <ArrowCounterClockwise size="1.5rem" />
            <span>Reload</span>
          </CtxMenuItem>
          <span className="w-full h-[1px] bg-zinc-700" />
          <CtxMenuItem>
            <Code size="1.5rem" />
            <span>Inspect Element</span>
          </CtxMenuItem>
        </motion.div>
      )}
    </>
  );
};

export default WebView;
