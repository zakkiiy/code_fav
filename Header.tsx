"use client";

import Login from '../components/Login';
import Logout from '../components/Logout'
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div>
        {status === 'authenticated' ? (
          <div>
            <p>ようこそ、{session.user?.name}さん</p>
            <img
              src={session.user?.image ?? ``}
              alt=""
              style={{ borderRadius: '50px' }}
            />
            <div>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default Header;
