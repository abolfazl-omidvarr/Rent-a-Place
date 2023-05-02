"use client";
import React, { useState, useMemo } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import {
	Modal,
	Heading,
	Input,
	CategoryInput,
	CountrySelect,
	Counter,
	ImageUpload,
} from "..";
import { useRentModal } from "@/app/hooks/";
import { categories } from "@/app/constants";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);
	const router = useRouter();

	const onBack = () => {
		setStep((value) => value - 1);
	};
	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}
		return "Next";
	}, [step]);
	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back";
	}, [step]);

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
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 20,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const roomCount = watch("roomCount");
	const guestCount = watch("guestCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() => dynamic(() => import("../map"), { ssr: false }),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) return onNext();
		setIsLoading(true);

		axios
			.post("/api/listing", data)
			.then(() => {
				toast.success("Listing created!");
				router.refresh();
				reset(); //reset form values
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch((err) => toast.error("Opps, Something is not quite right"))
			.finally(() => setIsLoading(false));
	};

	let bodyContent;
	if (step === STEPS.CATEGORY) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Which of these best describe your place?"
					subtitle="Pick a category"
					center
				/>
				<div
					className="
						grid
						grid-cols-2
						md:grid-cols-3
						gap-3
						max-h-[50vh]
						overflow-y-auto"
				>
					{categories.map((ctg) => (
						<div key={ctg.label} className="col-span-1">
							<CategoryInput
								onClick={(ctg) => setCustomValue("category", ctg)}
								selected={category === ctg.label}
								label={ctg.label}
								icon={ctg.icon}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you"
					center
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities do you have?"
					center
				/>
				<Counter
					title="Guest"
					subtitle="How many guest do you allow?"
					value={guestCount}
					onChange={(value) => setCustomValue("guestCount", value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={roomCount}
					onChange={(value) => setCustomValue("roomCount", value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={bathroomCount}
					onChange={(value) => setCustomValue("bathroomCount", value)}
				/>
			</div>
		);
	}
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
					center
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue("imageSrc", value)}
				/>
			</div>
		);
	}
	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subtitle="Short and sweet works best!"
					center
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}
	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Now, set your price?"
					subtitle="How much do you charge per night?"
					center
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			{/* <hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div
				className="
					text-neutral-500
					text-center
					mt-4
					font-light"
			>
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div
						onClick={toggle}
						className="
						text-neutral-800
						cursor-pointer
						hover:underline"
					>
						Log in
					</div>
				</div>
			</div> */}
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title="RentBNB your home"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RentModal;
