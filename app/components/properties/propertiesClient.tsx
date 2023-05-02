"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { safeListing, safeUser } from "@/app/types";
import { Container, Heading, ListingCard } from "..";
import { toast } from "react-hot-toast";

interface PropertiesClientProps {
	listings: safeListing[];
	currentUser: safeUser;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listing/${id}`)
				.then(() => {
					toast.success("Listing deleted");
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
				<Heading title="Properties" subtitle="List of your properties" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map((listing) => (
						<ListingCard
							key={listing.id}
							data={listing}
							actionId={listing.id}
							onAction={onCancel}
							disabled={deletingId === listing.id}
							actionLabel="Delete property"
							currentUser={currentUser}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};

export default PropertiesClient;
