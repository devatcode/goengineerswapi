import React from "react";
import "./ShipModal.scss";

const StarshipModal = ({ ship, onClose }) => {
	function getStarshipImage(url) {
		const id = url.match(/\/([0-9]+)\/$/)?.[1];
		return id
			? `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
			: null;
	}

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-btn" onClick={onClose}>
					&times;
				</button>
				<img
					src={getStarshipImage(ship.url)}
					alt={ship.name}
					className="modal-image"
				/>
				<h2>{ship.name}</h2>
				<p>
					<strong>Model:</strong> {ship.model}
				</p>
				<p>
					<strong>Manufacturer:</strong> {ship.manufacturer}
				</p>
				<p>
					<strong>Cost:</strong> {ship.cost_in_credits} credits
				</p>
				<p>
					<strong>Passengers:</strong> {ship.passengers}
				</p>
			</div>
		</div>
	);
};

export default StarshipModal;
