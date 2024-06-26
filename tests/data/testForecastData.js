const testForecastData = {
    list: [
        {
            dt: 1622210400,
            main: {
                temp: 293.15,
            },
            weather: [
                {
                    description: "few clouds",
                    icon: "02d",
                },
            ],
        },
        {
            dt: 1622296800,
            main: {
                temp: 294.15,
            },
            weather: [
                {
                    description: "scattered clouds",
                    icon: "03d",
                },
            ],
        },
        {
            dt: 1622383200,
            main: {
                temp: 295.15,
            },
            weather: [
                {
                    description: "broken clouds",
                    icon: "04d",
                },
            ],
        },
        {
            dt: 1622469600,
            main: {
                temp: 296.15,
            },
            weather: [
                {
                    description: "shower rain",
                    icon: "09d",
                },
            ],
        },
        {
            dt: 1622556000,
            main: {
                temp: 297.15,
            },
            weather: [
                {
                    description: "rain",
                    icon: "10d",
                },
            ],
        },
    ],
    city: {
        name: "Test City",
    },
};

export default testForecastData;
