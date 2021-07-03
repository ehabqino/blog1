define(['ojs/ojcore','knockout','jquery','models/class.model','ojs/ojinputtext'], 
function(oj,ko,$,classModel) {
    function addClassViewModel(){
        self = this;
        //Attributes,Properties,variables,Fields
        self.id = ko.observable();
        self.title = ko.observable();
        self.description = ko.observable();
    
        //Function , Methods, Procedures
        self.addClass = (event)=> {
            //alert("Add Class Button Clicked");
            // res=classModel.addClass(self.id(),self.title(),self.description());
            // alert(res);

            classModel.addClass(self.id(),self.title(),self.description(),function(x){
                alert("Added Successfuly " + x);
            });
            
        };


    }
    return addClassViewModel;
    
});