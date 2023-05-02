"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { safeReservation, safeUser } from "@/app/types";
import { Container, Heading, ListingCard } from "../components";
import { toast } from "react-hot-toast";

interface ReservationClientProps {
	reservations: safeReservation[];
	currentUser: safeUser;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
	reservations,
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
				<Heading title="Reservation" subtitle="Bookings on your properties" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{reservations.map((reserve) => (
						<ListingCard
							key={reserve.id}
							data={reserve.listing}
							reservation={reserve}
							actionId={reserve.id}
							onAction={onCancel}
							disabled={deletingId === reserve.id}
							actionLabel="Cancel guest reservation"
							currentUser={currentUser}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};

export default ReservationClient;
