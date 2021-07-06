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
        self.pageTitle = ko.observable("Classification List");
        self.idInputDisable = ko.observable(true);
        self.deleteMsgBody = ko.observable("");
        self.deleteDoc = ko.observable(); //hold the object we want to delete it

        self.dataProvider = new ArrayDataProvider(self.allClasses,{
            keyAttributes:"id",
            implicitSort:[{attribute : "id", direction:"ascending"}]
        });// to receive data to table in the view
      
        //Function , Methods, Procedures
        classModel.getAllClasses((success,result)=>{
            console.log(result);
            self.allClasses(result);
            self.allClasses.valueHasMutated(); //Notify to subscribers (Refresh)
        });

        self.addClass = (event)=> {
            //alert("Add Class Button Clicked");
            // res=classModel.addClass(self.id(),self.title(),self.description());
            // alert(res);
            let dialog = document.getElementById("msgDialog");
            classModel.addClass(self.id(),self.title(),self.description(),function(success,msg){
                //alert("Added Successfuly with id " + msg);
                if(success){
                    self.msgTitle("Success Message");
                    self.msgBody("Saved Successfuly with ID " + msg);
                } else {
                    self.msgTitle("Erro Message");
                    self.msgBody(msg);
                }
                
                dialog.open();
                self.showTable(true);
             
            });
            
            
        };//end addClass

        self.closeDialog = ()=> {
            document.getElementById("msgDialog").close();
        };//end closeDialog
        
        self.closeDeleteDialog = ()=> {
            document.getElementById("deleteDialog").close();
        };//end closeDeleteDialog

        self.okDeleteDialog = () => {
            self.closeDeleteDialog();
            
            console.log("Yes, Delete ID : ", self.deleteDoc().id);
            classModel.deleteClass(self.deleteDoc().id,(deleted,msg)=>{
                if(deleted){
                    self.msgTitle("Success Message");
                    self.msgBody(msg);
                    //console.log(msg);
                } else {
                    self.msgTitle("Error Message");
                    self.msgBody(msg);
                }
                document.getElementById("msgDialog").open();
            });
          
        };//end okDeleteDialog

        self.openAddButton = ()=>{
            self.pageTitle("Add New Classification");
            self.showTable(false);
            self.idInputDisable(false);
            
        };//end openAddButton

        self.openTableButton = ()=> {
            self.pageTitle("Classification List");
            self.showTable(true);
        }; //end openTableButton

        self.deleteAction = (event,context)=>{
                //console.log(context.item.data.id);
                const rowID = context.item.data.id;
                //alert("Delete Button of ID : "+rowID);
                self.deleteDoc(context.item.data);
                self.deleteMsgBody("Are you sure you want to delete the classification with title : " + context.item.data.title);
               
                document.getElementById("deleteDialog").open();
                
        };//end deleteAction

        self.editAction = (event,context)=>{
            /*
            const rowID = context.item.data.id;
            const rowTitle = context.item.data.title;
            const rowDesc = context.item.data.description;
            alert("Row id : " + rowID + " rowTitle : " + rowTitle + " rowDesc : " + rowDesc);
            */
            self.pageTitle("Edit Classification Data");
            self.id(context.item.data.id);
            self.title(context.item.data.title);
            self.description(context.item.data.description);
            self.showTable(false);
            self.idInputDisable(true);
        };//end editAction
    }
    return addClassViewModel;
    
});