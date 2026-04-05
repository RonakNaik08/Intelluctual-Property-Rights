"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

export default function VerifyPage(){

  const [result,setResult] = useState(null);

  const verify = async(file)=>{

    const buffer = await file.arrayBuffer();
    const hash = CryptoJS.SHA256(
      CryptoJS.lib.WordArray.create(buffer)
    ).toString();

    const res = await fetch("/api/verify",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({hash})
    });

    const data = await res.json();
    setResult(data);
  };

  return(
    <div>

      <h1>Verify Ownership</h1>

      <input type="file"
        onChange={(e)=>verify(e.target.files[0])}
      />

      {result && (
        <div>
          {result.exists ?
            <>
              <p>Owner: {result.wallet}</p>
              <p>Registered: {result.date}</p>
            </>
            :
            <p>File not registered</p>
          }
        </div>
      )}

    </div>
  );
}