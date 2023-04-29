import prisma from "@/app/libs/prismadb";

const getListing = async () => {
	try {
		const listing = await prisma.listing.findMany({
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
