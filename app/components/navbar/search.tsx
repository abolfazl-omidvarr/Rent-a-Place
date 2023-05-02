"use client";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { useCountries, useSearchModal } from "@/app/hooks";
import { useSearchParams } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

const Search = () => {
	const searchModal = useSearchModal();
	const { getByValue } = useCountries();
	const params = useSearchParams();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}
		return "anywhere";
	}, [getByValue, locationValue]);

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);
			let diff = differenceInCalendarDays(end, start);

			if (diff === 0) {
				diff = 1;
			}

			return diff + "Days";
		}

		return "Any week";
	}, [startDate, endDate]);

	const guestLabel = useMemo(() => {
		if (guestCount) {
			return guestCount + "Guests";
		}

		return "Add Guests";
	}, [startDate, endDate]);

	return (
		<div
			onClick={searchModal.onOpen}
			className="
				border-[1px]
		 		w-full
		  		md:w-auto
				py-2
				rounded-full
		   		shadow-sm
		    	hover:shadow-md
				transition
				cursor-pointer 
				"
		>
			<div
				className="
				flex
				flex-row
				items-center
				justify-between
			"
			>
				<div
					className="
						text-sm
						font-semibold
						px-6
				"
				>
					{locationLabel}
				</div>
				<div
					className="
							hidden
							sm:block
							text-sm
							font-semibold
							px-6
							border-x-[1px]
							flex-1
							text-center
					"
				>
					{durationLabel}
				</div>
				<div
					className="
							text-sm
							text-gray-600
							flex
							flex-row
							items-center
							gap-3
							pl-6
							pr-2
					"
				>
					<div className="hidden sm:block justify-center items-center">
						{guestLabel}
					</div>
					<div
						className="
						p-2
						bg-rose-500
						rounded-full
						text-white
					"
					>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
