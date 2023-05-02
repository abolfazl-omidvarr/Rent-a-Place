import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	category?: string;
	locationValue?: string;
}

const getListing = async (params: IListingsParams) => {
	try {
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			category,
			locationValue,
		} = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}
		if (guestCount) {
			query.guestCount = {
				gte: +guestCount, //gte means greater than or equals in prisma/MangoDB
			};
		}
		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}
		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}
		if (startDate && endDate) {
			query.NOT = {
				reservation: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate },
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate },
							},
						],
					},
				},
			};
		}

		if (category) {
			query.category = category;
		}
		if (locationValue) {
			query.locationValue = locationValue;
		}

		const listing = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "desc",
			},
		});

		const safeListings = listing.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));

		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
};

export default getListing;
