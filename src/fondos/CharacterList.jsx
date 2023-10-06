import React, { useState, useEffect } from 'react';
import api from './api';
import pickleRickImage from './fondos/rick.png';
import pickleRickAudio from './audios/Rick.mp3';

function PickleRick() {
    const audioRef = React.useRef(null);

    const playAudio = () => {
        audioRef.current.play();
    };

    return (
        <div 
            style={{
                position: 'fixed',
                right: '10px',
                bottom: '10px',
                cursor: 'pointer'
            }}
            onClick={playAudio}
        >
            <img src={pickleRickImage} alt="Pickle Rick" width="100px" />
            <audio ref={audioRef}>
                <source src={pickleRickAudio} type="audio/mp3" />
            </audio>
        </div>
    );
}



function CharacterList() {
    const [favorites, setFavorites] = useState([]);  // Favoritos
    const [view, setView] = useState('all');  // Vista actual
    const [locationCharacters, setLocationCharacters] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [filters, setFilters] = useState({
        gender: '',
        origin: '',
        location: ''
    });

    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        if (locationCharacters.length === 0) {
            fetchCharacters();
        }
        fetchLocations();
    }, [currentPage, filters, searchName]);
   
    const handleReset = () => {
        setSearchName('');
        setFilters({
            gender: '',
            origin: '',
            location: ''
        });
        setCurrentPage(1);
        setView('all');  // Añade esta línea
        fetchCharacters();
    };
    
    
    

    const fetchCharacters = async () => {
        try {
            const response = await api.get(`character?page=${currentPage}`, {
                params: {
                    name: searchName,
                    gender: filters.gender,
                    origin: filters.origin,
                    location: filters.location
                }
            });
            const { results, info } = response.data;
    
            setCharacters(results);
            setTotalPages(Math.ceil(info.count / ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };
    

    const fetchLocations = async () => {
        try {
            const response = await api.get('location');
            const { results } = response.data;
            setLocations(results);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchCharacters();
    };
    

    const handleRandom = async () => {
        try {
            const totalCharacters = 671; // según la API actual
            const randomId = Math.floor(Math.random() * totalCharacters) + 1;
            const response = await api.get(`character/${randomId}`);
            setCharacters([response.data]);
        } catch (error) {
            console.error('Error fetching random character:', error);
        }
    };
    const handleFavoriteToggle = (character) => {
        if (favorites.some(fav => fav.id === character.id)) {
            setFavorites(prev => prev.filter(fav => fav.id !== character.id));
        } else {
            setFavorites(prev => [...prev, character]);
        }
    };
    

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "location") {
            handleLocationChange(e);
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleLocationChange = async (e) => {
        const locationName = e.target.value;
   
        if (!locationName) {
            setLocationCharacters([]);
            fetchCharacters();
            return;
        }
   
        try {
            const locationResponse = await api.get('location', {
                params: {
                    name: locationName
                }
            });
            const locationId = locationResponse.data.results[0].id; 
   
            const specificLocationResponse = await api.get(`location/${locationId}`);
            const characterIds = specificLocationResponse.data.residents.map(url => 
                url.split("/").pop()
            );
   
            const characterDetails = await Promise.all(characterIds.map(id => api.get(`character/${id}`)));
            const characters = characterDetails.map(response => response.data);
            
            setLocationCharacters(characters);
        } catch (error) {
            console.error('Error fetching characters for location:', error);
        }
    };
    
    const handleViewToggle = () => {
        setView(prev => prev === 'all' ? 'favorites' : 'all');
    };
    const handleLogout = () => {
        // Elimina el token o datos de sesión
        localStorage.removeItem('authToken');
    
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '/login'; // Asume que '/login' es tu ruta de inicio de sesión
    };
    
    

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100vh',
        padding: '20px',
        backgroundImage: "url('./fondos/elegir.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
        fontFamily: "'Arial', sans-serif"
    };

    const rowStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        marginTop: '20px',
        gap: '20px'
    };

    const cardVariations = [
        { backgroundColor: '#FFE4B5', borderColor: '#FFDAB9', borderWidth: '2px' },
        // ... (otros colores)
    ];

    const cardStyle = {
        ...cardVariations[0], 
        flexBasis: 'calc(20% - 20px)', 
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        overflow: 'auto',
        transition: 'transform 0.3s, boxShadow 0.3s',
        color: '#333',
        ':hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 5px 25px rgba(0, 0, 0, 0.15)'
        }
    };

    const imageStyle = {
        width: '100%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '15px'
    };

    const searchStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        marginBottom: '20px'
    };

    const inputStyle = {
        padding: '10px 20px',
        border: '2px solid #007BFF',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '600'
    };

    return (
        <div style={containerStyle}>
            <h2>Personajes</h2>
            
            <div style={searchStyle}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    style={inputStyle} 
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />

                <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                    <option value="">Género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                </select>

                <select name="origin" value={filters.origin} onChange={handleFilterChange}>
                    <option value="">Origen</option>
                </select>

                <select name="location" value={filters.location} onChange={handleFilterChange}>
                    <option value="">Ubicación</option>
                    {locations.map(location => (
                        <option key={location.id} value={location.name}>{location.name}</option>
                    ))}
                </select>

                

                <button onClick={handleRandom}>
                    Random
                </button>
                <button onClick={handleViewToggle}>
                 {view === 'all' ? 'Ver Favoritos' : 'Ver Todos'}
                </button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
                <button onClick={handleReset}>
                   Reset
                </button>

            </div>
            
            <div style={rowStyle}>
        {(view === 'all' 
            ? (locationCharacters.length > 0 ? locationCharacters : characters)
            : favorites)
        .slice(0, 8).map((character) => (
        <div style={cardStyle} key={character.id}>
            <div className="img">
                <img src={character.image} alt={character.name} style={imageStyle} />
            </div>
            <div className="content">
                <h3>{character.name}</h3>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Type:</strong> {character.type ? character.type : "N/A"}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
                <button onClick={() => handleFavoriteToggle(character)}>
                    {favorites.some(fav => fav.id === character.id) ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    ))}
    <PickleRick />

</div>
{view === 'all' && totalPages > 1 && (
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        )}
</div>
    );
}


const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const goToPreviousPage = () => onPageChange(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => onPageChange(prev => Math.min(prev + 1, totalPages));
    const goToPage = (number) => onPageChange(number);

    const paginationStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    };

    const buttonBaseStyle = {
        padding: '10px 20px',
        margin: '0 10px',
        border: '2px solid #007BFF',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        color: '#007BFF'
    };

    const activeButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#007BFF',
        color: 'white',
        transform: 'scale(1.05)'
    };

    const inactiveButtonStyle = {
        ...buttonBaseStyle,
        ':hover': {
            backgroundColor: '#e6f0ff',
            transform: 'scale(1.05)'
        }
    };

    let startPage = currentPage - 2;
    let endPage = currentPage + 1;

    if (startPage <= 1) {
        startPage = 1;
        endPage = 4;
    }

    if (endPage > totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages;
    }

    if (totalPages <= 4) {
        startPage = 1;
        endPage = totalPages;
    }

    const pagesToShow = [...Array(endPage + 1 - startPage).keys()].map(i => i + startPage);

    return (
        <div style={paginationStyle}>
            <button 
                style={inactiveButtonStyle} 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                Atrás
            </button>
            {pagesToShow.map(pageNumber => (
                <button 
                    key={pageNumber} 
                    onClick={() => goToPage(pageNumber)}
                    style={currentPage === pageNumber ? activeButtonStyle : inactiveButtonStyle}
                >
                    {pageNumber}
                </button>
            ))}
            <button 
                style={inactiveButtonStyle} 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
}

export default CharacterList;
