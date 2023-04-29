import React from "react";

import { getCurrentUser } from "@/app/actions";
import getListingById from "@/app/actions/getListingById";
import { ClientOnly, EmptyState } from "@/app/components";

import { listingClient } from "./components";

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient listing={listing} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ListingPage;
