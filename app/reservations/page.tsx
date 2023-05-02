import { ClientOnly, EmptyState } from "../components";
import { getReservation, getCurrentUser } from "../actions";

import ReservationClient from "./reservationClient";

const ReservationPage = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientOnly>
		);
	}

	const reservations = await getReservation({ authorId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No reservations found"
					subtitle="Looks like you have no reservations on your properties"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ReservationPage;
