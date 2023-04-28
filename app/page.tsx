import React from "react";
import { Container, ClientOnly, EmptyState, ListingCard } from "./components";

import { getCurrentUser, getListing } from "./actions";

const Home = async () => {
	const currentUser = await getCurrentUser();
	const listing = await getListing();

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
					{listing.map((listing: any) => {
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
