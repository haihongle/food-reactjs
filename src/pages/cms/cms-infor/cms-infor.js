import { useEffect, useState } from "react";
import './cms-infor.css';

export default function cmsInfor() {
    const fakeData = {
        fullname: 'Quoc Hieu',
        role: 'BOSS',
        phone: '0847253853',
        email: 'hieu@gmail.com',
        desciption: 'null',
        avatar: 'https://cdn.tuoitre.vn/thumb_w/1200/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756.jpg'
    };

    // const [cmsInfor, setCmsInfor] = useState([]);

    // useEffect(() => {
    //     setCmsInfor(fakeData);  
    // }, []);

    return (
        <div className="cms-infor">
           <div className="infor-details">
           <ul className="infor">
                <li>
                    <img src={fakeData.avatar} ></img>
                    <p>Full Name: {fakeData.fullname}</p>
                    <p>Role: {fakeData.role}</p>
                    <p>Phone: {fakeData.phone}</p>
                    <p>Email: {fakeData.email}</p>
                    <p>Description: {fakeData.desciption}</p>
                </li>
            </ul>
           </div>
           <div className="about-cms-user">
               <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</a>
           </div>
        </div>
    );
}

  
  