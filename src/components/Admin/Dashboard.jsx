import { Link } from "react-router-dom";

export default function Dashboard() {

    return(
        <>
        <p>This is the dashboard</p>
        <Link to='/web-admin/images'>Go to images</Link>
        </>
    );
}