import { User, Listing } from "@prisma/client";

export type safeUser = Omit<
	User,
	"createdAt" | "updatedAt" | "emailVerified"
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export type safeListing = Omit<Listing, "createdAt"> & {
	createdAt: string;
};
