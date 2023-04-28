import prisma from "@/app/libs/prismadb";

const getListing = async () => {
	try {
		const listing = await prisma.listing.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		return listing;
	} catch (error: any) {
		throw new Error(error);
	}
};

export default getListing;
