import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Reposlist from './Reposlist';

const Main = () => {

    const [ searchRepoInput, setSearchRepoInput ] = useState('');
    const [isEmptySearchClass, setisEmptySearchClass] = useState('searchInput');

    const [ sortRepo, setSortRepo] = useState('star');
    const [ oderRepo, setOrderRepo ] = useState('desc');
    const [ sortReposPerPage, setSortReposPerPage ] = useState(10);

    const [repos, setRepos ] = useState([]);

    const [totalRepos , setTotalRepos] = useState(0);
    const [ reposPageNo, setReposPageNo ] = useState(1);

    useEffect(() => {
        if(searchRepoInput !== ''){
            receiveRepoData();
        }
    }, [reposPageNo]);

    const handleSearchOnChange = (e) =>{
        setSearchRepoInput(e.target.value);
    }

    const receiveRepoData = async() =>{
        // https://developer.github.com/v3/repos/
        // https://developer.github.com/v3/guides/traversing-with-pagination/

        const repoSearchUrl = "https://api.github.com/search/repositories?q="+searchRepoInput+"&sort="+sortRepo+"&order="+oderRepo+"&per_page="+sortReposPerPage+"&page="+reposPageNo+"";

        console.log(repoSearchUrl);

        await axios.get(repoSearchUrl)
        .then(result => {
            console.log(result.data);

            // update state of repos
            setRepos(result.data);

            setTotalRepos(result.data.total_count);

            // const pageAfterResult = Math.ceil(result.data.total_count / sortReposPerPage);
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

    const handlePageChange = (pageNumber) =>{
        setReposPageNo(pageNumber);
    }

    return(
        <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand">Github</div>
            <form className="form-inline" onSubmit={handleSearchOnSubmit}>
            <input className={isEmptySearchClass} type="search" placeholder="Search repository" onChange={handleSearchOnChange} />
            <button className="searchButton my-2 my-sm-0" type="submit">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            </form>
        </nav>
        <div className="container">
        {totalRepos !== 0 &&
            (
            <div>
                <div className="row">
                    <Reposlist repos={repos} />
                </div>
                <div className="d-flex">
                <Pagination
                    prevPageText='Prev'
                    nextPageText='Next'
                    firstPageText='First'
                    lastPageText='Last'
                    activePage={reposPageNo}
                    itemsCountPerPage={sortReposPerPage}
                    totalItemsCount={totalRepos}
                    pageRangeDisplayed={5}
                    onChange={ handlePageChange }
                    />
                </div>
            </div>
            )
        }
        </div>
        </div>
    );
}

export default Main;