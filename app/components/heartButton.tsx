"use client";
import React from "react";
import { safeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: safeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const isFavorite = true;
	const toggleFavorite = () => {};

	return (
		<div
			className="relative hover:opacity-80 transition cursor-pointer"
			onClick={toggleFavorite}
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				className={`${isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}`}
			/>
		</div>
	);
};

export default HeartButton;
