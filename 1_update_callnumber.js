// JavaScript Document
var fieldName = "callNumber";
// Custom prefix for callnumeber automatic value
var prefix = "YN";
// Database type identifier (when records are imported from other databases such as endnote), zo for Zotero
var dbtype = "zo";

var fieldID = Zotero.ItemFields.getID(fieldName);

var s = new Zotero.Search();
s.libraryID = ZoteroPane.getSelectedLibraryID();
s.addCondition(fieldName, 'doesNotContain', prefix);
s.addCondition('itemTypeID', 'isNot', 1);
s.addCondition('itemTypeID', 'isNot', 13);
s.addCondition('itemTypeID', 'isNot', 14);
s.addCondition('itemTypeID', 'isNot', 27);
var ids = await s.search();
await Zotero.DB.executeTransaction(async function () {
    for (let id of ids) {
        let item = await Zotero.Items.getAsync(id);
        var newValue = prefix + dbtype + item.key;
        let mappedFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(item.itemTypeID, fieldName);
        item.setField(mappedFieldID ? mappedFieldID : fieldID, newValue);
        await item.save();
    }
});
return ids.length + " item(s) updated";
