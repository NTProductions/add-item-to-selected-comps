// add item to selected comps
// 1) select comp items in AE
// 2) choose item to add in script UI

var items = [];
var itemNames = [];

var window = new Window("palette", "Add item to comps", undefined);
window.orientation = "column";

var instructionsText = window.add("statictext", undefined, "Select compositions in 'Project' panel");

var group = window.add("group", undefined, "group");
group.orientation = "row";
var openComps = group.add("checkbox", undefined, "Open Comps");
var button = group.add("button", undefined, "Add+");

getItems();

window.center();
window.show();

button.onClick = function() {
        app.beginUndoGroup("Add Item Process");
        main(items, openComps.value);
        app.endUndoGroup();
        alert("Complete!");
    }

function main(itemsToAdd, openCompsBool) {
        var compsToUse = [];
        for(var i = 1; i <= app.project.numItems; i++) {
            if(app.project.item(i).selected) {
                if(app.project.item(i) instanceof CompItem) {
                    compsToUse.push(app.project.item(i));
                    }
                }
            }
        
        var addedLayer;
        for(var i = 0; i < compsToUse.length; i++) {
            for(var e = 0; e < itemsToAdd.length; e++) {
            addedLayer = compsToUse[i].layers.add(itemsToAdd[e]);
            }
            if(openCompsBool == true) {
                    compsToUse[i].openInViewer();
                }
            }
    }

function getItems() {
        items = [];
        itemNames = [];

        for(var i = 1; i <= app.project.numItems; i++) {
            if(app.project.item(i).selected) {
            if(!(app.project.item(i) instanceof FolderItem)) {
                    items.push(app.project.item(i));
                    itemNames.push(app.project.item(i).name);
                }
            }
        }
        
        return itemNames;
    }