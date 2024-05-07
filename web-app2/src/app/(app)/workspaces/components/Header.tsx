import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function Header() {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select order list" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabticaly">A-Z</SelectItem>
          <SelectItem value="accedning">latest to oldest</SelectItem>
          <SelectItem value="decending">oldest to latest</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-row items-center justify-between gap-2">
        <ToggleGroup type="single" className="bg-white rounded">
          <ToggleGroupItem aria-label="Toggle list view" value="list">
            <ListIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle cards view" value="cards">
            <LayoutGridIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Button className="capitalize bg-green-800">create workspace</Button>
      </div>
    </div>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

export default Header;
