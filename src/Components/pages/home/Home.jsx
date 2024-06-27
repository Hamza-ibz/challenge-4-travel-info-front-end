
import Search from "./Search";
const Home = () => {

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <div className="col-6 text-center">
                        <h1>Tell Me About...</h1>
                        <Search />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;