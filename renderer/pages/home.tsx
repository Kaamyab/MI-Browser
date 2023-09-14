// Modules
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

// Components
import TitleBar from "../components/high-level/TitleBar";
import WebView from "../components/WebView";
import WebTab from "../components/low-level/WebTab";
import AddTabButton from "../components/low-level/AddTabButton";

// Redux
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addTab } from "../redux/features/Tabs";

function Home() {
  const [url, setUrl] = useState("https://google.com");

  const ReduxDispatch = useAppDispatch();
  let Tabs = useAppSelector((state) => state.Tabs.value);

  return (
    <React.Fragment>
      <TitleBar url={url} setUrl={setUrl}>
        {/* <div className="bg-green-500 w-auto h-auto min-h-[calc(100vh-3.5rem)] rounded-lg"></div> */}
        <div
          dir="ltr"
          className="w-full h-12 mt-2 rounded-lg flex items-center px-2"
        >
          <AnimatePresence>
            {Tabs.map((tab) => (
              <WebTab key={tab.id} details={tab} />
            ))}
          </AnimatePresence>
          <AddTabButton
            onClick={() => {
              ReduxDispatch(
                addTab({
                  id: uuidv4(),
                  url: "https://google.com",
                  title: "Google",
                  isActive: false,
                })
              );
            }}
          />
        </div>
        <div className="w-full bg-zinc-900 min-h-[calc(100vh-8rem)]">
          {Tabs.map((tab) => (
            <WebView key={tab.id} tab={tab} />
          ))}
        </div>
      </TitleBar>
    </React.Fragment>
  );
}

export default Home;
