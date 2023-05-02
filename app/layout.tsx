import { Nunito } from "next/font/google";
import "./globals.css";
import {
	Navbar,
	RegisterModal,
	LoginModal,
	RentModal,
	ClientOnly,
	SearchModal,
} from "./components";
import ToasterProvider from "./providers/toasterProvider";
import { getCurrentUser } from "./actions/";

export const metadata = {
	title: "RentBNB",
	description: "Created by Abolfazl Omidvar",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<RentModal />
					<SearchModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
