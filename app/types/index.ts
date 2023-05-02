import { User, Listing, Reservation } from "@prisma/client";

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

export type safeReservation = Omit<
	Reservation,
	"createdAt" | "startDate" | "endDate" | "listing"
> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: safeListing;
};

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: number[];
	region: string;
	value: string;
};
