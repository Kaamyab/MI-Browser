// Modules
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Components
import CtxMenuItem from "./low-level/CtxMenuItem";

// Icons
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { ArrowLeft2, Code } from "iconsax-react";

// Redux
import { ValueType, modifyTab } from "../redux/features/Tabs";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const WebView = ({ tab }: { tab: ValueType }) => {
  const ReduxDispatch = useAppDispatch();
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

  const onStartLoading = (e: Electron.Event) => {
    console.log("loading..");
    console.log(e);
    ReduxDispatch(
      modifyTab({
        id: tab.id,
        status: "Loading",
      })
    );
  };
  const onStopLoading = (e: Electron.Event) => {
    console.log("stopped Loading");
    console.log(e);
    ReduxDispatch(
      modifyTab({
        id: tab.id,
        status: "Loaded",
      })
    );
  };
  const onTitleUpdate = (e: Electron.PageTitleUpdatedEvent) => {
    console.log(e.title);
    ReduxDispatch(
      modifyTab({
        id: tab.id,
        title: e.title,
      })
    );
  };

  let ThisTab = useAppSelector((state) => state.Tabs.value).find(
    (item) => item.id == tab.id
  );
  const onURLChange = useCallback((url: string) => {
    console.warn("NEW URL =>", url);
    if (url !== "" && ThisTab.url != url && url !== "about:blank") {
      ReduxDispatch(
        modifyTab({
          id: tab.id,
          currentURL: url,
        })
      );
    }
  }, []);

  console.log("WebView Re-Rendered");

  useEffect(() => {
    onURLChange(webView?.current?.src);
  }, [webView?.current?.src]);

  useEffect(() => {
    webView?.current?.addEventListener("did-finish-load", onFinishLoad);
    webView?.current?.addEventListener("context-menu", onContextMenu);
    webView?.current.addEventListener("did-start-loading", onStartLoading);
    webView?.current.addEventListener("did-stop-loading", onStopLoading);
    webView?.current?.addEventListener("page-title-updated", onTitleUpdate);
    return () => {
      webView?.current?.removeEventListener("context-menu", onContextMenu);
      webView?.current?.removeEventListener(
        "did-start-loading",
        onStartLoading
      );
      webView?.current?.removeEventListener("did-stop-loading", onStopLoading);
      webView?.current?.removeEventListener(
        "page-title-updated",
        onTitleUpdate
      );
    };
  }, []);

  return (
    <>
      <webview
        key={tab.id}
        ref={webView}
        webpreferences="allowRunningInsecureContent"
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
