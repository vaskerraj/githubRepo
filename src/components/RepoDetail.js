import React, {useEffect} from 'react';

const RepoDetail = (props)=>{
    
    console.log(props);
    return(
        <div className="repoDetails">
            <nav className="navbar navbar-dark bg-dark justify-content-between text-white">
                <div className="row">
                    <div className=" col-md-4 col-4">
                        <div className="navbar-brand pointer-event" onClick={()=> window.history.back()}>
                            <span className="fa fa-long-arrow-left mr-3"></span>
                            Back
                        </div>
                    </div>
                    <div className="col-4">{props.match.params.name}</div>
                    <div className="col-4"></div>
                </div>
            </nav>
            <div className="container"></div>
        </div>
    )
}

export default RepoDetail;