// add item to selected comps
// 1) select comp items in AE
// 2) choose item to add in script UI

var items = [];
var itemNames = [];

var window = new Window("palette", "Add item to comps", undefined);
window.orientation = "column";

var instructionsText = window.add("statictext", undefined, "Select compositions in 'Project' panel");

var groupZero = window.add("group", undefined, "groupZero");
groupZero.orientation = "row";
var ddText = groupZero.add("statictext", undefined, "Item to add:");
var layerDD = groupZero.add("dropdownlist", undefined, getItems());
layerDD.selection = 0;

var group = window.add("group", undefined, "group");
group.orientation = "row";
var openComps = group.add("checkbox", undefined, "Open Comps");
var button = group.add("button", undefined, "Add+");

window.center();
window.show();

button.onClick = function() {
        app.beginUndoGroup("Add Item Process");
        main(items[layerDD.selection.index], openComps.value);
        app.endUndoGroup();
        alert("Complete!");
    }

function main(itemToAdd, openCompsBool) {
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
            addedLayer = compsToUse[i].layers.add(itemToAdd);
            if(openCompsBool == true) {
                    compsToUse[i].openInViewer();
                }
            }
    }

function getItems() {
        items = [];
        itemNames = [];

        for(var i = 1; i <= app.project.numItems; i++) {
            if(!(app.project.item(i) instanceof FolderItem)) {
                    items.push(app.project.item(i));
                    itemNames.push(app.project.item(i).name);
                }
            }
        
        return itemNames;
    }