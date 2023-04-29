import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";
import { safeUser } from "@/app/types";

interface IParams {
	listingId?: string;
}

const userUpdate = async (currentUser: safeUser, favoriteIds: any) => {
	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return user;
};

export const POST = async (
	request: Request,
	{ params }: { params: IParams }
) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string")
		throw new Error("Invalid ID");

	const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

	const user = await userUpdate(currentUser, favoriteIds);

	return NextResponse.json(user);
};

export const DELETE = async (
	request: Request,
	{ params }: { params: IParams }
) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string")
		throw new Error("Invalid ID");

	const favoriteIds = [...(currentUser.favoriteIds || [])].filter(
		(id) => id !== listingId
	);

	const user = await userUpdate(currentUser, favoriteIds);

	return NextResponse.json(user);
};

// const user = await prisma.user.update({
// 	where: {
// 		id: currentUser.id,
// 	},
// 	data: {
// 		favoriteIds,
// 	},
// });
