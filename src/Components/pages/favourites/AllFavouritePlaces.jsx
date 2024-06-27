import React from 'react';
import { Link } from 'react-router-dom';
import { removeFavouriteLocation } from '../../../services/userService';
import "../../css/AllFavouritePlaces.css"

const AllFavouritePlaces = ({ favouritePlace, setLoadFavourite }) => {
    const handleRemove = async (location) => {
        const returnedData = await removeFavouriteLocation(location);
        if (!(returnedData instanceof Error)) {
            setLoadFavourite(true);
        } else {
            console.error('Error removing favourite location:', returnedData.message);
        }
    };

    return (
        <div className="container table-container">
            <h2>All Favourite Places</h2>
            {favouritePlace.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Location</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favouritePlace.map((fav, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/weather/${fav.location}`}>{fav.location}</Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemove(fav.location)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No favourite places added yet.</p>
            )}
        </div>
    );
};

export default AllFavouritePlaces;