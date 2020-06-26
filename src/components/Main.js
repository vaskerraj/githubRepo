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

    const [repos, setRepos ] = useState([]);

    const [ pagination, setPagination ] = useState('');

    const handleSearchOnChange = (e) =>{
        setSearchRepoInput(e.target.value);
    }

    const receiveRepoData = async() =>{
        // https://developer.github.com/v3/repos/
        // https://developer.github.com/v3/guides/traversing-with-pagination/

        const repoSearchUrl = "https://api.github.com/search/repositories?q="+searchRepoInput+"&sort="+sortRepo+"&order="+oderRepo+"&per_page="+sortReposPerPage+"&page=1";

        await axios.get(repoSearchUrl)
        .then(result => {
            console.log(result.data);

            // update state of repos
            setRepos(result.data);

            const link = result.headers.link;
            const links = link.split(",");
            const urls = links.map(urlItem=> {
                return {
                    url: urlItem.split(";")[0].replace(">","").replace("<",""),
                    title:urlItem.split(";")[1]
                }
            });
            console.log(urls);
            setPagination(urls);
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

    const listOfRepos = repos.total_count !== undefined ? ( 
        repos.items.map((items)=>{
        const { full_name, description } = items;
        return(
            <div className="col-md-4 col-sm-6 col-xs-12 mt-4" key={items.id}>
                <div className="card">
                    <div className="card-block">
                        <div className="card-title font-weight-bolder mt-3">
                            {full_name}
                        </div>
                        <div className="card-body">
                           {description} 
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    ):(
        <div></div>
    );

    const repoPagnination = pagination.length !== 0 ? (
        pagination.map((item)=>{
            var pagingTitleWithQuote = item.title.split("=")[1],
                pagingTitle = pagingTitleWithQuote.replace(/["]/g, ""),
                pagingNumber = item.url.split("page=")[1];
            console.log(`page number : ${pagingNumber} and page title : ${pagingTitle}`);
            return <div className="pagination"><li key={item.title}>{pagingTitle}</li></div>
        })
    ): (
        <div></div>
    )

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
            <div className="row">
                {listOfRepos}
            </div>
            <div className="d-flex">
                {repoPagnination}
            </div>
        </div>
        </div>
    );
}

export default Main;