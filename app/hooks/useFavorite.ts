import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { safeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
	listingId: string;
	currentUser?: safeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) return loginModal.onOpen();

			try {
				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorite/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorite/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success("Nice one!");
			} catch (error) {
				toast.error("Oops, something is not quite alright");
			}
		},
		[currentUser, listingId, hasFavorited, loginModal, router]
	);

	return { hasFavorited, toggleFavorite };
};

export default useFavorite;
