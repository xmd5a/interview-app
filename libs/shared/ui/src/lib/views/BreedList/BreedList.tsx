import React from "react";
import { Link } from "react-router-dom";

import classes from "./BreedList.module.scss";

interface BreedListProps {
	breedList: string[];
	type: string;
}

export const BreedList: React.FC<BreedListProps> = ({ breedList, type }) => {
	const breedsType = type.charAt(0).toUpperCase() + type.slice(1);
	return (
		<div className={classes.wrapper}>
			<h1>{`Welcome in ${breedsType} Gallery`}</h1>
			<h2>{`Select a ${breedsType} Breed`}</h2>
			<ul className={classes.list}>
				{breedList.map((breed) => (
					<li key={breed}>
						<Link to={`/breed/${breed}`} className={classes.link}>
							{breed.charAt(0).toUpperCase() + breed.slice(1)}
						</Link>
					</li>
				))}
				<li key="favorites">
					<Link className={classes.link} to="/favorites">
						Go to favorites
					</Link>
				</li>
			</ul>
		</div>
	);
};
