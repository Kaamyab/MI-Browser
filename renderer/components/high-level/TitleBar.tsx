import electron from "electron";
import TitleBarButton from "../low-level/TitleBarButton";
import {
  ArrowLeft,
  ArrowLeft2,
  ArrowRight,
  ArrowRight2,
  Lock,
  PictureFrame,
  Refresh,
  Size,
} from "iconsax-react";
import { useState } from "react";

const ipcRenderer = electron.ipcRenderer;

const TitleBar = ({ url, setUrl, children }) => {
  const [inputUrl, setInputUrl] = useState("");

  const TitlebarIcon = [
    {
      id: 1,
      message: "closeApp",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 320 512"
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(255,255,255,.75)"
        >
          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
        </svg>
      ),
    },
    {
      id: 2,
      message: "maximizeApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <rect
            x="4"
            y="4"
            width="8"
            height="8"
            fill="none"
            stroke="#fff"
            stroke-width="1.5"
          />
          <rect x="6" y="6" width="4" height="4" fill="none" />
        </svg>
      ),
    },
    {
      id: 3,
      message: "minimizeApp",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(255,255,255,.75)"
        >
          <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
        </svg>
      ),
    },
  ];

  const onUrlHandle = (e) => {
    console.log("Event Key => ", e);
    console.log("Input Url => ", inputUrl);
    if (!url.startsWith("http://") || !url.startsWith("https://")) {
      setUrl("https://" + inputUrl);
    } else setUrl(inputUrl);
  };

  return (
    <div
      dir="rtl"
      style={{
        ["--webkit-app-region" as string]: "drag",
        ["app-region" as string]: "drag",
      }}
      className="w-full h-auto bg-transparent backdrop-blur-lg flex flex-col fixed top-0 z-50 bg-zinc-900 rounded-lg"
    >
      <div className="w-full h-12 flex justify-between items-center">
        <div className="shrink-0">
          {TitlebarIcon.map((TitleIcon) => {
            return (
              <TitleBarButton key={TitleIcon.id} message={TitleIcon.message}>
                {TitleIcon.icon}
              </TitleBarButton>
            );
          })}
        </div>
        <div
          dir="ltr"
          style={{
            ["--webkit-app-region" as string]: "none",
            ["app-region" as string]: "none",
          }}
          className="flex justify-between items-center h-8 w-72 focus-within:w-96
        bg-zinc-700/50 hover:bg-zinc-700/75 duration-300 transition-all
        backdrop-blur-sm rounded-md
        px-4
        "
        >
          <Lock size="1rem" variant="Bold" className="text-white/50 shrink-0" />
          <input
            type="text"
            defaultValue={url}
            onChange={(e) => {
              setInputUrl(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && onUrlHandle(e)}
            autoCorrect=""
            className="bg-transparent outline-none h-full w-full px-4 text-center text-sm"
          />
          <Refresh
            size="1.25rem"
            variant="Bold"
            className="text-white/50 shrink-0"
          />
        </div>
        <div
          style={{
            ["--webkit-app-region" as string]: "none",
            ["app-region" as string]: "none",
          }}
          className="pl-4 flex gap-8 items-center shrink-0"
        >
          <div className="flex gap-4 items-center text-zinc-200">
            <Refresh size="1.5rem" variant="Bulk" />
            <ArrowRight size="1.5rem" variant="Bulk" />
            <ArrowLeft size="1.5rem" variant="Bulk" />
          </div>
          {/* <PictureFrame size="1.5rem" /> */}
        </div>
      </div>
      <div
        style={{
          ["--webkit-app-region" as string]: "none",
          ["app-region" as string]: "none",
        }}
        className="px-2 pb-2 rounded-lg h-full flex flex-col gap-2"
      >
        {children}
      </div>
    </div>
  );
};

export default TitleBar;
