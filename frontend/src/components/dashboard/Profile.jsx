import React, { useState } from "react";
import Dropdown from "../Dropdown";

export default function Profile({ user }) {

    const [toggle, setToggle] = useState(false);

    return (
        <div>
            
            <button className = 'dashboard-profile-button' onClick={() => setToggle(!toggle)}>
                {/* <img src="public\Profile_Icons.png" className="dashboard-avatar"></img> */}
                <span className="hover-underline-animation">{user}</span>
            </button>

            { toggle && (
                <Dropdown 
                    onProfileNavigate = {() => setShowpProfile(true)}
                    
                />
            )}

        </div>
    )
}