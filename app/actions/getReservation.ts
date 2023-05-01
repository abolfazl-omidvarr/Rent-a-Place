import prisma from "@/app/libs/prismadb";

interface IParams {
	listingId?: string;
	userId?: string;
	authorId?: string;
}

const getReservation = async (params: IParams) => {
	try {
		const { listingId, userId, authorId } = params;

		const query: any = {};

		if (listingId) {
			query.listingId = listingId;
		}
		if (userId) {
			query.userId = userId;
		}
		if (authorId) {
			query.authorId = authorId;
		}

		const reservation = await prisma.reservation.findMany({
			where: query,
			include: {
				listing: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const safeReservation = reservation.map((reserve) => ({
			...reserve,
			createdAt: reserve.createdAt.toISOString(),
			startDate: reserve.startDate.toISOString(),
			endDate: reserve.endDate.toISOString(),
			listing: {
				...reserve.listing,
				createdAt: reserve.listing.createdAt.toISOString(),
			},
		}));

		return safeReservation;
    
	} catch (error: any) {
		throw new Error(error);
	}
};

export default getReservation;
