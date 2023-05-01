import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from ".";

const getFavoriteListings = async () => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) return [];

		const favorites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		});

		const safeFavorites = favorites.map((fav) => ({
			...fav,
			createdAt: fav.createdAt.toISOString(),
		}));

		return safeFavorites;
	} catch (err) {
		throw new Error("something went wrong: " + err);
	}
};

export default getFavoriteListings;
