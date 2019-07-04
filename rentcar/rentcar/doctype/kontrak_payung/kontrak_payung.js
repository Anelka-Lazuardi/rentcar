// Copyright (c) 2019, MIDB and contributors
// For license information, please see license.txt

frappe.ui.form.on('Kontrak Payung', {
	refresh: function (frm) {

	},
});
frappe.ui.form.on('Kontrak Payung', 'tanggal_pinjam', function (frm) {

	if (frm.doc.tanggal_pinjam < frappe.datetime.get_today()) {

		//untuk ngeset tanggal jadi kosong kalau kurang dari hari sekarang
		// frm.set_value('tanggal_pinjaman', '');
		//kalo gua make yang kalo dia pilih tanggal yg kamren otomatis jadi hari ini
		frm.set_value('tanggal_pinjam', frappe.datetime.get_today());
		frm.set_value('tanggal_kembali', '');
		msgprint('Tidak Bisa Order Di Hari Sebelumnya Minimal Hari Ini ');
		validated = false;
	}

	var member = frm.doc.id_customer;
	if (member != undefined) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Master Customer",
				name: member
			}, callback: function (r) {
				var mem_type = r['message']['status_customer'];
				// console.log(mem_type);
				// console.log(frm.doc.tanggal_peminjaman);


				if (frm.doc.tanggal_pinjam != undefined) {

					if (mem_type == "Normal") {
						frm.set_value('tanggal_kembali', frappe.datetime.add_days(frm.doc.tanggal_pinjam, 1));
						frm.set_value('periode_sewa', "1 Hari");
					}
					else if (mem_type == "VIP") {
						frm.set_value('tanggal_kembali', frappe.datetime.add_days(frm.doc.tanggal_pinjam, 2));
						frm.set_value('periode_sewa', "2 Hari");
					}
					else if (mem_type == "VVIP") {
						frm.set_value('tanggal_kembali', frappe.datetime.add_days(frm.doc.tanggal_pinjam, 3));
						frm.set_value('periode_sewa', "3 Hari");
					}
				}
			}


		});
		if (frm.doc.data_mobil) {
			console.log(frm.doc.data_mobil);
			
			Object.size = function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};
			var size = Object.size(frm.doc.data_mobil);
			// console.log(size);
			if (size < 2 ) {
				var b = eval(frm.doc.data_mobil[0]['harga_mobil'])
				frm.set_value('harga_total', b);
			}
			else{

			for (let index = 0; index < size - 1; index++) {
				var b = eval (frm.doc.data_mobil[index]['harga_mobil']);
				b = b + eval(frm.doc.data_mobil[index + 1]['harga_mobil']);
			}
			frm.set_value('harga_total', b);
		}
			
	}	
	}



});
frappe.ui.form.on('Kontrak Payung', 'id_driver', function (frm) {

	if (frm.doc.biaya_driver) {
		frm.set_value('harga_total',eval(frm.doc.harga_total) +(frm.doc.biaya_driver));

		
	}

});

frappe.ui.form.on('Kontrak Payung', 'total_bayar', function (frm) {

	if (frm.doc.total_bayar) {
		frm.set_value('kekurangan_bayar',eval(frm.doc.harga_total) -(frm.doc.total_bayar));
		
	}

});
frappe.ui.form.on('Kontrak Payung', 'validate', function (frm) {

	if (!frm.doc.total_bayar) {
		frm.set_value('kekurangan_bayar',eval(frm.doc.harga_total));
		
	}

});
cur_frm.set_query('id_mobil', 'data_mobil', function (doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	return {
		filters: [
			['Master Mobil', 'status_mobil', '=', 'Available']
		]
	}
});





