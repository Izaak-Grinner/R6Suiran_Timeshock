import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const changePage = (index) => {
        var path = "/" + index;
        navigate(path);
    };


    return (
        <div className="Page">
            <center>
                <button onClick={() => changePage("")}>homeへ</button>
                <p></p>
                <div class="quizSetting">
                    クイズの難易度
                    <input id="quizLevel"></input>
                    <button onClick={() => changePage("TimeShock")}>クイズを始める</button>

                </div>
            </center>

        </div>
    );
};

export default Home;
