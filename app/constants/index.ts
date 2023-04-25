import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
	GiWindmill,
	GiIsland,
	GiBoatFishing,
	GiCastle,
	GiForestCamp,
	GiCaveEntrance,
	GiCactus,
	GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { SlDiamond } from "react-icons/sl";

const categories = [
	{
		label: "Beach",
		icon: TbBeach,
		description: "This property is close to the beach",
	},
	{
		label: "Windmills",
		icon: GiWindmill,
		description: "This property has windmills",
	},
	{
		label: "Modern",
		icon: MdOutlineVilla,
		description: "This property is Modern",
	},
	{
		label: "Countryside",
		icon: TbMountain,
		description: "This property is in countryside",
	},
	{
		label: "Pools",
		icon: TbPool,
		description: "This property has a pool",
	},
	{
		label: "Islands",
		icon: GiIsland,
		description: "This property is on an island",
	},
	{
		label: "Lake",
		icon: GiBoatFishing,
		description: "This property is close to a lake",
	},
	{
		label: "Skiing",
		icon: FaSkiing,
		description: "This property has skiing activity",
	},
	{
		label: "Castle",
		icon: GiCastle,
		description: "This property is in a castle",
	},
	{
		label: "Camping",
		icon: GiForestCamp,
		description: "This property has camping activity",
	},
	{
		label: "Arctic",
		icon: BsSnow,
		description: "This property has ... ",
	},
	{
		label: "Cave",
		icon: GiCaveEntrance,
		description: "This property is in a cave ",
	},
	{
		label: "Desert",
		icon: GiCactus,
		description: "This property is in the desert ",
	},
	{
		label: "Barns",
		icon: GiBarn,
		description: "This property is in the barn ",
	},
	{
		label: "lux",
		icon: SlDiamond,
		description: "This property is in the barn ",
	},
];

export { categories };
