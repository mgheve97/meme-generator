import { useEffect, useState } from "react";


export default function Meme(){
    
    const [meme, setMeme] = useState({
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"

    })

    const [allMemeImages, setallMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setallMemeImages(data.data.memes))
    }, [])

    // console.log(allMemeImages)

    function getMemeImage(){
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))}

    function handleSubmit(event){
        event.preventDefault()
    }



    return(
        <main>
            <div className="text-container">
                <input 
                    type="text" 
                    className="text-box" 
                    placeholder="Shut Up!"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    className="text-box" 
                    placeholder="And Take my Money"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />     
                <button 
                    className="meme-btn"
                    onClick={getMemeImage}
                    id="btn-generate"
                    >
                    <label htmlFor="btn-generate">Get a new meme image 🖼</label>
                </button>
                  
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="" className="meme-image" />  
                <h2 className="memetext top">{meme.topText}</h2>
                <h2 className="memetext bottom">{meme.bottomText}</h2>
            </div> 
            
        </main>
    );
}