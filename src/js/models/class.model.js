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
                /*console.log(title);
                //Operations with database
                let x = "wait";
                setTimeout(() => {
                    x="finished";
                    notify(x);
                }, 1000);
                */
               
               // Collection = Table(Rows)
               // Model = Row
               // Collection is a group of Rows
               let url_api = this.classendpoint + ".json";
               let classModelDef = oj.Model.extend({
                   url : url_api,
                   idAttribute : "id"
               });
               let classCollDef = oj.Collection.extend({
                   url : url_api,
                   model : classModelDef,
                   comparator : "id"
               });
               let classes = new classCollDef; //all data set here
               let classRow = new classModelDef({
                   "id":id,
                   "title":title,
                   "description":description
               },classes);

               //AJAX (Take Time)
                classRow.save(null,{
                    type: "POST",
                    success : function(model,response,options){
                        notify(response);
                    },
                    //xhr = xml http request , can be use any name for example x
                    error : function(modle,xhr,options){
                        notify(xhr);
                    }
                });
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