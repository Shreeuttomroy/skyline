import { Link } from 'react-router-dom';
import ERROR from './E404.png'

function ErrorPage() {
    return (
        <>
            <div className=" mx-auto text-center w-96 bg-base-100">
                <figure><img src={ERROR} alt="Shoes" /></figure>
                <Link className='btn' to={"/"}>Back to Home</Link>
            </div>
        </>
    );
}

export default ErrorPage;