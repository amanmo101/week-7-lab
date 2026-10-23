import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: ""})
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
        setErrorMessage("")
        setIsSubmitting(true)

        const { error } = await supabase
            .from('Posts')
            .insert({title: post.title, author: post.author, description: post.description})

        setIsSubmitting(false)
        if (error) {
            setErrorMessage(error.message)
            return
        }

        window.location.assign("/");
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>
                {errorMessage && <p role="alert">Could not submit post: {errorMessage}</p>}
                <input type="submit" value={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default CreatePost