import { useState, useEffect } from 'react';
import { User } from '@/models/User';
import { getUser } from '@/services/user';

const DisplayAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUser();
                setUsers(fetchedUsers);
            } catch (err) {
                setError("Failed to load users."); 
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.userId}>
                    <pre>{JSON.stringify(user, null, 2)}</pre> 
                </li>
            ))}
        </ul>
    );
};

export default DisplayAllUsers;