$("#elecType").on("click", function(){
    localStorage.setItem("type","elec");
    console.log(localStorage.getItem("type"));
});
$("#classicType").on("click", function(){
    localStorage.setItem("type","classic");
    console.log(localStorage.getItem("type"))
});