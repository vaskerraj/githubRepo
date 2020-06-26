import React from 'react';

const Reposlist = (props) =>{
    const { repos } = props;
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
                            <div className="d-flex">{description}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    ):(
        <div></div>
    );

    return(
        <>{listOfRepos}</>
    )
}

export default Reposlist;