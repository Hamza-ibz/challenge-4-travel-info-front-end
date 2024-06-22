import React from 'react';
import { Link } from 'react-router-dom';

const AllFavouritePlaces = ({ favouritePlace }) => {
    return (
        <div className="container">
            <h2>All Favourite Places</h2>
            {favouritePlace.length > 0 ? (
                <ul>
                    {favouritePlace.map((fav, index) => (
                        <li key={index}>
                            <Link to={`/weather/${fav.location}`}>{fav.location}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favourite places added yet.</p>
            )}
        </div>
    );
};

export default AllFavouritePlaces;