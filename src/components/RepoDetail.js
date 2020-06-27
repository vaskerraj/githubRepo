import React, {useEffect} from 'react';
import axios from 'axios';

const RepoDetail = (props)=>{
    
    console.log(props);

    const paramsAuthorname = props.match.params.full_name;
    const paramsReponame = props.match.params.name;

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        ReceiveReopInfo(paramsAuthorname, paramsReponame);
    });

    const ReceiveReopInfo = async(author, name) =>{

        // https://developer.github.com/v3/repos/
        const repoInfoUrl = "https://api.github.com/repos/"+author+"/"+name+"";

        console.log(repoInfoUrl);

        await axios.get(repoInfoUrl)
        .then(result => {
            console.log(result.data);
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

            </div>
        </div>
    )
}

export default RepoDetail;