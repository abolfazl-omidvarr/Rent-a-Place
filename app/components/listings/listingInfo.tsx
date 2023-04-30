"use client";
import React from "react";

import { Heading, HeartButton } from "@/app/components";
import { useCountries } from "@/app/hooks/";
import { safeUser } from "@/app/types";
import Image from "next/image";

interface ListingHeadProps {
	title: string;
	imageScr: string;
	locationValue: string;
	id: string;
	currentUser?: safeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
	title,
	imageScr,
	locationValue,
	id,
	currentUser,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);
	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					alt="image"
					src={imageScr}
					fill
					className="object-cover w-full"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
