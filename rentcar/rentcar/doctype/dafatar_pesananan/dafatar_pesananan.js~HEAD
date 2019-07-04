// Copyright (c) 2019, MIDB and contributors
// For license information, please see license.txt

frappe.ui.form.on('Dafatar Pesananan', {
	refresh: function(frm) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: 'Master Customer',
				name: frm.doc.id_customer
			}, callback: function (r) {
				console.log(r.message.email);
				console.log(frm.doc.tanggal_kembali);
				
			}

		});
		
	}
});
