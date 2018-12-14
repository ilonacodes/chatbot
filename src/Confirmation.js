import React from 'react';

export const Confirmation = ({fields}) => {
    return (
        <div>
            <div>You are signing up with the following info:</div>
            <div>
                <p className="name">{fields.name}</p>
                <p>{fields.usageFor}</p>
                <p>{fields.email}</p>
                <p>{fields.relatedUpdates}</p>
            </div>
        </div>
    );
};