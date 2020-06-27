import React , {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Reposlist from './Reposlist';

const Main = () => {

    const [ searchRepoInput, setSearchRepoInput ] = useState('');
    const [isEmptySearchClass, setisEmptySearchClass] = useState('searchInput');

    const [ sortRepo, setSortRepo] = useState('');
    const [ orderRepo, setOrderRepo ] = useState('desc');
    const [ sortReposPerPage, setSortReposPerPage ] = useState(10);

    const [repos, setRepos ] = useState([]);

    const [totalRepos , setTotalRepos] = useState(0);
    const [totalPaging, setTotalPaging] = useState(0);
    const [ reposPageNo, setReposPageNo ] = useState(1);

    useEffect(() => {
        if(searchRepoInput !== ''){
            receiveRepoData();
        }
    }, [reposPageNo, sortReposPerPage, sortRepo, orderRepo]);

    const handleSearchOnChange = (e) =>{
        setSearchRepoInput(e.target.value);
    }

    const receiveRepoData = async() =>{
        // https://developer.github.com/v3/repos/
        // https://developer.github.com/v3/guides/traversing-with-pagination/

        const repoSearchUrl = "https://api.github.com/search/repositories?q="+searchRepoInput+"&sort="+sortRepo+"&order="+orderRepo+"&per_page="+sortReposPerPage+"&page="+reposPageNo+"";

        console.log(repoSearchUrl);

        await axios.get(repoSearchUrl)
        .then(result => {
            console.log(result.data);

            // update state of repos
            setRepos(result.data);

            setTotalRepos(result.data.total_count);

            const pageAfterResult = Math.ceil(result.data.total_count / sortReposPerPage);
            setTotalPaging(pageAfterResult);
        });
    }

    const handleSearchOnSubmit = (event) =>{
        event.preventDefault();
        console.log(`target value : ${searchRepoInput}`);

        if(searchRepoInput === ''){
            setisEmptySearchClass('searchInput empty');
            // remove class `empty` after shake end if search input is empty
            document.querySelector('.searchInput').addEventListener('animationend', function(){
                setisEmptySearchClass('searchInput');
            });
            return;
        }

        // call function  for data reterive
        receiveRepoData();
    }

    const handlePageChange = (pageNumber) =>{
        setReposPageNo(pageNumber);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handlePerPageChange = (e) =>{
        setReposPageNo(1); // update state if pageno not exist while per_page change
        setSortReposPerPage(e.target.value);
    }

    const handleSortChange = (e) =>{
        const sortValue = e.target.value;
        console.log(sortValue);

        if(sortValue === "Best match"){
            setSortRepo('');
            setOrderRepo('desc');
        }else if(sortValue === "Fewest star"){
            setSortRepo('stars');
            setOrderRepo('asc');
        }else if(sortValue === "Most star"){
            setSortRepo('stars');
            setOrderRepo('desc');
        }else if(sortValue === "Most forks"){
            setSortRepo('forks');
            setOrderRepo('desc');
        }else if(sortValue === "Fewest forks"){
            setSortRepo('forks');
            setOrderRepo('asc');
        }else if(sortValue === "Recently updated"){
            setSortRepo('updated');
            setOrderRepo('desc');
        }else if(sortValue === "Least recently updated"){
            setSortRepo('updated');
            setOrderRepo('asc');
        }
    }

    return(
        <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand">Github Repo</div>
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
                <div className="row mt-2">
                    <div className="col-md-4 col-6 text-dark border-gray border-right">
                        <h3 className="mt-3 text-left">{repos.total_count} repository results </h3>
                    </div>
                    <div className="col-md-2 col-sm-6 col-6 h-100 text-center text-secondary mt-md-3 mt-4">
                        <div className="mt-1">
                            <span className="pageText mr-2">Page</span>
                            <span className="font-weight-bold">{reposPageNo} / </span> 
                            <span className="font-weight-bold">{totalPaging}</span>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-6 col-6 h-100 text-center border-gray border-left border-right mt-3">
                        <div className="mt-1">
                            <select className="sortPerPage" onChange={(e) => handlePerPageChange(e)} value={sortReposPerPage} >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <span className="mr-2"> Entries </span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-6 h-100 mt-2 text-right">
                        <div className="mt-2">
                            <span className="mr-2">Sort</span>
                            <select className="sortRepos" onChange={(e) => handleSortChange(e)} >
                                <option>Best match</option>
                                <option>Most star</option>
                                <option>Fewest star</option>
                                <option>Most forks</option>
                                <option>Fewest forks</option>
                                <option>Recently updated</option>
                                <option>Least recently updated</option>
                            </select>
                        </div>
                    </div>
                </div>
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