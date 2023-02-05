import Sidebar from '@/Layouts/Sidebar'
import React from 'react'

const Profile = ({ user }) => {
    return (
        <Sidebar active={'dashboard'} user={user}>
            <div>Profile</div>
        </Sidebar>
    )
}

export default Profile
