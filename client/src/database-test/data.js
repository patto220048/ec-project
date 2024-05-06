import { app } from '../untils/firebase/config';
import { getDatabase, ref, set, onValue, get,child } from 'firebase/database';

export function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl,
    });
}

export const getUserdata = (userId) => {
    const db = getDatabase();
    const dbRef = ref(db);
   const user = get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
               return snapshot.val();
            } else {
               return 'No data available';
            }
        })
        .catch((error) => {
           return error;
        });
    return user
};
