import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const RepoDetail = (props)=>{
    console.log(props);

    const [ repoDetail, setRepoDetail ] = useState();
    const [ repoContent, setRepoContent ] = useState();

    const paramsAuthorname = props.match.params.full_name;
    const paramsReponame = props.match.params.name;

    useEffect(() => {
        // disable browser overflow
        // document.documentElement.style.overflow = 'hidden';
        // document.body.scroll = "no";

        receiveReopInfo(paramsAuthorname, paramsReponame);

    },[paramsAuthorname, paramsReponame]);

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
            
            document.querySelector(".readmeContent").innerHTML = readmeDecode;
            setRepoContent(readmeDecode);

        });
    }

    return(
        <div className="repoDetails">
            <nav className="navbar navbar-dark bg-dark justify-content-between text-white">
                <div className="row">
                    <div className=" col-md-4 col-4">
                        <div className="navbar-brand" style={{ cursor : 'pointer'}} onClick={()=> window.history.back()}>
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
                                    <img src={repoDetail.owner.avatar_url} className="Owner-avatar" />
                                </div>
                                <ul className="list-unstyled mt-2">
                                    <li><span className="fa fa-user text-muted"></span> { repoDetail.owner.login }</li>
                                    <li className="mt-1"><span className="fa fa-link text-muted"></span> <a href={ repoDetail.owner.html_url } target="_blank">{ repoDetail.owner.html_url }</a></li>
                                    <li className="mt-4"><span className="fa fa-github text-primary"></span> { repoDetail.name }</li>
                                    <li className="mt-1"><span className="fa fa-link text-muted"></span> <a href={ repoDetail.html_url } target="_blank">{ repoDetail.html_url }</a></li>
                                    <li className="mt-4"><span className="fa fa-exclamation-circle text-muted"></span> Issues : { repoDetail.open_issues }</li>
                                    <li className="mt-4"><span className="fa fa-code-fork text-muted"></span> Default Branch : { repoDetail.default_branch }</li>
                                </ul>
                                
                            </div>
                            <div className="col-md-8 mt-4 border-left border-gray">
                                <ReactMarkdown source={repoContent} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RepoDetail;