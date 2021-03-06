import React from 'react';

const Spinner = (props) =>{
    return(
        <div className="flex justify-content-center loading" style={{ display : props.isLoading}}>
            <div style={{ position : "absolute", top: "30%", left : "48%"}}>
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            </div>
        </div>
    )
}
export default Spinner;