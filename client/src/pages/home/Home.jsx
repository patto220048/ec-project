import React, { useEffect, useState } from 'react';
import './Home.module.scss';
import { getUserdata, writeUserData } from '../../database-test/data';
const Home = () => {
    const [user, setUser] = useState();
    console.log(user);
    const mockUser = {
        userId: 1,
        name: 'John',
        email: 'john@example.com',
        imgUrl: 'test.png',
    };
    useEffect(() => {
        try {
            writeUserData(mockUser.userId, mockUser.name, mockUser.email, mockUser.imgUrl);
            getUserdata(1)
                .then((user) => setUser(user))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return <h1>{user?.email || "hello"}</h1>;
};

export default Home;
