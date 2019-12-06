Rough scaffolding for application & administration dashboards, with dependencies
Not 100% sure if this runs on a different box, but contains structure for Roles, and data input for Mosques and Admin.

Create 2 accounts, one for admin and one Mosque manager.
Add Admin role to the admin account meteor mongo console 
eg. 
db.users.find() //get admin id from results
db.users.update({ _id: "YOUR_USER_ID" }, { $set: { roles: ["admin"] } })

and add Mosque role to the mosque manager account and 
db.users.find() //get mosque id from results
db.users.update({ _id: "YOUR_USER_ID" }, { $set: { roles: ["mosque"] } })


Log in on the route /login as the admin account to enter data for mosques, events and imams

log in to system as admin to get the Admin interface, add a Mosque to administrate, with the Mosque manager as the manager.


Log in as the mosque account to access Mosque management dashboard