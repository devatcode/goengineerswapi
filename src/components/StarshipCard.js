import React, { useState, useEffect } from "react";
import "./StarshipCard.scss";

const StarshipCard = ({ ship, onClick }) => {
	const [imgSrc, setImgSrc] = useState(null);
	const [isValidImage, setIsValidImage] = useState(false);

	function getStarshipImage(url) {
		const id = url.match(/\/([0-9]+)\/$/)?.[1];
		return id
			? `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
			: null;
	}

	useEffect(() => {
		const img = new Image();
		const src = getStarshipImage(ship.url);

		if (!src) return;

		img.src = src;
		img.onload = () => {
			setImgSrc(src);
			setIsValidImage(true);
		};
		img.onerror = () => {
			setIsValidImage(false);
		};
	}, [ship.url]);

	if (!isValidImage) return null;

	return (
		<div className="card" onClick={onClick}>
			<img src={imgSrc} alt={ship.name} className="image" />
			<h2>{ship.name}</h2>
		</div>
	);
};

export default StarshipCard;
