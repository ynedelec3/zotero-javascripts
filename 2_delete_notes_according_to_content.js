// JavaScript Document
var delValue = "ID  -";
var s = new Zotero.Search();

s.libraryID = Zotero.Libraries.userLibraryID;
s.addCondition('itemType', 'is', 'note');
var ids = await s.search();
if (!ids.length) {
    return "No items found";
}
for (let id of ids) {
    let note = Zotero.Items.get(id);
    let noteHTML = note.getNote();
    if (noteHTML.includes(delValue)) {
        note.deleted = true;
        await note.saveTx();
    }
}

return ids.length + " item(s) deleted";
