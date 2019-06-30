// Copyright (c) 2019, MIDB and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian Mobil', {
	refresh: function(frm) {

	},
	id_pesanan: function (frm) {
        frm.doc.data_kembali = []
        if (frm.doc.id_pesanan) {
            frappe.call({
                method: "frappe.client.get",
                args: {
					doctype: "Dafatar Pesananan",
					name: frm.doc.id_pesanan
                    
                },
                callback: function (r) {
                    if (r.message) {
                        for (var row in r.message.data_sewa_mobil) {
                            var child = frm.add_child("data_kembali");
                            frappe.model.set_value(child.doctype, child.name, "id_mobil",
                                r.message.data_sewa_mobil[row].id_mobil);
                            frappe.model.set_value(child.doctype, child.name, "merk_mobil",
                                r.message.data_sewa_mobil[row].merk_mobil);
                            frappe.model.set_value(child.doctype, child.name, "no_polisi",
                                r.message.data_sewa_mobil[row].no_polisi);
                        }
                    }
					frm.refresh_field('data_kembali')
					console.log(r);
					
                }
            })
        }
    }
});
cur_frm.set_query('id_pesanan', function() {
	return{
		filters: [
			['Dafatar Pesananan', 'status', '=', 'Rented']
		]
	}
});