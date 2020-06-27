import React, {useEffect} from 'react';

const RepoDetail = (props)=>{
    
    console.log(props);

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
    });
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