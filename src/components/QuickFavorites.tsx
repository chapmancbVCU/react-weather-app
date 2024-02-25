/**
 * @file Short list of frequently used Favorites that is featured on each 
 * route page.
 * @author Chad Chapman
 */
import { Favorite } from '../classes/Favorite';
import FavoritesCard from './FavoritesCard';
import '../css/quickFavorites.css';
import { FC, useEffect, useState } from 'react';
import { Weather } from '../classes/Weather';
import useUnitsToggle from '../hooks/useUnitsToggle';

interface QuickFavoritesProps {
    favorites: Favorite[];
    weather: Weather;
}

const QuickFavorites : FC<QuickFavoritesProps> = ({ favorites, weather }): JSX.Element => {
    /**
     * Set toggle switch for units.
     */
    const { handleToggleChange,
        temperatureUnitsLabel,
        toggled,
    } = useUnitsToggle(weather);
    
    useEffect(() =>  {
        // setQuickFavorites();
    }, [])
    return (
        <div className="quick-favorites-container">
            <h3>Favorites</h3>
            {/* <div className='quick-favorites-content'>
                {favorites.map((favorite: Favorite, index: number) => (
                    <FavoritesCard key={index}
                        favorite={favorite}
                        weather={weather}>
                    </FavoritesCard>
                ))}
            </div> */}
        </div>
    )
}

export default QuickFavorites;