"use client";
import React, { useMemo } from "react";

import { categories } from "@/app/constants";
import { safeListing, safeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { Container, ListingHead } from "@/app/components";

interface ListingClientProps {
	reservation?: Reservation[];
	listing: safeListing & {
		user: safeUser;
	};
	currentUser?: safeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
	reservation,
	listing,
	currentUser,
}) => {
	const category = useMemo(() => {
		return categories.find((ctgr) => ctgr.label === listing.category);
	}, [listing.category]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageScr={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						guestCount={listing.guestCount}
						bathroomCount={listing.bathroomCount}
						locationValue={listing.locationValue}
					/>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
