import React from "react";

import { getCurrentUser } from "@/app/actions";
import { getListingById, getReservation } from "@/app/actions";
import { ClientOnly, EmptyState } from "@/app/components";

import ListingClient from "./listingClient";

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	const reservations = await getReservation(params);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient
				listing={listing}
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ListingPage;
