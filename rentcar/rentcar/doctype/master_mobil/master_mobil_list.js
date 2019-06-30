frappe.listview_settings["Master Mobil"] = {
    add_fields: ["Rented", "Available"],
    get_indicator: function (doc) {
        if (doc.status_mobil === "Rented") {
            return [__("Rented"), "blue", "status_mobil,=,Rented"];
        }
        else if (doc.status_mobil === "Available") {
            return [__("Available"), "green", "status_mobil,=,Available"];
        }
    }
}




