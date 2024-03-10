import React from "react";
import { Link } from "react-router-dom";

export default function Images() {

    return(
        <>
        <p>This are the images</p>
        <Link to='/web-admin' className="underline">Go to dashboard</Link>
        </>
    );
}