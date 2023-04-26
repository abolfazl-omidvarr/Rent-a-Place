"use client";
import React, { useCallback, useState, useMemo } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Modal, Heading, Input, Button, CategoryInput } from "..";
import { useRegisterModal, useLoginModal, useRentModal } from "@/app/hooks/";
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
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isLoading, setIsLoading] = useState(false);

	const [step, setStep] = useState(STEPS.CATEGORY);

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
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: "",
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => registerModal.onClose())
			.catch((err) => toast.error("Opps, Something is not quite right"))
			.finally(() => setIsLoading(false));
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describe your place?"
				subtitle="Pick a category"
				// center
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
							onClick={() => {}}
							selected={false}
							label={ctg.label}
							icon={ctg.icon}
						/>
					</div>
				))}
			</div>
			{/* <Input
				id="email"
				label="Email"
				type="email"
				disabled={isLoading}
				errors={errors}
				register={register}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				errors={errors}
				register={register}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				errors={errors}
				register={register}
				required
			/> */}
		</div>
	);

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
			onSubmit={/*handleSubmit(onSubmit)*/ rentModal.onClose}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RentModal;
