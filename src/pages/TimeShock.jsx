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
                <div></div>
                <button onClick={() => changePage("Quiz")}>戻る</button>
                <p></p>
                タイムショック！
                <div class="quizContent">

                </div>
            </center>

        </div>
    );
};

export default Home;
