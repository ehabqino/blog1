define(['ojs/ojcore','knockout','jquery','models/class.model','ojs/ojarraydataprovider',
'ojs/ojinputtext','ojs/ojdialog','ojs/ojtable'], 
function(oj,ko,$,classModel,ArrayDataProvider) {
    function addClassViewModel(){
        self = this;
        //Attributes,Properties,variables,Fields
        self.id = ko.observable();
        self.title = ko.observable();
        self.description = ko.observable();
        self.msgTitle = ko.observable();
        self.msgBody = ko.observable();
        self.showTable = ko.observable(true);
        self.allClasses = ko.observableArray([]); //empty array to fill it with data comes from model
        self.dataProvider = new ArrayDataProvider(self.allClasses,{
            keyAttributes:"id",
            implicitSort:[{attribute : "id", direction:"ascending"}]
        });// to receive data to table in the view
      
        //Function , Methods, Procedures
        classModel.getAllClasses((success,result)=>{
            console.log(result);
            this.allClasses(result);
            this.allClasses.valueHasMutated(); //Notify to subscribers (Refresh)
        });

        self.addClass = (event)=> {
            //alert("Add Class Button Clicked");
            // res=classModel.addClass(self.id(),self.title(),self.description());
            // alert(res);
           
            classModel.addClass(self.id(),self.title(),self.description(),function(success,msg){
                //alert("Added Successfuly with id " + msg);
                if(success){
                    self.msgTitle("Success Message");
                    self.msgBody("Saved Successfuly with ID " + msg);
                } else {
                    self.msgTitle("Erro Message");
                    self.msgBody(msg);
                }
                
                document.getElementById("msgDialog").open();
             
            });
            self.showTable(true);
            
        };//end addClass

        self.closeDialog = ()=> {
            document.getElementById("msgDialog").close();
        };//end closeDialog
        
        self.openAddButton = ()=>{
            self.showTable(false);
        };//end openAddButton

        self.openTableButton = ()=> {
            self.showTable(true);
        }; //end openTableButton

    }
    return addClassViewModel;
    
});