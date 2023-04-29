"use client";
import React, { useMemo } from "react";

import { categories } from "@/app/constants";
import { safeListing, safeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { Container } from "@/app/components";

interface ListingClientProps {
	reservation?: Reservation[];
	listing: safeListing & {
		user: safeUser;
	};
	currentUser?: safeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
	reservation,
	listing,
	currentUser,
}) => {
	const category = useMemo(() => {
		return categories.find((ctgr) => ctgr.label === listing.category);
	}, [listing.category]);

	return <Container>
    <div className="max-w-screen-lg mx-auto">
  <div className="flex flex-col gap-6">
    ///////
  </div>
    </div>
  </Container>;
};

export default ListingClient;
