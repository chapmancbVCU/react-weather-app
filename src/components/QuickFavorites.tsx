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

interface QuickFavoritesProps {
    weather: Weather;
}

const QuickFavorites : FC<QuickFavoritesProps> = ({ weather }): JSX.Element => {

    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const setQuickFavorites = () => {
        const temp: Favorite[] = [];
        temp.push(new Favorite("Newport News, Virginia", "US", 36.9788, -76.428, 5));
        temp.push(new Favorite("Marion, Virginia", "US", 39.76844, -86.1555, 3));
        temp.push(new Favorite("London, England", "GB", 51.5085, -0.1257, 2));
        setFavorites(temp);
    }

    useEffect(() =>  {
        setQuickFavorites();
    }, [])
    return (
        <div className="quick-favorites-container">
            <h3>Favorites</h3>
            <div className='quick-favorites-content'>
                {favorites.map((favorite: Favorite, index: number) => (
                    <FavoritesCard key={index}
                        favorite={favorite}
                        weather={weather}>
                    </FavoritesCard>
                ))}
            </div>
        </div>
    )
}

export default QuickFavorites;