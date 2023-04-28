"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { Listing, Reservation } from "@prisma/client";
import { Button, HeartButton } from "../";

import useCountries from "@/app/hooks/useCountries";
import { safeUser } from "@/app/types";

interface ListingCardProps {
	data: Listing;
	currentUser: safeUser;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	currentUser,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);
	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) return;

			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice;

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) return null;
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation?.startDate, reservation?.endDate]);

	return (
		<div
			onClick={() => router.push(`/listing/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="relative aspect-square h-52 w-full  overflow-hidden rounded-xl">
					<Image
						fill
						alt="listing"
						src={data.imageSrc}
						className="object-cover h-full w-full group-hover:scale-110 transition"
					/>
					<div className="absolute top-4 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-semibold text-lg ">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className=" flex flex-row items-center gap-1">
					<div className="font-semibold">$ {price}</div>
					{!reservation && <div className="font-light">/ night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
