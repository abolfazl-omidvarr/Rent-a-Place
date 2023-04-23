"use client";
import React, { useState, useCallback } from "react";
import { Avatar, MenuItem } from "../";
import { AiOutlineMenu } from "react-icons/ai";
import { useRegisterModal, useLoginModal } from "@/app/hooks/";
import { User } from "@prisma/client";
import { BiCurrentLocation } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { safeUser } from "@/app/types";

interface UserMenuProps {
	currentUser?: safeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	return (
		<div className="relative">
			<div
				className="
				flex
				flex-row
				items-center
				gap-3"
			>
				<div
					onClick={() => {}}
					className="
						hidden
						md:block
						text-sm
						font-semibold
						py-3
						px-4
						rounded-full
						hover:bg-neutral-100
						transition
						cursor-pointer"
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="
						p-4
						md:py-1
						md:px-2
						border-[1px]
						border-neutral-200
						flex
						flex-row
						items-center
						gap-3
						rounded-full
						hover:shadow-md
						transition
						cursor-pointer"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="
						absolute
						rounded-xl
						shadow-md
						w-[40vw]
						md:w-3/4
						bg-white
						overflow-hidden
						right-0
						top-12
						text-sm"
				>
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								{" "}
								<MenuItem onClick={() => {}} label="My trips" />
								<MenuItem onClick={() => {}} label="My favorites" />
								<MenuItem onClick={() => {}} label="My reservations" />
								<MenuItem onClick={() => {}} label="My properties" />
								<MenuItem onClick={() => {}} label="RentBNB my home" />
								<hr />
								<MenuItem onClick={() => signOut()} label="Log out" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Login" />
								<MenuItem onClick={registerModal.onOpen} label="Sign UP" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
