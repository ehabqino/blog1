define(['ojs/ojcore','jquery','knockout'], 
    function() {
        class Classification {
            constructor(){
                this.id=0;
                this.title="No Title Yet";
                this.description="No Description yet";
                this.classendpoint = "https://python110-project1-blog-default-rtdb.firebaseio.com/classification";

            }//end constructor
            
            addClass(id,title,description,notify){
                console.log(title);
                //Operations with database
                let x = "wait";
                setTimeout(() => {
                    x="finished";
                    notify(x);
                }, 1000);
                
            }//end addClass

            updateClass(id,title,description){

            }//end updateClass

            deleteClass(id){

            }//end deleteClass
            
            getAllClasses(){

            }//end getAllClasses

            findClass(filterValue){

            }//end findClass

        }//end class
    return new Classification();
    
});//end all