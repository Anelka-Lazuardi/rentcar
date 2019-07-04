frappe.listview_settings["Master Customer"] = {
    add_fields: ["Normal", "VIP", "VVIP", "Unlimited"],
    get_indicator: function (doc) {
        if (doc.status_customer === "Normal") {
            return [__("Normal"), "green", "status_customer,=,Normal"];
        }
        else if (doc.status_customer === "VIP") {
            return [__("VIP"), "black", "status_customer,=,VIP"];
        }
        else if (doc.status_customer === "VVIP") {
            return [__("VVIP"), "red", "status_customer,=,VVIP"];
        }
        else if (doc.status_customer === "Unlimited") {
            return [__("Unlimited"), "yellow", "status_customer,=,Unlimited"];
        }
    }
}