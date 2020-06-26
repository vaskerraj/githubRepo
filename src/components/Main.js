import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = () => {

    const [ searchRepoInput, setSearchRepoInput ] = useState('');
    const [isEmptySearchClass, setisEmptySearchClass] = useState('searchInput');

    const [ sortRepo, setSortRepo] = useState('star');
    const [ oderRepo, setOrderRepo ] = useState('desc');
    const [ sortReposPerPage, setSortReposPerPage ] = useState(10);



    const handleSearchOnChange = (e) =>{
        setSearchRepoInput(e.target.value);
    }

    const receiveRepoData = async() =>{
        // https://developer.github.com/v3/repos/
        // https://developer.github.com/v3/guides/traversing-with-pagination/

    const [ sortReposPerPage, setSortReposPerPage ] = useState(10);
        const repoSearchUrl = "https://api.github.com/search/repositories?q="+searchRepoInput+"&sort="+sortRepo+"&order="+oderRepo+"&per_page="+sortReposPerPage+"&page=1";

        await axios.get(repoSearchUrl)
        .then(result => {
            console.log(result.data);

        });
    }

    const handleSearchOnSubmit = (event) =>{
        event.preventDefault();
        console.log(`target value : ${searchRepoInput}`);

        if(searchRepoInput === ''){
            setisEmptySearchClass('searchInput empty');
        }

        // call function  for data reterive
        receiveRepoData();
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