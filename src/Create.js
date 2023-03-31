import { useState } from "react";
import {useNavigate } from "react-router-dom";

const Create = () => {
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [author,setAuthor] = useState("");
    const [isPending, setisPending] = useState(false);
    const Navigate = useNavigate();

    const handleSumbit = (e)=>{
        e.preventDefault();
        const blog = {title, body, author};
        setisPending(true);
        fetch("http://localhost:8000/blogs",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log("new blog added")
            setisPending(false);
            Navigate("/");
        })
    }

    return ( 
        <div className="create">
            <form onSubmit={handleSumbit}>
                <label>Blog title:</label>
                <input
                type="text"
                required
                value = {title}
                onChange = {(e)=> setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea 
                rows={10}
                required 
                value={body} 
                onChange={(e)=>{setBody(e.target.value)}}
                />
                <label>Blog author:</label>
                <select 
                value={author}
                required
                onChange={(e)=>{setAuthor(e.target.value)}}>
                    <option value="jimmy">Jimmy</option>
                    <option value="Nolin">Nolin</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog..</button>}
            </form>
        </div> 
    );
}

export default Create;