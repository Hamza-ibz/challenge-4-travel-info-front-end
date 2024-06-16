import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
import { getWeatherService } from '../services/weatherService';
import { useNavigate } from 'react-router-dom';
import InfoModal from './utils/InfoModal';

const Search = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState({ message: ``, type: ``, display: false });
    const navigate = useNavigate();

    const getSearch = async () => {
        // if (!search.trim()) return;
        const returnedData = await getWeatherService(search);
        if (returnedData instanceof Error) {
            setError({
                message: returnedData.message,
                type: `get`,
                display: true,
            });
            setSearch('');
        } else {
            setError({
                message: returnedData.message,
                type: `get`,
                display: false,
            });
            // console.log(returnedData);
            navigate(`/weather/${search}`);
        }
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const submit = (event) => {
        event.preventDefault();
        getSearch();
    };

    return (
        <div>
            <form onSubmit={submit}>
                <input className="form-control mr-sm-2 mb-2 search-box" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                <button className="btn btn-dark my-2 my-sm-0" type="submit" >Search</button>
            </form>
            {error.display ? <p>Location not found, please check input</p> : null}
            {error.display && <InfoModal closeModal={() => setError({ ...error, display: false })} message={"Location not found, please check input. (" + error.message + ")"} />}

        </div>
    );

}


export default Search;