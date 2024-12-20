import React from "react";

function Prohead(props) {
    return (
        <section className="section-h1">
            <div className="proHead">
                <h2>{props.heading}</h2>
            </div>
        </section>
    )
}

export default Prohead;