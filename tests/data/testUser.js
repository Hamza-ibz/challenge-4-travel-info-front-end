const testUsers = {
    users: [
        {
            _id: "60d0fe4f5311236168a109ca",
            email: "testuser1@example.com",
            password: "Password123!",
            favouriteLocations: [
                { location: "New York" },
                { location: "London" },
            ],
        },
        {
            _id: "60d0fe4f5311236168a109cb",
            email: "testuser2@example.com",
            password: "Password123!",
            favouriteLocations: [
                { location: "Paris" },
            ],
        },
    ],
    newUser: {
        email: "newuser@example.com",
        password: "Password123!",
        favouriteLocations: [],
    },
    invalidUser: {
        email: "invaliduser@example.com",
        password: "short",
        favouriteLocations: [],
    },
};

export default testUsers;

