import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';


const Reposlist = (props) =>{

    const { repos } = props;

    const kFormatter = (num)=> {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    const truncateDescription = (str, subNum) => {
        return (str !== null && str.length > subNum) ? str.substr(0, subNum-1) + ' ...' : str;
    };
    const listOfRepos = repos.total_count !== undefined ? ( 
        repos.items.map((item)=>{
        const { name, full_name, description, watchers, watchers_count, forks, updated_at } = item;
        return(
            <div className="col-md-4 col-sm-6 col-xs-12 mt-4" key={item.id}>
                <div className="card">
                    <div className="card-block">
                        <div className="card-title font-weight-bolder mt-3">
                    
                        <Link to={`/details/${ full_name }/${ name }`} state={item} >
                            <span className="fa fa-github text-primary" style={{fontSize: "18px"}}></span> {full_name}
                        </Link> 
                        </div>
                        <div className="card-body">
                            <div className="d-flex">{truncateDescription(description, 50)}</div>
                        </div>
                        <div className="card-footer font-weight-light mt-2">
                            <div className="row">
                                <div className="col-8">
                                <span className="fa fa-user text-black-50"></span> {item.owner.login}
                                </div>
                                <div className="col-4">
                                    <span className="fa fa-star-o"></span> {kFormatter(watchers)}
                                </div>
                            </div>
                            <div className="d-flex mt-1">
                                <div className="d-inline-block pr-2">
                                <span className="fa fa-eye"></span> {kFormatter(watchers_count)}
                                </div>
                                <div className="d-inline-block pl-4 pr-4">
                                    <span className="fa fa-code-fork"></span> {kFormatter(forks)}
                                </div>
                                <div className=" pr-2">
                                    <span className="fa fa-clock-o"></span> <Moment fromNow>{updated_at}</Moment>
                                </div>
                            </div>
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