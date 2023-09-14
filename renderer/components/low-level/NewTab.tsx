// Modules
import React, { FormEvent, useEffect, useRef } from "react";

// Icons
import { GoogleLogo, MagnifyingGlass } from "@phosphor-icons/react";

// Redux
import { useAppDispatch } from "../../redux/hooks";
import { ValueType, modifyTab } from "../../redux/features/Tabs";

const NewTab = ({ tab }: { tab: ValueType }) => {
  const ReduxDispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;

    if (searchInput) {
      ReduxDispatch(
        modifyTab({
          id: tab.id,
          url: `https://www.google.com/search?q=${encodeURIComponent(
            searchInput.value
          )}`,
          currentURL: `https://www.google.com/search?q=${encodeURIComponent(
            searchInput.value
          )}`,
          status: "Loading",
        })
      );
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        boxShadow: "inset 0px 0px 50px 0px rgba(0,0,0,1)",
      }}
      className={`relative w-full h-full min-h-[calc(100vh-8rem)] rounded-md ring-inset
      ${tab.isActive ? "" : "hidden"}
      `}
    >
      <div className="background opacity-75 children:opacity-50">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="absolute w-full h-full min-h-full flex justify-center items-center z-50">
        <div
          dir="ltr"
          className="w-full max-w-lg h-16 bg-TheDark-700 rounded-xl shadow-lg cursor-pointer
      ring-1 ring-zinc-600/20 hover:ring-zinc-600/30 focus-within:ring-zinc-600/30 transition-shadow duration-200
      overflow-hidden flex gap-4 justify-between px-4
      "
        >
          <form
            onSubmit={onSearch}
            className="w-full flex gap-4 items-center justify-start"
          >
            <label className="cursor-pointer" htmlFor="search">
              <GoogleLogo size={32} />
            </label>
            <input
              ref={inputRef}
              name="search"
              id="search"
              dir="auto"
              type="text"
              placeholder="Search For Anything.."
              className="w-full h-full bg-transparent outline-none"
            />
            <button type="submit">
              <MagnifyingGlass size={32} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTab;
