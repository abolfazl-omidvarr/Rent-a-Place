"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { safeListing, safeUser } from "@/app/types";
import { Container, Heading, ListingCard } from "../components";
import { toast } from "react-hot-toast";

interface FavoritesClientProps {
	listings: safeListing[];
	currentUser?: safeUser | undefined;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reservations canceled");
					router.refresh();
				})
				.catch((err) => {
					toast.error("Oops, something is not quite alright: " + err);
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);
	return (
		<Container>
			<div>
				<Heading title="Favorites" subtitle="List of places you have favored" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map((listing) => (
						<ListingCard
							key={listing.id}
							data={listing}
							currentUser={currentUser}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};

export default FavoritesClient;
