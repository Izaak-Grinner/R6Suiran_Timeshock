import { useNavigate } from "react-router-dom";
import { Client, Storage, ID } from "appwrite"; // Importing only Client and Storage from appwrite
import { dbID } from '../appwrite';

const Home = () => {
    const navigate = useNavigate();
    const changePage = (index) => {
        var path = "/" + index;
        navigate(path);
    };

    const client = new Client()
        .setEndpoint(dbID.endpoint)
        .setProject(dbID.project);

    const storage = new Storage(client); // Initialize Storage

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        try {
            const result = await storage.createFile(
                dbID.bucket, // bucketId
                ID.unique(), // Generate a unique file ID
                file, // file
                [] // permissions(optional)
            );
            console.log(result); // Log the result which contains the file information
        } catch (error) {
            console.error(error); // Log any errors that occur during the upload
        }
    };

    return (
        <div className="Page">
            <center>
                <div className="button">
                    <button onClick={() => changePage("")}>homeへ</button>
                    <p>データベースを登録する</p>
                    <input id="uploader" type="file" onChange={handleFileUpload} /> {/* Input for file upload */}
                    <p></p>
                </div>
            </center>
        </div>
    );
};

export default Home;
