import {getElementError} from "@testing-library/react";

const PageNotFound = () => {
    const error = getElementError()

    return (
        <div>
            <h1>Oops...</h1>
            <p>Something went wrong: {error.message}</p>
        </div>
    );

}

export default PageNotFound
