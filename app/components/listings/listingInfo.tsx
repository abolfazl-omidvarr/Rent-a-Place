"use client";
import React from "react";

import { Avatar, Heading, ListingCategory } from "@/app/components";
import { useCountries } from "@/app/hooks/";
import { safeUser } from "@/app/types";
import { IconType } from "react-icons";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), { ssr: false });

interface ListingInfoProps {
	user: safeUser;
	category: { icon: IconType; label: string; description: string } | undefined;
	description: string;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	category,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
}) => {
	const { getByValue } = useCountries();
	const coordinate = getByValue(locationValue)?.latlng;

	return (
		<div className="flex flex-col gap-4">
			<div className="text-xl font-semibold flex flex-row items-center gap-2">
				<div>Hosted by {user?.name}</div>
				<Avatar src={user?.image} />
			</div>
			<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
				<div className="font-semibold">{guestCount} Guests</div>
				<div className="font-semibold">{roomCount} Room</div>
				<div className="font-semibold">{bathroomCount} Bathroom</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />
			<div className="text-lg font-light text-neutral-500">{description}</div>
			<hr />
			<div className="w-full self-center">
				<Map center={coordinate} />
			</div>
		</div>
	);
};

export default ListingInfo;
