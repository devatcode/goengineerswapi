import React, { useState, useEffect, useCallback } from "react";
import $ from "jquery"; // Import jQuery
import StarshipCard from "./StarshipCard";
import StarshipModal from "./ShipModal";
import "./StarShips.scss";

const StarShips = () => {
	const [starships, setStarships] = useState([]);
	const [nextPage, setNextPage] = useState("https://swapi.dev/api/starships/");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [selectedStarship, setSelectedStarship] = useState(null);

	// Fetch Starships using jQuery
	const fetchStarships = useCallback(() => {
		if (!nextPage) return;

		setLoading(true);
		setError(null);

		$.ajax({
			url: nextPage,
			method: "GET",
			dataType: "json",
			success: (data) => {
				const shuffledStarships = [...starships, ...data.results].sort(
					() => Math.random() - 0.5
				);
				setStarships(shuffledStarships);
				setNextPage(data.next);
				setLoading(false);
			},
			error: (jqXHR, textStatus, errorThrown) => {
				setError(`Error: ${textStatus} - ${errorThrown}`);
				setLoading(false);
			},
		});
	}, [nextPage, starships]);

	// Fetch starships when the component mounts
	useEffect(() => {
		fetchStarships();
	}, [fetchStarships]);

	// Filter starships based on search input
	const filteredStarships = starships.filter((ship) =>
		ship.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Sort starships by cost (ascending or descending)
	const sortedStarships = [...filteredStarships].sort((a, b) => {
		const costA = parseInt(a.cost_in_credits, 10) || 0;
		const costB = parseInt(b.cost_in_credits, 10) || 0;

		return sortOrder === "asc" ? costA - costB : costB - costA;
	});

	return (
		<div className="container">
			<h1>Star Wars Starships</h1>

			{/* Search & Sorting Controls */}
			<div className="controls">
				<input
					type="text"
					placeholder="Search starships..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value)}
				>
					<option value="asc">Sort by Cost: Low to High</option>
					<option value="desc">Sort by Cost: High to Low</option>
				</select>
			</div>

			{error && <p className="error">{error}</p>}

			<div className="grid">
				{sortedStarships.map((ship, index) => (
					<StarshipCard
						key={index}
						ship={ship}
						onClick={() => setSelectedStarship(ship)}
					/>
				))}
			</div>

			{loading && <p>Loading...</p>}

			{nextPage && !loading && (
				<button className="load-more" onClick={fetchStarships}>
					Load More
				</button>
			)}

			{/* Modal */}
			{selectedStarship && (
				<StarshipModal
					ship={selectedStarship}
					onClose={() => setSelectedStarship(null)}
				/>
			)}
		</div>
	);
};

export default StarShips;
