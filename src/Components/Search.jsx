import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getWeatherService } from '../services/weatherService';

const Search = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState({ message: ``, type: ``, display: false });

    const getSearch = async () => {
        // if (!search.trim()) return;
        const returnedData = await getWeatherService(search);
        if (returnedData instanceof Error) {
            setError({
                message: noDataMessageStart + returnedData.message,
                type: `get`,
                display: true,
            });
            setSearch('');
        }
        navigate(`/weather/${response.data.city.name}`);
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    return (
        <div>
            <form onSubmit={getSearch}>
                <input className="form-control mr-sm-2 mb-2 search-box" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                <button className="btn btn-dark my-2 my-sm-0" type="submit" >Search</button>
                {error.display ? <p>Location not found, please check input</p> : null}
            </form>
        </div>
    );

}


export default Search;