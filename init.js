/*
    initialization code to run once on install
*/

/*discord
    * read items and events from init json file
    * create #event channel for each event
    * create @item role for each item
*/

//not sure if you have to explicitly create a collection, or if just inserting into it creates it?

/*mongodb setup
    * db.sequences.insert({_id:'raids',n:1})
    * db.raids.insert({_id:'loots',n:1})
    * for each #event insert {<#role>, event} into colelction
    * for each @item insert {<@&roleid>, item} into collection
*/