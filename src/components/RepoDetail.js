import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const RepoDetail = (props)=>{
    console.log(props);

    const [ repoDetail, setRepoDetail ] = useState();
    const [ repoContent, setRepoContent ] = useState();

    const parentWindowHeight = props.history.action === "PUSH" ? document.body.scrollHeight : 'auto';
    
    const [ pageWindowHeight, setPageWindowHeight ] = useState(parentWindowHeight);

    const paramsAuthorname = props.match.params.full_name;
    const paramsReponame = props.match.params.name;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        receiveReopInfo(paramsAuthorname, paramsReponame);
    },[paramsAuthorname]);

    const receiveReopInfo = async(author, name) =>{

        // https://developer.github.com/v3/repos/
        const repoInfoUrl = "https://api.github.com/repos/"+author+"/"+name+"";

        // https://developer.github.com/v3/repos/contents/
        const repoContentUrl = "https://api.github.com/repos/"+author+"/"+name+"/readme";

        console.log(repoInfoUrl);

        console.log(repoContentUrl);

        await axios.get(repoInfoUrl)
        .then(result => {
            console.log(result.data);

            setRepoDetail(result.data);

        });

        await axios.get(repoContentUrl)
        .then(contentResult => {
            console.log(contentResult.data);

            var readmeDecode = atob(contentResult.data.content);
            setRepoContent(readmeDecode);

            var readmeContentContainer = document.querySelector('.repoDetails').scrollHeight;
            var windowScrollHeight = document.body.scrollHeight;
            if( readmeContentContainer > windowScrollHeight ){
                var contentHeight = "auto";
            }else{
                var contentHeight = windowScrollHeight;
            }
            setPageWindowHeight(contentHeight)
        });
    }

    return(
        <div className="repoDetails flex" style={{ height: pageWindowHeight }}>
            <nav className="navbar navbar-dark bg-dark justify-content-between text-white">
                <div className="row">
                    <div className=" col-md-4 col-4">
                        <div className="navbar-brand" style={{ cursor : 'pointer'}} onClick={()=> props.history.goBack() }>
                            <span className="fa fa-long-arrow-left mr-3"></span>
                            Back
                        </div>
                    </div>
                    <div className="col-4 mt-2 text-center">{props.match.params.full_name}/{props.match.params.name}</div>
                    <div className="col-4"></div>
                </div>
            </nav>
            <div className="container">
                { repoDetail &&
                    (
                        <div className="row">
                            <div className="col-md-4 mt-2">
                                <div className="d-flex">
                                    <img src={repoDetail.owner.avatar_url} className="ownerAvatar" />
                                </div>
                                <ul className="list-unstyled mt-2">
                                    <li>
                                        <span className="fa fa-user text-muted mr-1"></span>
                                        { repoDetail.owner.login }
                                    </li>
                                    <li className="mt-1">
                                        <span className="fa fa-link text-muted mr-1"></span>
                                        <a href={ repoDetail.owner.html_url } target="_blank" rel="noopener noreferrer">
                                            { repoDetail.owner.html_url }
                                        </a>
                                    </li>
                                    
                                    <li className="mt-4">
                                        <span className="fa fa-github text-primary mr-1"></span>
                                        { repoDetail.name }
                                    </li>
                                    <li className="mt-1">
                                        <span className="fa fa-link text-muted mr-1"></span>
                                        <a href={ repoDetail.html_url } target="_blank" rel="noopener noreferrer">
                                            { repoDetail.html_url }
                                        </a>
                                    </li>
                                    <li className="mt-4">
                                        <span className="fa fa-exclamation-circle text-muted  mr-1"></span> Issues : { repoDetail.open_issues }
                                    </li>
                                    <li className="mt-4">
                                        <span className="fa fa-code-fork text-muted mr-1"></span>
                                        Default Branch : { repoDetail.default_branch }
                                    </li>
                                </ul>
                                
                            </div>
                            <div className="col-md-8 mt-4 border-left border-gray">
                                <div className="card mb-2">
                                    <div className="card-block">
                                        <div className="card-title mt-2 pb-2 font-weight-bolder border-bottom">README.md</div>
                                        <div className="card-body">
                                            <ReactMarkdown source={repoContent} escapeHtml={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RepoDetail;