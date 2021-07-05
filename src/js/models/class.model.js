define(['ojs/ojcore','jquery','knockout'], 
    function() {
        class Classification {
            constructor(){
                this.id=0;
                this.title="No Title Yet";
                this.description="No Description yet";
                this.classendpoint = "https://python110-project1-blog-default-rtdb.firebaseio.com/classification";

            }//end constructor
    //==================================================================================================================//
            initializeModelCollection(url_api){
                const KEY = "id";
                //use this whit parameter to make it general and use it on another place in class /this.classModelDef/
                this.classModelDef = oj.Model.extend({
                    url : url_api,
                    idAttribute : KEY
                });
                //use this whit parameter to make it general and use it on another place in class /this.classColllDef/
                this.classCollDef = oj.Collection.extend({
                    url : url_api,
                    model : this.classModelDef,
                    comparator : KEY
                });
                this.classes = new this.classCollDef; //all data set here

            }///end initializeModelCollection
    //==================================================================================================================//
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
                let url_api = this.classendpoint +"/"+ id + ".json";
                this.initializeModelCollection(url_api);
                let classRow = new this.classModelDef({
                    "id":id,
                    "title":title,
                    "description":description
                },this.classes);

               //AJAX (Take Time)
                classRow.save(null,{
                    type: "PUT",
                    success : function(model,response,options){
                        //notify(response.name);
                        notify(true,response.id);
                    },
                    //xhr = xml http request , can be use any name for example x
                    error : function(modle,xhr,options){
                        
                        notify(false,`Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                    }
                });
            }//end addClass
    //==================================================================================================================//
            updateClass(id,title,description){

            }//end updateClass

            deleteClass(id){

            }//end deleteClass
    //==================================================================================================================//         
            getAllClasses(notify){
                let url_api = this.classendpoint + ".json";
                this.initializeModelCollection(url_api);
                let classRow = new this.classModelDef({},this.classes);

               //AJAX (Take Time)
                classRow.fetch({
                        success : function(coll,data){
                        /* var arrObjs = Object.entries(data).map((val)=>{
                            return val[1];
                        });*///use return if use curly bracket {}
                        var arrObjs = Object.entries(data).map((val)=>(
                            val[1]
                        ));//don't use return if use parentheses () 
                        console.log(arrObjs);
                        notify(true,arrObjs);
                    },
                    //xhr = xml http request , can be use any name for example x
                    error : function(modle,xhr,options){
                        
                        notify(false,`Error Code : ${xhr.status} , msg : ${options.textStatus}`);
                    }
                });

            }//end getAllClasses
    //==================================================================================================================//
            findClass(filterValue){

            }//end findClass

        }//end class
    return new Classification();
    
});//end all