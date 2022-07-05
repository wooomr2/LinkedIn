import { orange } from "@mui/material/colors";
import { signOut, useSession } from "next-auth/react";
import React from "react";

function HeaderLink({ Icon, text, avatar, feed, active, hidden }) {
  const { data: session } = useSession();

  return (
    <div
      onClick={() => avatar && signOut()}
      className={`cursor-pointer flex flex-col justify-center items-center
      ${hidden && "hidden md:inline-flex"}
      ${
        feed
          ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
          : "text-gray-500 hover:text-gray-700"
      }
      ${active && "!text-black dark:!text-white "}
      `}
    >
      {/* Icon */}
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} /> : <Icon />}

      {/* Text */}
      <h4
        className={`text-sm ${
          feed && "hidden lg:flex justify-center w-full mx-auto"
        }`}
      >
        {text}
      </h4>

      {/*Underline*/}
      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+10px)] rounded-t-full bg-black dark:bg-white" />
      )}
    </div>
  );
}

export default HeaderLink;
