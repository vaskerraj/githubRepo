import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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

    const [pageCount, setPageCount ] = useState(0);
    const [ reposPageNo, setReposPageNo ] = useState(1);

    useEffect(() => {
        receiveRepoData();
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

            const pageAfterResult = Math.ceil(result.data.total_count / sortReposPerPage);
            setPageCount(pageAfterResult);
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

    const handlePageChange = (data) =>{
        console.log(data.selected);

        setReposPageNo(data.selected);

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
        {pageCount !== 0 &&
            (
            <div>
                <div className="row">
                    <Reposlist repos={repos} />
                </div>
                <div className="d-flex">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
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