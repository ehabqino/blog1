define(['ojs/ojcore','knockout','jquery','models/class.model','ojs/ojinputtext'], 
function(oj,ko,$,classModel) {
    function addClassViewModel(){
        //Attributes,Properties,variables,Fields
        this.id = ko.observable();
        this.title = ko.observable();
        this.description = ko.observable();
        this.addClass = ()=> {
            alert("Add Class Button Clicked");
        };

        //Function , Methods, Procedures

    }
    return addClassViewModel;
    
});