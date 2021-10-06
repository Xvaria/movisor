import React, {useEffect, useState} from 'react'
import './popup.css'

function Popup(props) {

    const [more, setMore] = useState();
    const fetchApi2 = async () => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=71241934&t=${props.value}&type=movie`);
        console.log(response.statusText);
        const responseJSON = await response.json();
        setMore(responseJSON);
        console.log(responseJSON);
    }

    useEffect(() => {
        fetchApi2()
    }, [props.count]);

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger({value: false})}>close</button>
                <ul>
                    <li>
                        <h1>{more.Title}</h1>
                        <img src={more.Poster}/>
                        <h2>{more.Type}</h2>
                        <h3>{more.Year}</h3>
                        <h3>{more.Plot}</h3>
                    </li>
                </ul>
                {props.children}
            </div>
        </div>
    ) : ""
}

export default Popup
