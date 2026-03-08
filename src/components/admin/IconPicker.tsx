"use client";

import { useState } from "react";
import {
  FaHome, FaBuilding, FaRoad, FaTools, FaHardHat, FaWrench,
  FaCog, FaIndustry, FaCity, FaPaintRoller, FaLeaf,
  FaWarehouse, FaSwimmingPool, FaDraftingCompass, FaHammer,
  FaBolt, FaWater, FaFire, FaTree, FaRuler, FaMountain,
  FaTruck,
} from "react-icons/fa";

const ICON_LIST = [
  { name: "FaHome", icon: FaHome, label: "Home" },
  { name: "FaBuilding", icon: FaBuilding, label: "Building" },
  { name: "FaRoad", icon: FaRoad, label: "Road" },
  { name: "FaTools", icon: FaTools, label: "Tools" },
  { name: "FaHardHat", icon: FaHardHat, label: "Hard Hat" },
  { name: "FaWrench", icon: FaWrench, label: "Wrench" },
  { name: "FaCog", icon: FaCog, label: "Cog" },
  { name: "FaIndustry", icon: FaIndustry, label: "Industry" },
  { name: "FaCity", icon: FaCity, label: "City" },
  { name: "FaCity", icon: FaCity, label: "Bridge / Civil" },
  { name: "FaPaintRoller", icon: FaPaintRoller, label: "Painting" },
  { name: "FaLeaf", icon: FaLeaf, label: "Landscaping" },
  { name: "FaWarehouse", icon: FaWarehouse, label: "Warehouse" },
  { name: "FaSwimmingPool", icon: FaSwimmingPool, label: "Pool" },
  { name: "FaDraftingCompass", icon: FaDraftingCompass, label: "Design" },
  { name: "FaHammer", icon: FaHammer, label: "Hammer" },
  { name: "FaBolt", icon: FaBolt, label: "Electrical" },
  { name: "FaWater", icon: FaWater, label: "Plumbing" },
  { name: "FaFire", icon: FaFire, label: "Fire Safety" },
  { name: "FaTree", icon: FaTree, label: "Tree" },
  { name: "FaRuler", icon: FaRuler, label: "Ruler" },
  { name: "FaMountain", icon: FaMountain, label: "Earthworks" },
  { name: "FaTruck", icon: FaTruck, label: "Transport" },
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export default function IconPicker({ value, onChange, label = "Icon" }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  const currentIcon = ICON_LIST.find((i) => i.name === value);
  const CurrentIconComponent = currentIcon?.icon || FaBuilding;

  return (
    <div className="space-y-1 relative">
      {label && <label className="label">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2 text-sm bg-white hover:border-navy-500 transition-colors w-full"
      >
        <div className="w-7 h-7 bg-navy-800 rounded-sm flex items-center justify-center flex-shrink-0">
          <CurrentIconComponent size={15} className="text-white" />
        </div>
        <span className="flex-1 text-left text-gray-700">{currentIcon?.label || "Select icon..."}</span>
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded shadow-xl mt-1 p-3 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-6 gap-1">
            {ICON_LIST.map(({ name, icon: Icon, label: iconLabel }) => (
              <button
                key={name}
                type="button"
                title={iconLabel}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={`flex flex-col items-center gap-1 p-2 rounded text-xs transition-all ${
                  value === name
                    ? "bg-navy-800 text-white"
                    : "hover:bg-navy-50 text-gray-600"
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] leading-tight text-center truncate w-full">{iconLabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hidden input to store value */}
      <input type="hidden" value={value} readOnly />
    </div>
  );
}
