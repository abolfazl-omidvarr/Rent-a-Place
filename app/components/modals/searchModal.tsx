"use client";
import React, { useState, useMemo, useCallback } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import { Modal, Heading, Input, CountrySelect, Calendar, Counter } from "..";
import { useSearchModal } from "@/app/hooks/";
import { CountrySelectValue } from "@/app/types";
import qs from "query-string";
import { formatISO } from "date-fns";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const SearchModal = useSearchModal();
	const router = useRouter();
	const params = useSearchParams();

	const [location, setLocation] = useState<CountrySelectValue>();
	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const onBack = () => {
		setStep((value) => value - 1);
	};
	const onNext = () => {
		setStep((value) => value + 1);
	};

	const Map = useMemo(
		() => dynamic(() => import("../map"), { ssr: false }),
		[location]
	);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
		},
	});

	const category = watch("category");

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl({
			url: "/",
			query: updatedQuery,
		});

		router.push(url);

		SearchModal.onClose();
		
		setStep(STEPS.LOCATION);


		// axios
		// 	.post("/api/listing", data)
		// 	.then(() => {
		// 		toast.success("Listing created!");
		// 		router.refresh();
		// 		reset(); //reset form values
		// 		SearchModal.onClose();
		// 	})
		// 	.catch((err) => toast.error("Opps, Something is not quite right"))
		// 	.finally(() => setIsLoading(false));
	}, [
		step,
		SearchModal,
		router,
		dateRange,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		onNext,
		params,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Search";
		}
		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}
		return "Back";
	}, [step]);

	let bodyContent;
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where do you wanna go?"
					subtitle="Find the perfect location"
					center
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setLocation(value as CountrySelectValue)}
				/>
				<hr />
				<Map center={location?.latlng} />
			</div>
		);
	}
	if (step === STEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="When do you want to go?"
					subtitle="Make sure everyone is free"
					center
				/>
				<Calendar
					value={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		);
	}
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="More Information"
					subtitle="Find your perfect place!"
					center
				/>
				<hr />
				<Counter
					title="Guest"
					subtitle="How many guest are coming?"
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<hr />
				<Counter
					title="Room"
					subtitle="How many room do you need?"
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<hr />
				<Counter
					title="Bathroom"
					subtitle="How many bathroom do you need?"
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		);
	}

	const footerContent = <div className="flex flex-col gap-4 mt-3"></div>;

	return (
		<Modal
			disabled={isLoading}
			isOpen={SearchModal.isOpen}
			onClose={SearchModal.onClose}
			onSubmit={onSubmit}
			title="Filters"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			body={bodyContent}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			// footer={footerContent}
		/>
	);
};

export default SearchModal;
