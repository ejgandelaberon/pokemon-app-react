import React from 'react'

export default function Pagination({gotoPrevApiUrl,gotoNextApiUrl}) {
  return (
    <div>
        {gotoPrevApiUrl && <button onClick={gotoPrevApiUrl}>Previous</button>}
        {gotoNextApiUrl && <button onClick={gotoNextApiUrl}>Next</button>}
    </div>
  )
}
