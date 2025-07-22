import { useState, useEffect } from 'react'
import React from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs" 
import Editor from "react-simple-code-editor"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import '../App.css'


export default function Main({onLogout}) {
  const [code, setCode] = useState(`write or paste the code here`)
  const [review, setreview] = useState(``)
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode() {
  setLoading(true); // start loader
  try {
    const responses = await axios.post(`https://backend-5rzv.onrender.com/ai/getresponse`, { code });
    console.log(responses.data);
    setreview(responses.data.review);
  } catch (error) {
    console.error("Error fetching review:", error);
    setreview("❌ Failed to fetch review.");
  } finally {
    setLoading(false); // stop loader
  }
}


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript,"javascript")}
            padding= {10}
            style={{
            fontFamily:"Fira code, Fira Mono, monospace",
            fontSize:12,
            border:"1px solid #add",
            borderRadius: "5px",
            height:"100%",
            width:"100%"
            }}
              />
              </div>
          <div
           onClick= {reviewCode} 
          className="reviews">Review</div>
        </div>
       <div className="right">
      { loading ? (
    <div className="loader">⏳ Analyzing your code...</div>
  ) : (
  <ReactMarkdown
    rehypePlugins={[rehypeHighlight]}
  >{review}</ReactMarkdown>
  )}
   <div className='Logout'> <button onClick={() => {
        console.log("Logout button clicked");
        onLogout();
      }}>
        Logout
      </button></div>
</div>
      </main>
    </>
  )
}