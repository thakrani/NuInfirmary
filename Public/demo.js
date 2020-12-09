function getDetails(itemName) {
    alert('getDetails started')
    var value=itemName;
    var query = { rollno: value};
    StuData.find(query)
    .then((result)=>{
      if(result.length>0){
        alert('dataFound')
     }
    })
  }
