import { Camera } from 'lucide-react';

function PhotoCountSelector({ onSelect }) {
    const options = [1, 2, 3, 4];

    return (
        <div className="screen">
        <div className="container">
            <Camera size={64} className="icon" />
            <h1>How many photos?</h1>
            <p className="subtitle">Select the number of photos for your strip</p>
        
            <div className="photo-count-grid">
                {options.map(count => (
                    <button 
                        key={count}
                        className="count-button"
                        onClick={() => onSelect(count)}
                    >
                        <div className="count-number">{count}</div>
                        <div className="count-label">
                            {count === 1 ? 'Photo' : 'Photos'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
);
}

export default PhotoCountSelector;