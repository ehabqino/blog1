define(['ojs/ojcore','knockout','jquery','ojs/ojinputtext'], 
function(oj,ko,$) {
    function addClassViewModel(){
        //Attributes,Properties,variables,Fields
        this.id = ko.observable();
        this.title = ko.observable();
        this.description = ko.observable();

        //Function , Methods, Procedures

    }
    return addClassViewModel;
    
});