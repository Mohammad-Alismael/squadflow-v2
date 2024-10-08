"use client";
import React from "react";
import { Tfeature } from "@/app/features/components/FeatureList";
import {
  CheckSquare,
  Columns,
  Eye,
  FocusIcon,
  PlusSquare,
  Trash2,
  Clipboard,
  Bell,
  Calendar,
  Grid,
  MessageCircle,
  Settings,
  User,
  Users,
  Copy,
  Tag,
  ArrowUpDown,
  LayoutGrid,
  Lock,
  UserCheck,
  Search,
} from "lucide-react";

function getRandomColor() {
  const colors = [
    "#EEEBFC",
    "#FAEDEC",
    "#E7EEFB",
    "#F8EAF9",
    "#E9FAEE",
    "#FCF3EC",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
const iconMap = {
  Calendar,
  CheckSquare,
  Clipboard,
  PlusSquare,
  Settings,
  Trash2,
  User,
  Users,
  Grid,
  Columns,
  Eye,
  Bell,
  MessageCircle,
  Copy,
  Tag,
  ArrowUpDown,
  LayoutGrid,
  Lock,
  UserCheck,
  Search,
};
function Feature({ data }: { data: Tfeature }) {
  // @ts-ignore
  const Icon = iconMap[data.icon];
  const bgColor = getRandomColor();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-4">
        <div
          className="p-2.5 h-fit flex items-center justify-center rounded-xl"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-bold">{data.title}</p>
        <p className="opacity-50">{data.description}</p>
      </div>
    </div>
  );
  return (
    <div className="flex flex-row gap-x-4">
      <div
        className="p-2.5 h-fit flex items-center justify-center rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="h-8 w-8" />
      </div>

      <div className="space-y-1">
        <p className="font-bold">{data.title}</p>
        <p className="opacity-50">{data.description}</p>
      </div>
    </div>
  );
}

export default Feature;
