/**
 * @file Short list of frequently used Favorites that is featured on each 
 * route page.
 * @author Chad Chapman
 */
import '../css/quickFavorites.css';

const QuickFavorites = (): JSX.Element => {

    return (
        <div className="quick-favorites-container">
            <h3>Favorites</h3>
            <div className='quick-favorites-content'>
                <div className='favorites-card'>test</div>
                <div className='favorites-card'>test</div>
                <div className='favorites-card'>test</div>
            </div>
        </div>
    )
}

export default QuickFavorites;