import { app, globalShortcut, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady().then(() => {
    if (!isProd) {
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
      // installExtension(REACT_DEVELOPER_TOOLS)
      //   .then((name) => console.log(`Added Extension:  ${name}`))
      //   .catch((err) => console.log("An error occurred: ", err));
    }
  });

  const mainWindow = createWindow("main", {
    width: 1600,
    height: 900,
    center: true,
    frame: false,
    transparent: true,
    hasShadow: true,
  });

  // Register the Ctrl+T shortcut
  globalShortcut.register("CommandOrControl+T", () => {
    // Send an IPC event to the renderer process
    mainWindow.webContents.send("ctrl-t-pressed");
  });
  // Register the Ctrl+Shift+W shortcut
  globalShortcut.register("CommandOrControl+Shift+W", () => {
    mainWindow.close();
  });

  ipcMain.on("minimizeApp", () => {
    mainWindow?.minimize();
  });

  ipcMain.on("maximizeApp", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
      if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
      }
    }
  });

  ipcMain.on("closeApp", () => {
    mainWindow?.close();
  });

  ipcMain.on("fullscreenApp", () => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    } else {
      mainWindow.setFullScreen(true);
    }
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    }
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
