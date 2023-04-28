import { Nunito } from "next/font/google";
import "./globals.css";
import {
	Modal,
	Navbar,
	RegisterModal,
	LoginModal,
	RentModal,
	ClientOnly,
} from "./components";
import ToasterProvider from "./providers/toasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

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
					{/* <Modal actionLabel="submit" title="hello world" isOpen /> */}
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<RentModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
