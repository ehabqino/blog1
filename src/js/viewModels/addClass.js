define(['ojs/ojcore','knockout','jquery','models/class.model','ojs/ojinputtext','ojs/ojdialog'], 
function(oj,ko,$,classModel) {
    function addClassViewModel(){
        self = this;
        //Attributes,Properties,variables,Fields
        self.id = ko.observable();
        self.title = ko.observable();
        self.description = ko.observable();
        self.msgTitle = ko.observable();
        self.msgBody = ko.observable();
    
        //Function , Methods, Procedures
        self.addClass = (event)=> {
            //alert("Add Class Button Clicked");
            // res=classModel.addClass(self.id(),self.title(),self.description());
            // alert(res);

            classModel.addClass(self.id(),self.title(),self.description(),function(msg){
                //alert("Added Successfuly with id " + msg);
                self.msgTitle("Success Message");
                self.msgBody("Saved Successfuly with ID " + msg);
                document.getElementById("msgDialog").open();
             
            });
            
        };//end addClass

        self.closeDialog = ()=> {
            document.getElementById("msgDialog").close();
        };//end closeDialog


    }
    return addClassViewModel;
    
});