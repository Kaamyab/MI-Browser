import electron from "electron";

const ipcRenderer = electron.ipcRenderer;

const TitleBarButton = ({ message, children }) => {
  return (
    <button
      onClick={() => {
        ipcRenderer.send(message, [message]);
      }}
      style={{
        ["--webkit-app-region" as string]: "none",
        ["app-region" as string]: "none",
      }}
      className="p-4 hover:bg-zinc-800/50 transition-colors duration-300 outline-none"
    >
      <div className="text-white children:text-white">{children}</div>
    </button>
  );
};

export default TitleBarButton;
