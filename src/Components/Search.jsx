import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.jsx';
import axios from 'axios';
import { getWeatherService } from './services/weatherService.service'

const Search = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState({ message: ``, type: ``, display: false });

    const getSearch = async () => {
        const returnedData = await getWeatherService();
        if (returnedData instanceof Error) {
            setError({
                message: noDataMessageStart + returnedData.message,
                type: `get`,
                display: true,
            });
            setSearch([]);
        }
    }

}

const getTodos = async () => {
    const returnedData = await getTodosService();
    Array.isArray(returnedData) && setTodos(returnedData);
    if (returnedData instanceof Error) {
        setError({
            message: noDataMessageStart + returnedData.message,
            type: `get`,
            display: true,
        });
        setTodos([]);
    }
}

useEffect(() => {
    getTodos();
}, []);

export default Search;