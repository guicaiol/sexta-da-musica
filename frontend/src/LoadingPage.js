import React, { useState, useEffect } from 'react';

function LoadingPage() {

    function updateData() {

    }

    useEffect(() => {   
        // Update first time
        updateData();

        // Setup interval to update constantly
        const interval = setInterval(updateData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="LoadingPage">
            Loading...
        </div>
    );
}

export default LoadingPage;
