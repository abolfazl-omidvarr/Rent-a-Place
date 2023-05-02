import prisma from "@/app/libs/prismadb";

interface IParams {
	listingId?: string;
}

const getListingById = async (params: IParams) => {
	try {
		const { listingId } = params;

		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId,
			},
			include: {
				user: true,
			},
		});

		if (!listing) {
			return null;
		}

		const safeListing = {
			...listing,
			createdAt: listing.createdAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toISOString(),
				updatedAt: listing.user.updatedAt.toISOString(),
				emailVerified: listing.user.emailVerified?.toISOString() || null,
			},
		};

		return safeListing;
	} catch (err) {
		throw new Error("something went wrong: " + err);
	}
};

export default getListingById;
