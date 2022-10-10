import React from 'react'
import Head from 'next/head'
function voteCount() {
  return (
      <div style={{backgroundColor:"#FEFCFF",height:"100vh"}} className="d-flex p-20">
<Head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>


<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>


<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</Head>
<div className="container" style={{width:"40%" ,backgroundColor:"whitesmoke",borderRadius:"8px",opacity:"0.8",boxShadow:"5px 10px #888888"}}>
  <h1 style={{color:"black",fontSize:"40px",padding:"30px",paddingLeft:"50px"}}>Live Vote Counts</h1>
  <h1 style={{color:"black"}}>Candidate A</h1>
<div className="progress">
  <div className="progress-bar" style={{width:"10%"}}>10%</div>
</div>
<br></br>
<h1 style={{color:"black"}}>Candidate B</h1>
<div className="progress" >
  <div className="progress-bar bg-success" style={{width:"20%"}}>20%</div>
</div>
<br></br>
<h1 style={{color:"black"}}>Candidate C</h1>
<div className="progress">
  <div className="progress-bar bg-info" style={{width:"30%"}}>30%</div>
</div>
<br></br>
<h1 style={{color:"black"}}>Candidate D</h1>
<div className="progress">
   <div className="progress-bar bg-warning" style={{width:"40%"}}>40%</div>
</div>
<br></br>
<h1 style={{color:"black"}}>Candidate E</h1>
<div className="progress">
  <div className="progress-bar bg-danger" style={{width:"50%"}}>40%</div>
</div>
<br />
<br />
<div className="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"style={{color:"black",fontSize:"25px",paddingLeft:"50px"}}>Total Vote</h5>
        <h5 className="card-title"style={{color:"black",fontSize:"25px",paddingLeft:"80px"}}>100</h5>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"style={{color:"black",fontSize:"25px",paddingLeft:"50px"}}>Total Voters</h5>
        <h5 className="card-title"style={{color:"black",fontSize:"25px",paddingLeft:"80px"}}>100</h5>

      </div>
    </div>
  </div>
</div>
</div>
      </div>

  )
}

export default voteCount