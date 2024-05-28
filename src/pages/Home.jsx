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
                <div class="button">
                    <button onClick={() => changePage("Quiz")}>問題</button>
                    <p></p>
                    <button onClick={() => changePage("SetDatabase")}>DBの設定</button>
                    <p></p>
                </div>
            </center>

        </div>
    );
};

export default Home;
