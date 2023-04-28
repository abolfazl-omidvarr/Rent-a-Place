"use client";

import React from "react";
import { useSearchParams, usePathname } from "next/navigation";

import { Container, CategoryBox } from "../";
import { categories } from "@/app/constants";

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
	const params = useSearchParams();
	const category = params?.get("category");
	const pathName = usePathname();

	//check if we are in the main page, if not prevent render of category bar
	const isMainPage = pathName === "/";
	if (!isMainPage) return null;

	return (
		<Container>
			<div
				className="
            w-full
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto"
			>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						desc={item.description}
						icon={item.icon}
						selected={category === item.label}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
