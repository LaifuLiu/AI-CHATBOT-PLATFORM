"use client";


import {
  useState
} from "react";


type Props = {
  onSend:(message:string)=>void;
};


export default function ChatInput({
  onSend
}:Props){


  const [input,setInput]=useState("");



  function submit(){

    if(!input.trim())
      return;


    onSend(input);

    setInput("");

  }



  return (

    <div
      className="
      border-t
      border-gray-700
      p-4
      "
    >

      <div
        className="
        flex
        gap-2
        "
      >

        <input

          value={input}

          onChange={
            e=>setInput(e.target.value)
          }

          onKeyDown={
            e=>{
              if(e.key==="Enter")
                submit();
            }
          }

          placeholder="Message..."

          className="
          flex-1
          rounded-lg
          bg-gray-800
          p-3
          outline-none
          "

        />


        <button

          onClick={submit}

          className="
          rounded-lg
          bg-blue-600
          px-5
          hover:bg-blue-500
          "

        >
          Send

        </button>


      </div>


    </div>

  );
}