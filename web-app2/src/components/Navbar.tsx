import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "react-feather";
import { Input } from "@/components/ui/input";
import SearchDialog from "@/components/Dialogs/SearchDialog";
async function getWisdom() {
  const res = await fetch("https://api.api-ninjas.com/v1/quotes?category", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "X-Api-Key": process.env.API_NINJA_KEY,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data[0];
}
async function Navbar() {
  // const { quoteText, quoteAuthor } = await getWisdom();
  const { quote, author } = await getWisdom();
  return (
    <div className="w-full flex items-start justify-between float-right">
      <div>
        <p className="text-2xl">Hello, mohammad alismael</p>
        <p className="text-sm opacity-50">never try to give up.</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <SearchDialog>
          <Input type="text" className="w-96 h-[36px]" />
        </SearchDialog>
        <Bell size={30} className="p-1 bg-white rounded-xl h-[36px] w-[36px]" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navbar;
