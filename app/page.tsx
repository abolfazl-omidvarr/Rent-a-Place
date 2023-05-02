import React from "react";
import { Container, ClientOnly, EmptyState, ListingCard } from "./components";

import { getCurrentUser, getListing } from "./actions";
import { safeListing } from "./types";
import { IListingsParams } from "./actions/getListing";

interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
	const currentUser = await getCurrentUser();
	const listing = await getListing(searchParams);

	if (listing.length === 0)
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);

	return (
		<ClientOnly>
			<Container>
				<div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
					{listing.map((listing) => {
						return (
							<ListingCard
								key={listing.id}
								data={listing}
								currentUser={currentUser}
							/>
						);
					})}
				</div>
			</Container>
		</ClientOnly>
	);
};

export default Home;
