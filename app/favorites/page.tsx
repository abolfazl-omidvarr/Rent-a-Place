import { ClientOnly, EmptyState, ReservationClient } from "../components";
import { getFavoriteListings, getCurrentUser } from "../actions";
import FavoritesClient from "../components/favorites/favoritesClient";

const FavoritesPage = async () => {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No favorite found"
					subtitle="Looks like you have no favorite listings"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default FavoritesPage;
