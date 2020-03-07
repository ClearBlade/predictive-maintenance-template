// var id = document.getElementById("crudID");
// console.log(id)

// var tag = document.getElementsByTagName('input');
// console.log(tag);


setInterval(
    function() {
        var cls = document.getElementsByClassName('d-flex');
        // console.log(cls);

        for (var i = 0; i<cls.length; i++){
            var tag = cls[i].getElementsByTagName('input')
            if (tag.length != 0)
            {
                if(tag.item(0).value == "Maintenance Required"){
                    tag.item(0).style.backgroundColor = '#ff0000'
                    tag.item(0).style.textAlign = 'center'
                    // console.log(tag.item(0))
                } else if (tag.item(0).value == "Maintenance Not Required"){
                    tag.item(0).style.backgroundColor = '#33cc33'
                    tag.item(0).style.textAlign = 'center'
                    // console.log("Not Required");
                }
            }
        }
    }, 100
)