"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

import { categories } from "@/app/constants";
import { safeListing, safeReservation, safeUser } from "@/app/types";
import {
	Container,
	ListingHead,
	ListingInfo,
	ListingReservation,
} from "@/app/components";
import { useLoginModal } from "@/app/hooks";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	reservations?: safeReservation[];
	listing: safeListing & {
		user: safeUser;
	};
	currentUser?: safeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
	reservations = [],
	listing,
	currentUser,
}) => {
	const loginModal = useLoginModal();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) loginModal.onOpen();

		setIsLoading(true);

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			.then(() => {
				toast.success("Listing reserved");
				setDateRange(initialDateRange);
				/////trips
				router.refresh();
			})
			.catch(() => toast.error("Oops, something is not quite alright"))
			.finally(() => setIsLoading(false));
	}, [dateRange, loginModal, totalPrice, listing?.id, currentUser, router]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount =
				differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;

			setTotalPrice(
				dayCount && listing.price ? dayCount * listing.price : listing.price
			);
		}
	}, [dateRange, listing.price]);

	const disableDate = useMemo(() => {
		let dates: Date[] = [];
		reservations.forEach((reserve) => {
			const range = eachDayOfInterval({
				start: new Date(reserve.startDate),
				end: new Date(reserve.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const category = useMemo(() => {
		return categories.find((ctgr) => ctgr.label === listing.category);
	}, [listing.category]);

	return (
		<Container>
			<div className="max-w-screen-2xl mx-auto w-[1280px] fle">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageScr={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						guestCount={listing.guestCount}
						bathroomCount={listing.bathroomCount}
						locationValue={listing.locationValue}
					/>
					<div className="">
						<ListingReservation
							price={listing.price}
							totalPrice={totalPrice}
							onChangeDate={(value) => setDateRange(value)}
							dateRange={dateRange}
							onSubmit={onCreateReservation}
							disabled={isLoading}
							disabledDates={disableDate}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
