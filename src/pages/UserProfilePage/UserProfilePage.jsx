import React, { useState, useContext } from 'react';
import { Wallet, ProfileModal, UserBanner, MinBalance } from '../../components';
import { AppWrap } from '../../wrapper';
import { sessionContext } from '../../context';
import { Navigate } from 'react-router-dom';

const UserProfilePage = (props) => {
    const { user } = useContext(sessionContext);

    const [editing, setEditing] = useState(false);

    function editContent() {
        setEditing(true);
    }

    function changeEditState() {
        setEditing(!editing);
    }

    if (user && user.verified_user) {
        return (
            <div className="relative flex h-full w-full flex-col items-center md:items-start">
                {editing && (
                    <ProfileModal changeEdit={changeEditState} updateUser={props.props.update} />
                )}
                <div
                    className={`flex h-full w-full flex-col items-center md:items-start ${
                        editing && 'z-0 blur-sm'
                    }`}
                >
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <div className="mt-[1rem] flex w-full flex-col md:flex-row">
                        <UserBanner
                            editing={editing}
                            photoUrl={props.props.url}
                            editContent={editContent}
                        />
                        <MinBalance />
                    </div>
                    <Wallet />{' '}
                </div>
            </div>
        );
    } else {
        return <Navigate to="/" replace={true} />;
    }
};

export default AppWrap(UserProfilePage);
