"use client";
import React from "react";
import { Container, Logo, Search, UserMenu, Categories } from "../";
import { safeUser } from "@/app/types";

interface navbarProps {
	currentUser?: safeUser | null;
}

const Navbar: React.FC<navbarProps> = ({ currentUser }) => {
	return (
		<div className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
					</div>
					<Search />
					<UserMenu currentUser={currentUser} />
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;
