import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {

    const [ searchRepoInput, setSearchRepoInput ] = useState('');
    const [isEmptySearchClass, setisEmptySearchClass] = useState('searchInput');



    const handleSearchOnChange = (e) =>{
        setSearchRepoInput(e.target.value);
    }

    const handleSearchOnSubmit = (event) =>{
        event.preventDefault();
        console.log(`target value : ${searchRepoInput}`);

        if(searchRepoInput === ''){
            setisEmptySearchClass('searchInput empty');
        }

    }
    return(
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand">Github</div>
            <form className="form-inline" onSubmit={handleSearchOnSubmit}>
            <input className={isEmptySearchClass} type="search" placeholder="Search repository" onChange={handleSearchOnChange} />
            <button className="searchButton my-2 my-sm-0" type="submit">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            </form>
        </nav>
    );
}

export default Main;