import prisma from "@/app/libs/prismadb";

import { getSession } from ".";

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return;
		}

		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email as string },
		});
		if (!currentUser) return;

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
			emailVerified: currentUser.emailVerified?.toISOString() || null,
		};
	} catch (error: any) {
		return;
	}
}
