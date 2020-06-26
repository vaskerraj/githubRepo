import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { faUserAlt, faStar, faEye, faClock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        const { full_name, description, watchers, watchers_count, forks, updated_at } = item;
        return(
            <div className="col-md-4 col-sm-6 col-xs-12 mt-4" key={item.id}>
                <div className="card">
                    <div className="card-block">
                        <div className="card-title font-weight-bolder mt-3">
                            {full_name}
                        </div>
                        <div className="card-body">
                            <div className="d-flex">{truncateDescription(description, 50)}</div>
                            <div className="d-flex mt-3">
                                <span className="d-inline-block pr-2">
                                    <FontAwesomeIcon icon={faUserAlt} className="text-muted mt-1 mr-1"/> {item.owner.login}
                                </span>
                                <span className="d-inline-block pl-2">
                                    <FontAwesomeIcon icon={faStar} className="text-success" /> {kFormatter(watchers)}
                                </span>
                            </div>
                            <div className="d-flex text-black-50 text-right mt-1">
                                <span className="d-inline-block pr-2">
                                    <FontAwesomeIcon icon={faEye} color="text-danger" /> {kFormatter(watchers_count)}
                                </span>
                                <span className="d-inline-block pl-2">
                                    <FontAwesomeIcon icon={faStar} color="#ddd" /> {kFormatter(forks)}
                                </span>
                                <span className="d-inline-block pl-2">
                                    <FontAwesomeIcon icon={faClock} color="#ddd" /> <Moment fromNow>{updated_at}</Moment>
                                </span>
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