import React from 'react';

function UserProfile() {
    return (
        <div className="container my-5">
            <h1>Welcome to your profile</h1>
            <p>This is the user profile page accessible only to users with the role "USER".</p>
        </div>
    );
}

export default UserProfile;
