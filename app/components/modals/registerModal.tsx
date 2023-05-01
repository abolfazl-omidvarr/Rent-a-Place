"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Modal, Heading, Input, Button } from "../";
import { useRegisterModal, useLoginModal } from "@/app/hooks/";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { name: "", email: "", password: "" },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("registered successfully, now you may log in");
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((err) => toast.error("Opps, Something is not quite right"))
			.finally(() => setIsLoading(false));
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to RentBNB"
				subtitle="Create an account!"
				center
			/>
			<Input
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
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
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
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
