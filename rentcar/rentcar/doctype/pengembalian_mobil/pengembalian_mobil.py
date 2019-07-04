# -*- coding: utf-8 -*-
# Copyright (c) 2019, MIDB and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PengembalianMobil(Document):
    pass
    def validate(self):
        self.change_status_mobil()
    def change_status_mobil(self):
        if (self.data_kembali):
            for i in self.data_kembali:
                mobil = frappe.get_doc("Master Mobil",i.id_mobil)
                mobil.status_mobil = 'Available'
                mobil.save()
            Pesanan = frappe.get_doc("Dafatar Pesananan",self.id_pesanan)
            Pesanan.status = 'Close'
            Pesanan.save()
            Pesanan.submit()
