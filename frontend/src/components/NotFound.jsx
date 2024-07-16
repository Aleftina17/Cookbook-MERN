import React from "react";
import BackButton from "./BackButton";

const NotFound = () => {
    return (
        <div className="not-found">
              <div className="not-found_num">404</div>
              <div className="not-found_desc">Page not found</div>
              <div className="not-found_desc-sm">The page you are looking for might have been removed, had its name changed or its temporarily unavailable</div>
              <BackButton />
        </div>
    );
};

export default NotFound;
