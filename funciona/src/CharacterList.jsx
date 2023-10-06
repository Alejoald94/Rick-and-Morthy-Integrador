import React, { useState, useEffect } from 'react';
import api from './api';

function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        api.get('character')
            .then(response => {
                setCharacters(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }, []);

    return (
        <div>
            <h2>Characters</h2>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterList;
