# -*- coding: utf-8 -*-
# Copyright (c) 2019, MIDB and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class KontrakPayung(Document):
    pass



    def on_submit(self):
        self.on_approve();
        
    def on_approve(self):
        if (self.docstatus == 1):
            daftar_pesanan = frappe.new_doc("Dafatar Pesananan")
            daftar_pesanan.id_customer = self.id_customer
            daftar_pesanan.tanggal_pinjam =self.tanggal_pinjam
            daftar_pesanan.tanggal_kembali = self.tanggal_kembali
            daftar_pesanan.total_harga = self.harga_total
            daftar_pesanan.kurang_bayar = self.kekurangan_bayar
            daftar_pesanan.email_custom = self.email_customer
            for i in self.data_mobil:
                daftar_pesanan.append('data_sewa_mobil',{
                    'id_mobil':i.id_mobil,
                    'merk_mobil':i.merk_mobil,
                    'no_polisi':i.no_polisi,
                    'harga_mobil':i.harga_mobil
                    })
                daftar_pesanan.save()
                new_pinjaman = frappe.get_doc("Dafatar Pesananan",daftar_pesanan.name)
                frappe.msgprint('Data Berhasil Di Buat')
                self.change_status_mobil()
   
    
    def change_status_mobil(self):
        if (self.data_mobil):
            for i in self.data_mobil:
                mobil = frappe.get_doc("Master Mobil",i.id_mobil)
                mobil.status_mobil = 'Rented'
                mobil.save()
     