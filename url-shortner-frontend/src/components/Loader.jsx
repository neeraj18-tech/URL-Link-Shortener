import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
            <p className="text-sm text-gray-800 tracking-wide">
                Loading...
            </p>
        </div>
    </div>
    );
};

export default Loader;
