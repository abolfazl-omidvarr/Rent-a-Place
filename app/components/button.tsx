"use client";
import { IconType } from "react-icons/lib";
import React from "react";

interface buttonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}
const Button: React.FC<buttonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
			relative
			disabled:opacity-70
			disabled:cursor-not-allowed
			rounded-lg
			hover:opacity-70
			w-full
			${
				outline
					? "bg-white border-black text-black"
					: "bg-rose-500 border-rose-500 text-white"
			} 
			${
				small
					? "py-1 text-sm font-light border-[1px]"
					: "py-3 text-md font-semibold border-[2px]"
			}
		`}
		>
			{Icon && (
				<Icon
					size={24}
					className="
            absolute
            left-4
            top-3
          "
				/>
			)}
			{label}
		</button>
	);
};

export default Button;
