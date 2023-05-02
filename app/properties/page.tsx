import { ClientOnly, EmptyState, PropertiesClient } from "../components";
import { getCurrentUser, getListing } from "../actions";

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const userListings = await getListing({ userId: currentUser.id });

	if (userListings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No properties found"
					subtitle="Looks like you have no properties"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<PropertiesClient listings={userListings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default PropertiesPage;
