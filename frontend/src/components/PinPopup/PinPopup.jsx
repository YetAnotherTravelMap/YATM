import classes from "./PipPopup.module.css"
import CategoryTag from "../CategoryTag/CategoryTag.jsx";

// eslint-disable-next-line react/prop-types
function PinPopup({pin, onEditRequest, canEditPin}) {

    return (<>
            <h2>{pin.name}</h2>
            <br/>
            <h3>Categories: </h3>
            <CategoryTag value={pin.mainCategory}/>
            <div>
                {pin.categories.map(category => (<CategoryTag value={category} key={category}/>))}
            </div>
            <br/>
            <h3>Description: </h3>
            <div>{pin.description}</div>
            <br/>
            <small>Latitude: {pin.latitude}, Longitude: {pin.longitude}</small>
            <br/>
            {canEditPin && <button onClick={onEditRequest}>Edit
            </button>}
        </>);
}

export default PinPopup;