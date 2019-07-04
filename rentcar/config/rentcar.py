from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Master"),
			"items": [
				{
					"type": "doctype",
					"name": "Master Mobil"
				},
				{
					"type": "doctype",
					"name": "Master Tipe Mobil"
				},
                {
					"type": "doctype",
					"name": "Master Customer"
				},
                 {
					"type": "doctype",
					"name": "Master Driver"
				}
			]
		},
        {
			"label": _("Order List"),
			"items": [
				{
					"type": "doctype",
					"name": "Dafatar Pesananan"
				},
				{
					"type": "doctype",
					"name": "Kontrak Payung"
				},
				{
					"type": "doctype",
					"name": "Pengembalian Mobil"
				},
                 {
					"type": "doctype",
					"name": "Sales Order Rent Car"
				}
			]
		}
    ]